import { LeftLayout } from './leftLayout.js';
import { RightLayout } from './rightLayout.js';

export function profileViewWithListeners() {
  // Profile view sadece bileşenleri render etsin, olayları bileşenlere bırakacak
  return `
    <div class="profile-container">
      ${LeftLayout()}
      ${RightLayout()}
    </div>
  `;
}
