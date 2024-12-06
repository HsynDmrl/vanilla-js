export function navbar() {
    return `
      <nav>
        <ul>
          <li><a href="/" onclick="navigate('/')">Home</a></li>
          <li><a href="/about" onclick="navigate('/about')">About</a></li>
        </ul>
      </nav>
    `;
  }
  