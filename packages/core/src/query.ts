import { decode } from "./encoding";
import { LocationQueryRaw } from "./types";

export function parseQuery(search: string): LocationQueryRaw {
  const query: LocationQueryRaw = {}
  if (search === '' || search === '?') return query
  const hasLeadingIM = search[0] === '?'
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&')

  for (const searchParam of searchParams) {
    const eqPos = searchParam.indexOf('=')
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos))
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1))

    query[key] = value
  }

  return query
}