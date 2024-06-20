const theme = localStorage.getItem('theme') || 'sunset';
const themeToggle = document.getElementById('theme-toggle');

switch (theme) {
  case 'sunset':
    themeToggle.checked = false;
    break;
  case 'light':
    themeToggle.checked = true;
    break;
}
