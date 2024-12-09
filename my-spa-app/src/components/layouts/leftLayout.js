import { getTranslations } from '../../core/utils/language/translations.js';

export function LeftLayout() {
  // Çevirileri alıyoruz
  const {
    profileButton,
    changePasswordButton,
    settingsButton
  } = getTranslations();

  // Sol menü ve butonlar
  const layout = `
    <div class="profile-menu">
      <button id="profile-btn">${profileButton}</button>
      <button id="change-password-btn">${changePasswordButton}</button>
      <button id="settings-btn">${settingsButton}</button>
    </div>
  `;

  // Event listener'ları buraya taşıyoruz
  setTimeout(() => {
    const profileBtn = document.getElementById('profile-btn');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const settingsBtn = document.getElementById('settings-btn');

    const profileViewElement = document.getElementById('profile-view');
    const changePasswordView = document.getElementById('change-password-view');
    const settingsView = document.getElementById('settings-view');

    if (profileBtn) {
      profileBtn.addEventListener('click', () => {
        profileViewElement.style.display = 'block';
        changePasswordView.style.display = 'none';
        settingsView.style.display = 'none';
      });
    }

    if (changePasswordBtn) {
      changePasswordBtn.addEventListener('click', () => {
        profileViewElement.style.display = 'none';
        changePasswordView.style.display = 'block';
        settingsView.style.display = 'none';
      });
    }

    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        profileViewElement.style.display = 'none';
        changePasswordView.style.display = 'none';
        settingsView.style.display = 'block';
      });
    }
  }, 0);

  return layout;
}
