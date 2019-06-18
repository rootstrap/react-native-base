export default async (response) => {
  const isBodyEmpty = !response || response.status === 204;
  if (!isBodyEmpty) return response.json();
};
