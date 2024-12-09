import { store } from '../src/store/store.js';
import { setUser } from '../src/store/actions/user/userActions.js';  // setUser aksiyonunu import ettik

let testData = null;

// JSON dosyasını yükleyen bir yardımcı işlev
async function loadTestData() {
  if (!testData) {
    const response = await fetch('/test.json'); // JSON dosyasının yolu
    if (!response.ok) {
      throw new Error('Failed to load test.json');
    }
    testData = await response.json();
  }
  return testData;
}

export async function mockApiCall(endpoint, options = {}) {
  const testData = await loadTestData(); // JSON verilerini yükle

  // Login işlemi
  if (endpoint === '/auth/login') {
    const { username, password } = JSON.parse(options.body);
    const user = testData.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Kullanıcı bilgilerini userReducer'a dispatch et
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

  // Refresh token işlemi
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

  // Register işlemi ekliyoruz
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

    // Yeni kullanıcıyı test verisine ekle
    testData.users.push(newUser);

    // Kullanıcı bilgilerini Redux store'a ekle
    store.dispatch(setUser(newUser));

    return {
      ok: true,
      json: async () => newUser,
    };
  }

  return { ok: false, status: 404, json: async () => ({ message: 'Not Found' }) };
}
