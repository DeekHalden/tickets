export async function client(
  endpoint,
  {data, token, method, headers: customHeaders, ...customConfig} = {},
  headers = '',
) {
  const ep = `${
    typeof window === 'undefined'
      ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local'
      : ''
  }${endpoint}`
  console.log(ep)
  const config = {
    method: method || 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }
  const response = await fetch(ep, config)
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  } else {
    return Promise.reject(responseData)
  }
}
