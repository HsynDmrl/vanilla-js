import { login } from '../../store/actions/auth/authActions.js';
import { getTranslations } from '../../core/utils/language/translations.js';
import { Button } from '../base/button.js';
import { Input } from '../base/input.js';
import { Label } from '../base/label.js';

export function LoginForm() {
  const {
    loginTitle,
    username: usernameLabel,
    password: passwordLabel,
    rememberMe: rememberMeLabel,
    login: loginButtonLabel,
    noAccountMessage,
    registerHere,
    loginFailed
  } = getTranslations();

  const loginView = `
    <div class="login-container">
      <div class="login-card">
        <h1 class="login-title">${loginTitle}</h1>
        <form id="login-form" class="login-form">
          <div class="form-group">
            ${Label({ forId: 'username', text: usernameLabel })}
            ${Input({ id: 'username', name: 'username', required: true })}
          </div>
          
          <div class="form-group">
            ${Label({ forId: 'password', text: passwordLabel })}
            ${Input({ id: 'password', name: 'password', type: 'password', required: true })}
          </div>

          <div class="form-remember">
            ${Input({ id: 'remember-me', name: 'remember-me', type: 'checkbox' })}
            ${Label({ forId: 'remember-me', text: rememberMeLabel })}
          </div>

          ${Button({ id: 'login-btn', text: loginButtonLabel, type: 'submit', class: 'login-button' })}
        </form>
        <p class="login-footer">${noAccountMessage} <a href="/register" onclick="event.preventDefault(); navigate('/register')" class="register-link">${registerHere}</a></p>
      </div>
    </div>
  `;

  setTimeout(() => {
    const form = document.getElementById('login-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = form.username.value;
        const password = form.password.value;
        const rememberMe = form['remember-me'].checked;

        try {
          await login({ username, password }, rememberMe);
          window.navigate('/');
        } catch (error) {
          console.error('Login failed:', error);
          alert(loginFailed);
        }
      });
    }
  }, 0);

  return loginView;
}
