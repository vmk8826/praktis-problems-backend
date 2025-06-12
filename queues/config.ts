import { ConnectionOptions } from 'bullmq';

export const redisConnection: ConnectionOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379')
};

export const queueNames = {
  USER_CREATED: 'user-created',
  USER_UPDATED: 'user-updated',
  PROBLEM_CREATED: 'problem-created'
};