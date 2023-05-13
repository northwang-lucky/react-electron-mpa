import { app, BrowserWindow } from 'electron';
import path from 'path';

const createHomeWindow = (): void => {
  const home = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
  });

  home.loadFile(path.resolve(__dirname, '../../view/dist/pages/home/index.html'));
};

app.whenReady().then(() => {
  createHomeWindow();
});
