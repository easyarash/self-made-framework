const { redisClient } = require('../config/db');

const setCache = (key, value, duration = 3600) => {
    redisClient.setex(key, duration, JSON.stringify(value));
};

const getCache = async (key) => {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
};

module.exports = { setCache, getCache };
