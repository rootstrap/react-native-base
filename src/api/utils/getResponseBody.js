export default (response) => {
  const isBodyEmpty = response.status === 204;

  if (isBodyEmpty) {
    return Promise.resolve();
  }

  return response.json();
};
