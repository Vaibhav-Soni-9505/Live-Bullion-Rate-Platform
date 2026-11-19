
import { getCachedGoldRates } from "../services/bullion.service.js";
import {
  filterGoldRates,
  buildSilverPlaceholder,
} from "../utils/parseBullionRates.js";

/**
 * GET /api/v1/rates/bullion
 * Returns filtered gold rates (99.50 & 99.90 WITH GST) + silver placeholder.
 */
const getBullionRates = async (req, res, next) => {
  try {
    const {
      goldRates,
      fetchedAt,
      isStale,
    } = await getCachedGoldRates();

    const filteredGold = filterGoldRates(goldRates);

    return res.status(200).json({
      success: true,
      message: "Bullion rates fetched successfully",
      data: {
        gold: filteredGold,
        silver: buildSilverPlaceholder(),
      },
      fetchedAt: fetchedAt.toISOString(),
      isStale,
    });

  } catch (error) {
    next(error);
  }
};

export { getBullionRates };
