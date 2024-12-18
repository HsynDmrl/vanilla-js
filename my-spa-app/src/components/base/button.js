export function Button({ id, text, onClick, type = 'button', className = '' }) {
  const buttonHTML = `
    <button id="${id}" class="${className}" type="${type}">
      ${text}
    </button>
  `;

  setTimeout(() => {
    const buttonElement = document.getElementById(id);
    if (buttonElement && onClick) {
      buttonElement.addEventListener('click', onClick);
    }
  }, 0);

  return buttonHTML;
}
