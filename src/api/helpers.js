import param from 'jquery-param';

export const getData = (url, data) => {
  const params = param(data)
  return fetch(`http://localhost:3001/api/${url}?${params}`)
  .then((res) => res.json())
  .then((res) => res.data)
}