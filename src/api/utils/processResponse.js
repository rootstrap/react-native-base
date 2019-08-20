import humps from 'humps';

export default async response => {
  if (!response) throw new Error({ message: 'No response returned from fetch' });

  try {
    const json = await response.json();

    response.body = humps.camelizeKeys(json || { message: response.statusText });
    return response;
  } catch (error) {
    response.body = { message: 'Response not JSON' };
    return response;
  }
};
