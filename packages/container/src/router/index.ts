import type { BrowserWindow } from 'electron';
import path from 'path';
import type { Route, RouteNames, Routes } from './types';

const devMode = process.env.NODE_ENV === 'development';

const BASE_URL = 'http://localhost:10086/pages';
const BASE_PATH = path.resolve(process.cwd(), './static/pages');

const routeNames: RouteNames = ['home', 'editor'];

export const routes = routeNames.reduce<Routes>((rst, name) => {
  rst[name] = {
    url: `${BASE_URL}/${name}`,
    path: `${BASE_PATH}/${name}/index.html`,
  };
  return rst;
}, {} as Routes);

export const loadContent = (win: BrowserWindow, route: Route): void => {
  if (devMode) {
    win.loadURL(route.url);
  } else {
    win.loadFile(route.path);
  }
};
