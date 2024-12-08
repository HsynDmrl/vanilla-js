// register.js
import { register } from '../store/actions/auth/authActions.js';

export function registerViewWithListeners() {
  const registerView = `
    <div class="register">
      <h1>Register</h1>
      <form id="register-form">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/login" onclick="event.preventDefault(); navigate('/login')">Login here</a></p>
    </div>
  `;

  // Event listener ekliyoruz
  setTimeout(() => {
    const form = document.getElementById('register-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Sayfa yenilenmesini engelle

        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
          // Register işlemini authActions'deki register fonksiyonuyla çağırıyoruz
          await register({ username, email, password });

          // Kayıt işlemi başarılı olduğunda login sayfasına yönlendir
          window.navigate('/login');
        } catch (error) {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      });
    }
  }, 0);

  return registerView;
}
