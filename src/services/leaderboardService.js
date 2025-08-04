import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class LeaderboardService {
  // Get main leaderboard
  async getLeaderboard(params = {}) {
    try {
      const { limit = 50, offset = 0, timeframe = 'all' } = params;
      const response = await axios.get(`${API_BASE_URL}/leaderboard`, {
        params: { limit, offset, timeframe }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch leaderboard');
    }
  }

  // Get leaderboard by specific metric
  async getLeaderboardByMetric(params = {}) {
    try {
      const { metric = 'karma', limit = 20, offset = 0 } = params;
      const response = await axios.get(`${API_BASE_URL}/leaderboard/by-metric`, {
        params: { metric, limit, offset }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard by metric:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch leaderboard by metric');
    }
  }

  // Get leaderboard stats
  async getLeaderboardStats() {
    try {
      const response = await axios.get(`${API_BASE_URL}/leaderboard/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard stats:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch leaderboard stats');
    }
  }

  // Get specific user's position
  async getUserPosition(userId, token) {
    try {
      const response = await axios.get(`${API_BASE_URL}/leaderboard/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user position:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch user position');
    }
  }

  // Get current user's position
  async getMyPosition(token) {
    try {
      const response = await axios.get(`${API_BASE_URL}/leaderboard/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching my position:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch your position');
    }
  }
}

const leaderboardService = new LeaderboardService();
export default leaderboardService;
