
export function homeView() {
  return `
    <h1>Home Page</h1>
  `;
}

function addHomeEventListeners() {
  document.getElementById('go-to-about')?.addEventListener('click', goToAboutHandler);
}


function goToAboutHandler() {
  window.history.pushState({}, '', '/about');
}


export function homeViewWithListeners() {
  const view = homeView();
  setTimeout(() => addHomeEventListeners(), 0);
  return view;
}
