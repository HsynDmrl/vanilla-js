import { store } from '../src/store/store.js';
import { setUser } from '../src/store/actions/user/userActions.js';  

let testData = null;

async function loadTestData() {
  if (!testData) {
    const response = await fetch('/test.json');
    if (!response.ok) {
      throw new Error('Failed to load test.json');
    }
    testData = await response.json();
  }
  return testData;
}

export async function mockApiCall(endpoint, options = {}) {
  const testData = await loadTestData(); 

  if (endpoint === '/auth/login') {
    const { username, password } = JSON.parse(options.body);
    const user = testData.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      store.dispatch(setUser(user));

      return {
        ok: true,
        json: async () => ({
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        }),
      };
    }

    return { ok: false, status: 401, json: async () => ({ message: 'Unauthorized' }) };
  }

  if (endpoint === '/auth/refresh-token') {
    const { refreshToken } = JSON.parse(options.body);
    const user = testData.users.find((u) => u.refreshToken === refreshToken);

    if (user) {
      return {
        ok: true,
        json: async () => ({
          accessToken: `newAccessToken_${refreshToken}`,
        }),
      };
    }

    return { ok: false, status: 401, json: async () => ({ message: 'Token expired' }) };
  }

  if (endpoint === '/auth/register') {
    const { username, email, password } = JSON.parse(options.body);
    const existingUser = testData.users.find((user) => user.username === username);

    if (existingUser) {
      return { 
        ok: false, 
        status: 400, 
        json: async () => ({ message: 'User already exists' }) 
      };
    }

    const newUser = {
      username,
      email,
      password,
      accessToken: 'newFakeAccessToken',
      refreshToken: 'newFakeRefreshToken',
    };

    testData.users.push(newUser);

    store.dispatch(setUser(newUser));

    return {
      ok: true,
      json: async () => newUser,
    };
  }

  return { ok: false, status: 404, json: async () => ({ message: 'Not Found' }) };
}
