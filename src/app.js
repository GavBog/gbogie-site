const theme = localStorage.getItem('theme') || 'black';
const themeToggle = document.getElementById('theme-toggle');

switch (theme) {
  case 'black':
    themeToggle.checked = false;
    break;
  case 'light':
    themeToggle.checked = true;
    break;
}
