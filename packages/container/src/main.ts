import { app, BrowserWindow } from 'electron';
import { loadContent, routes } from '@/router';

const createHomeWindow = (): void => {
  const home = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
  });
  loadContent(home, routes.home);
};

app.whenReady().then(() => {
  createHomeWindow();
});
