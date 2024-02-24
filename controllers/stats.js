import { Stats } from '../models/Stats.js';

export const getStats = async (req, res, next) => {
  try {
    let stats = await Stats.find();
    return res.status(200).json({
      success: true,
      message: 'Stats Fetched Successfully!',
      stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
