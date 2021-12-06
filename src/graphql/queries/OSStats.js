import getOSStats from "../../data/os.js";
import { OSStatsDataType } from "../types/OSStatsDataType";

const osStatsQuery = {
  getOSStats: {
    type: OSStatsDataType,
    args: {},
    resolve: async () => {
      try {
        const stats = await getOSStats();
        return stats;
      } catch (err) {
        throw err;
      }
    } 
  }
};

export default osStatsQuery;