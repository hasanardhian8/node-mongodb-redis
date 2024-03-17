import jwt from "jsonwebtoken";
import config from "../config/config.js";
import client from "../db/redis.js";

export default {
  signAccessToken: async (userId) => {
    return jwt.sign({ id: userId }, config.token.access.secret, { expiresIn: config.token.access.expiresIn });
  },

  signRefreshToken: async (userId) => {
    const token = jwt.sign({ id: userId }, config.token.refresh.secret, { expiresIn: config.token.refresh.expiresIn });
    await client.SET(userId, token, { EX: config.token.refresh.expiresIn });
    return token;
  },

  verifyAccessToken: async (token) => {
    try {
      const user = await jwt.verify(token, config.token.access.secret);
      return user?.id;
    } catch (error) {
      return;
    }
  },

  verifyRefreshToken: async (refreshToken) => {
    try {
      console.log(refreshToken);
      const user = await jwt.verify(refreshToken, config.token.refresh.secret);
      console.log(user);
      if (!user) return false;
      const result = await client.GET(user.id);
      console.log(result);
      return refreshToken === result ? user?.id : false;
    } catch (error) {
      return;
    }
  },
};