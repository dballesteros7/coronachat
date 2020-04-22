export interface Template {
  header: string;
  menuItems: MenuItem[];
}

export type ReadOnlyTemplate = {
  readonly [K in keyof Template]: Template[K];
};

export function getIsTitleInvalid(title: string): boolean {
  return title.length === 0;
}

export function getIsContentInvalid(content: string): boolean {
  return content.length === 0;
}

export interface MenuItem {
  id: number;
  title: string;
  content: string;
  footerItems: Array<string>;
}

export interface User {
  id: string;
  authToken: string;
}
