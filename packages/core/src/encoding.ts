export function decode(text: string | number): string {
  return decodeURIComponent('' + text)
}
