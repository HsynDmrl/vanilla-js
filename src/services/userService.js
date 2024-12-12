import { mockApiCall } from '../../__test__/mockApiCall.js';

class UserService {
  async getUser(userId) {
    const response = await mockApiCall(`/users/${userId}`, { method: 'GET' });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return await response.json();
  }

  async registerUser(userData) {
    const response = await mockApiCall('/auth/register', { 
      method: 'POST',
      body: JSON.stringify(userData), 
    });

    if (!response.ok) {
      throw new Error('Failed to register user');
    }
    
    return await response.json();
  }

  async updateUser(userId, userData) {
    const response = await mockApiCall(`/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update user data');
    }
    return await response.json();
  }
}

const userService = new UserService();
export default userService;
