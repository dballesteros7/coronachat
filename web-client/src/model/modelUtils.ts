export function getIsTitleInvalid(title: string): boolean {
  return title.length === 0;
}

export function getIsContentInvalid(content: string): boolean {
  return content.length === 0;
}
