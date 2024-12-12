export function Input({ id, name, type = 'text', placeholder = '', value = '', required = false }) {
    return `
      <input 
        id="${id}" 
        name="${name}" 
        type="${type}" 
        placeholder="${placeholder}" 
        value="${value}" 
        ${required ? 'required' : ''}
      />
    `;
  }
  