import { register } from '../../store/actions/auth/authActions.js';
import { getTranslations } from '../../core/utils/language/translations.js';
import { Button } from '../base/button.js';
import { Input } from '../base/input.js';
import { Label } from '../base/label.js';

export function RegisterForm() {
  const {
    registerTitle,
    username: usernameLabel,
    email: emailLabel,
    password: passwordLabel,
    register: registerButtonLabel,
    alreadyHaveAccount,
    loginHere,
    registrationFailed
  } = getTranslations();

  const registerView = `
    <div class="register-container">
      <div class="register-card">
        <h1 class="register-title">${registerTitle}</h1>
        <form id="register-form" class="register-form">
          <div class="form-group">
            ${Label({ forId: 'username', text: usernameLabel })}
            ${Input({ id: 'username', name: 'username', required: true })}
          </div>
          
          <div class="form-group">
            ${Label({ forId: 'email', text: emailLabel })}
            ${Input({ id: 'email', name: 'email', type: 'email', required: true })}
          </div>
          
          <div class="form-group">
            ${Label({ forId: 'password', text: passwordLabel })}
            ${Input({ id: 'password', name: 'password', type: 'password', required: true })}
          </div>
          
          ${Button({ id: 'register-btn', text: registerButtonLabel, type: 'submit', class: 'register-button' })}
        </form>
        <p class="register-footer">${alreadyHaveAccount} <a href="/login" onclick="event.preventDefault(); navigate('/login')" class="login-link">${loginHere}</a></p>
      </div>
    </div>
  `;

  setTimeout(() => {
    const form = document.getElementById('register-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        try {
          await register({ username, email, password });
          window.navigate('/login');
        } catch (error) {
          console.error('Registration failed:', error);
          alert(registrationFailed);
        }
      });
    }
  }, 0);

  return registerView;
}
