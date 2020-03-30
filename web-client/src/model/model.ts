export interface Template {
  header: string
  menuItems: MenuItem[]
}

export interface MenuItem {
  id: number
  title: string
  content: string
  footerItems: Array<string>
}