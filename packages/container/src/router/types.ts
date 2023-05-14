export type Route = {
  url: string;
  path: string;
};

export type Routes = {
  home: Route;
  editor: Route;
};

export type RouteNames = (keyof Routes)[];
