export function HomePage() {
  return `
    <div class="home-page">
      <h1>Home Page</h1>
    </div>
  `;
}

function addHomeEventListeners() {
  const goToAboutButton = document.getElementById('go-to-about');
  if (goToAboutButton) {
    goToAboutButton.addEventListener('click', goToAboutHandler);
  }
}

function goToAboutHandler() {
  window.history.pushState({}, '', '/about');
}

export function HomePageWithListeners() {
  const view = HomePage();
  setTimeout(() => addHomeEventListeners(), 0);
  return view;
}
