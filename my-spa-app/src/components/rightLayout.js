import { store } from '../store/store.js';
import { logoutUser } from '../store/actions/auth/authActions.js'; 

export function RightLayout() {
  const state = store.getState();
  const user = state.user?.user;
  const accessToken = state.auth?.accessToken;

  if (!user) {
    return `<div>User not found.</div>`;
  }

  const username = user?.username || 'Unknown';
  const email = user?.email || 'Unknown';
  const token = accessToken || 'No access token';

  const layout = `
    <div class="content">
      <div id="profile-view">
        <h1>Profile</h1>
        <p><strong>Username:</strong> <span id="username">${username}</span></p>
        <p><strong>Email:</strong> <span id="email">${email}</span></p>
        <p><strong>Access Token:</strong> ${token}</p>
        <button id="logout-btn">Logout</button>
        <button id="edit-btn">Edit</button>
        <div id="edit-form" style="display:none;">
          <input type="text" id="new-username" placeholder="New Username" value="${username}" />
          <input type="email" id="new-email" placeholder="New Email" value="${email}" />
          <button id="save-btn">Save Changes</button>
        </div>
      </div>

      <div id="change-password-view" style="display:none;">
        <h1>Change Password</h1>
        <input type="password" id="current-password" placeholder="Current Password" />
        <input type="password" id="new-password" placeholder="New Password" />
        <button id="save-password-btn">Save New Password</button>
      </div>

      <div id="settings-view" style="display:none;">
        <h1>Settings</h1>
        <button id="dark-mode-btn">Toggle Dark Mode</button>
      </div>
    </div>
  `;

  // Profil, şifre ve ayarlar ile ilgili event listener'ları buraya ekliyoruz
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
