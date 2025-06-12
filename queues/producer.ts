import { Queue } from 'bullmq';
import { redisConnection, queueNames } from './config';

// Create queues for different events
const problemCreatedQueue = new Queue(queueNames.PROBLEM_CREATED, { connection: redisConnection });

// Helper functions to add jobs to queues
export const addProblemCreatedJob = async (problemData: any) => {
  return await problemCreatedQueue.add('create-problem', problemData, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000
    }
  });
};