export default async response => {
  try {
    const json = await response.json();
    return json || { message: response.statusText };
  } catch (error) {
    return { message: 'Response not JSON' };
  }
};
