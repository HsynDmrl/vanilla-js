export function footer() {
  return `
    <footer class="footer">
      <div class="footer-container">
        <p class="footer-text">&copy; 2024 Hüseyin Demirel.</p>
        <nav class="footer-links">
          <a href="/privacy" onclick="event.preventDefault(); navigate('/privacy')">Privacy Policy</a>
          <a href="/terms" onclick="event.preventDefault(); navigate('/terms')">Terms of Service</a>
          <a href="/contact" onclick="event.preventDefault(); navigate('/contact')">Contact Us</a>
        </nav>
      </div>
    </footer>
  `;
}
