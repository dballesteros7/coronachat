export interface Template {
  header: string
  menuItems: MenuItem[]
}

export interface MenuItem {
  index: number
  title: string
  content: string
  footerItems: Array<string>
}