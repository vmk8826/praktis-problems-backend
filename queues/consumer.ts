import { Worker } from 'bullmq';
import { redisConnection, queueNames } from './config';
import { UserRepository } from '../repositories/user.repositories'; // Import the repository

// Create worker for user-created queue
const userCreatedWorker = new Worker(queueNames.USER_CREATED, async (job) => {
  try {
    console.log('User created event received:', job.data);
    
    // Use the UserRepository to create the user in the problems service
    const createdUser = await UserRepository.createUser(job.data);
    
    console.log('User successfully created in problems service:', createdUser._id);
    return { processed: true, userId: createdUser._id };
  } catch (error) {
    console.error('Failed to process user creation:', error);
    throw error; // This will trigger the 'failed' event and retry logic
  }
}, { connection: redisConnection });

// Create worker for user-updated queue
const userUpdatedWorker = new Worker(queueNames.USER_UPDATED, async (job) => {
  try {
    console.log('User updated event received:', job.data);
    
    // Use the UserRepository to update the user in the problems service
    const updatedUser = await UserRepository.updateUser(job.data);
    
    console.log('User successfully updated in problems service:', updatedUser?._id);
    return { processed: true, userId: updatedUser?._id };
  } catch (error) {
    console.error('Failed to process user update:', error);
    throw error; // This will trigger the 'failed' event and retry logic
  }
}, { connection: redisConnection });

// Error handling
userCreatedWorker.on('failed', (job, err) => {
  console.error(`User creation job ${job?.id} failed with error: ${err.message}`);
});

userUpdatedWorker.on('failed', (job, err) => {
  console.error(`User update job ${job?.id} failed with error: ${err.message}`);
});

export const initConsumers = () => {
  console.log('Problems service consumers initialized');
};