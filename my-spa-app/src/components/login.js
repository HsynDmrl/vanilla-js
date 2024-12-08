import { login } from '../store/actions/auth/authActions.js'; // authActions.js'den login fonksiyonunu import ediyoruz
import { store } from '../store/store.js';

export function loginViewWithListeners() {
  const loginView = `
    <div class="login">
      <h1>Login</h1>
      <form id="login-form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <div>
          <input type="checkbox" id="remember-me" name="remember-me">
          <label for="remember-me">Remember Me</label>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/register" onclick="event.preventDefault(); navigate('/register')">Register here</a></p> <!-- Register yönlendirmesi -->
    </div>
  `;

  // Event listener ekliyoruz
  setTimeout(() => {
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Sayfa yenilenmesini engelle

        const username = form.username.value;
        const password = form.password.value;
        const rememberMe = form['remember-me'].checked;

        try {
          // Burada doğrudan authActions.js'deki login fonksiyonunu çağırıyoruz
          await login({ username, password }, rememberMe);

          // Login işlemi başarılı olduğunda yönlendirme
          window.navigate('/'); // Ana sayfaya yönlendir
        } catch (error) {
          console.error('Login failed:', error);
          alert('Login failed. Please try again.');
        }
      });
    }
  }, 0);

  return loginView;
}
