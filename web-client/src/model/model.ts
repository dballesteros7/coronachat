export interface Template {
  header: string;
  menuItems: MenuItem[];
}

export type ReadOnlyTemplate = {
  readonly [K in keyof Template]: Template[K];
};

export interface MenuItem {
  id: number;
  title: string;
  content: string;
  footerItems: Array<string>;
}

export interface User {
  id: string;
  isLoggedIn: boolean;
}
