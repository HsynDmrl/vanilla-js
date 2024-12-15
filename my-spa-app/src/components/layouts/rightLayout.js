import { getTranslations } from '../../core/utils/language/translations.js';
import { store } from '../../store/store.js';
import { logoutUser } from '../../store/actions/auth/authActions.js';

export function RightLayout() {
  const {
    profileTitle,
    usernameLabel,
    emailLabel,
    accessTokenLabel,
    logoutButton,
    editButton,
    saveChangesButton,
    changePasswordTitle,
    currentPasswordPlaceholder,
    newPasswordPlaceholder,
    savePasswordButton,
    settingsTitle,
    darkModeButton,
    userNotFound,
    unknown
  } = getTranslations();

  const state = store.getState();
  const user = state.user?.user;
  const accessToken = state.auth?.accessToken;

  if (!user) {
    return `<div>${userNotFound}</div>`;
  }

  const username = user?.username || unknown;
  const email = user?.email || unknown;
  const token = accessToken || unknown;

  const layout = `
    <div class="content">
      <div id="profile-view">
        <h1>${profileTitle}</h1>
        <p><strong>${usernameLabel}:</strong> <span id="username">${username}</span></p>
        <p><strong>${emailLabel}:</strong> <span id="email">${email}</span></p>
        <p><strong>${accessTokenLabel}:</strong> ${token}</p>
        <button id="logout-btn">${logoutButton}</button>
        <button id="edit-btn">${editButton}</button>
        <div id="edit-form" style="display:none;">
          <input type="text" id="new-username" placeholder="${usernameLabel}" value="${username}" />
          <input type="email" id="new-email" placeholder="${emailLabel}" value="${email}" />
          <button id="save-btn">${saveChangesButton}</button>
        </div>
      </div>

      <div id="change-password-view" style="display:none;">
        <h1>${changePasswordTitle}</h1>
        <input type="password" id="current-password" placeholder="${currentPasswordPlaceholder}" />
        <input type="password" id="new-password" placeholder="${newPasswordPlaceholder}" />
        <button id="save-password-btn">${savePasswordButton}</button>
      </div>

      <div id="settings-view" style="display:none;">
        <h1>${settingsTitle}</h1>
        <button id="dark-mode-btn">${darkModeButton}</button>
      </div>
    </div>
  `;

  // Event listener'lar
  setTimeout(() => {
    const logoutBtn = document.getElementById('logout-btn');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');

    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        try {
          await logoutUser();
          window.location.href = '/';
        } catch (error) {
          console.error('Logout failed:', error);
          alert('Logout failed. Please try again.');
        }
      });
    }

    if (editBtn) {
      editBtn.addEventListener('click', () => {
        const editForm = document.getElementById('edit-form');
        editForm.style.display = 'block';
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        const newUsername = document.getElementById('new-username').value;
        const newEmail = document.getElementById('new-email').value;

        try {
          await updateUserData(user.id, { username: newUsername, email: newEmail });
          alert('Profile updated successfully!');
          const editForm = document.getElementById('edit-form');
          editForm.style.display = 'none';
        } catch (error) {
          console.error('Update failed:', error);
          alert('Update failed. Please try again.');
        }
      });
    }
  }, 0);

  return layout;
}
