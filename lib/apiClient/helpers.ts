// const fetcher = url => fetch(url).then(r => r.json())
export async function fetcher(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  // If the status code is not in the range 200-299, we'll throw an error
  if (!res.ok) {
    const error = new Error(`FETCHER: ${res.status}`)
    throw error
  }
  return res.json()
}

export async function creater<T>(url: string, payload: any): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}

export async function updater<T>(url: string, payload: any): Promise<T> {
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}

export async function deleter(url: string): Promise<string> {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  return res.json()
}
