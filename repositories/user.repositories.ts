import User from '../models/User.model';

export class UserRepository {
  static async createUser(userData: any) {
    try {
      const user = await User.findOne({ email: userData.email });
      
      if (user) {
        console.log('User already exists in problems service');
        return user;
      }
      
      const newUser = await User.create({
        _id: userData.id, // Maintain the same ID across services
        name: userData.name,
        email: userData.email
      });
      
      console.log('User created in problems service:', newUser._id);
      return newUser;
    } catch (error) {
      console.error('Error creating user in problems service:', error);
      throw error;
    }
  }
  
  static async updateUser(userData: any) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userData.id,
        { $set: userData },
        { new: true }
      );
      
      console.log('User updated in problems service:', updatedUser?._id);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user in problems service:', error);
      throw error;
    }
  }
}