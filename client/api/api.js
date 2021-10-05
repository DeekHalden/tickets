export async function client(
  endpoint,
  {data, token, method, headers: customHeaders, ...customConfig} = {},
) {

  const ep = `${
    typeof window === 'undefined'
      ? 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/v1'
      : '/api/v1'
  }${endpoint}`
  
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
  if (response.ok && response.status === 204) return {}
  const responseData = await response.json()
  if (response.ok) {
    return responseData
  } else {
    return Promise.reject(responseData)
  }
}
