import { Router } from 'express';
import {
  createCampaign,
  deleteCampaign,
  getAnalytics,
  listCampaigns,
  updateCampaign
} from '../controllers/campaignController.js';
import { requireAdminAuth } from '../middleware/authMiddleware.js';

const campaignRouter = Router();

campaignRouter.use(requireAdminAuth);
campaignRouter.get('/', listCampaigns);
campaignRouter.post('/', createCampaign);
campaignRouter.put('/:id', updateCampaign);
campaignRouter.delete('/:id', deleteCampaign);
campaignRouter.get('/analytics/summary', getAnalytics);

export default campaignRouter;
