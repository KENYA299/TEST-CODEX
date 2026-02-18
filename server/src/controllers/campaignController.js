import Campaign from '../models/Campaign.js';

export async function createCampaign(req, res) {
  try {
    const campaign = await Campaign.create(req.body);
    return res.status(201).json(campaign);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function listCampaigns(req, res) {
  const campaigns = await Campaign.find().sort({ createdAt: -1 });
  return res.json(campaigns);
}

export async function updateCampaign(req, res) {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    return res.json(campaign);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function deleteCampaign(req, res) {
  const campaign = await Campaign.findByIdAndDelete(req.params.id);

  if (!campaign) {
    return res.status(404).json({ message: 'Campaign not found' });
  }

  return res.json({ message: 'Campaign deleted' });
}

export async function getAnalytics(req, res) {
  const campaigns = await Campaign.find();

  const totalCampaigns = campaigns.length;
  const totalRevenue = campaigns.reduce((sum, campaign) => sum + (campaign.revenue || 0), 0);
  const totalQuantity = campaigns.reduce((sum, campaign) => sum + (campaign.quantity || 0), 0);
  const avgDailyPacing = totalCampaigns
    ? campaigns.reduce((sum, campaign) => sum + (campaign.dailyPacingControl || 0), 0) / totalCampaigns
    : 0;

  return res.json({
    totalCampaigns,
    totalRevenue,
    totalQuantity,
    avgDailyPacing: Number(avgDailyPacing.toFixed(2))
  });
}
