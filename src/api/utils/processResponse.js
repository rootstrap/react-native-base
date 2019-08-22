import humps from 'humps';

export default async response => {
  if (!response) throw new Error({ message: 'No response returned from fetch' });

  try {
    const json = await response.json();

    response.data = humps.camelizeKeys(json || { message: response.statusText });
    return response;
  } catch (error) {
    response.data = { message: 'Response not JSON' };
    return response;
  }
};
