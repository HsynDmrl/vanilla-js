import { LeftLayout } from '../layouts/leftLayout.js';
import { RightLayout } from '../layouts/rightLayout.js';

export function ProfilePage() {
  return `
    <div class="profile-container">
      ${LeftLayout()}
      ${RightLayout()}
    </div>
  `;
}
