import jwt from 'jsonwebtoken';
import tokenSchema from '../models/token-model.js';

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30s' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenSchema.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenSchema.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await tokenSchema.deleteOne({ refreshToken });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await tokenSchema.findOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const isTokenValid = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return isTokenValid;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const isTokenValid = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return isTokenValid;
    } catch (e) {
      return null;
    }
  }
}

const tokenService = new TokenService();
export default tokenService;
