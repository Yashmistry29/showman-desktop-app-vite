import { url, test_url } from "../Data/BaseURL"

export const goToURL = (url, newTab = true) => {
  if (newTab) {
    window.open(url, "_blank")
  } else {
    window.open(url, "_self")
  }
}

export const sendRequest = async (endpoint = '', method = 'GET', body, test = true) => {
  const URL = test ? test_url : url;
  const httpMethod = method.toUpperCase();
  const isReadRequest = httpMethod === 'GET' || httpMethod === 'HEAD';
  const query = new URLSearchParams();

  if (isReadRequest && body) {
    Object.entries(body).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value));
      }
    });
  }

  const queryString = query.toString();
  const requestUrl = `${URL}${endpoint}${queryString ? `${endpoint.includes('?') ? '&' : '?'}${queryString}` : ''}`;
  const response = await fetch(requestUrl, {
    method: httpMethod,
    headers: { "Content-Type": "application/json" },
    body: isReadRequest ? undefined : JSON.stringify(body)
  })
  const data = await response.json();

  return data;
}