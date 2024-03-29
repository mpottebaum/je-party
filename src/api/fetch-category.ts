import { API_URL } from '../constants'
import { ApiCategory } from '../types'
import { createCategory } from '../utils'

export async function fetchCategory() {
  const id = Math.round(Math.random() * 18418)
  const url = API_URL + `/category?id=${id}`
  const resp = await fetch(url)
  if (!resp.ok) throw Error(`fetch category failed\nheaders: ${resp.headers}`)
  const category: ApiCategory = await resp.json()
  return createCategory(category)
}
