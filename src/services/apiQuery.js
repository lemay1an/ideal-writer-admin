import { baseUrl } from '../apiConfigs';

export async function getQueries() {
  try {
    const response = await fetch(`${baseUrl}/contact/getAllContact`, {
      method: 'GET',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return data.data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteQuery(id) {
  console.log(id);
  try {
    await fetch(`${baseUrl}/contact/deleteContact/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error(error);
  }
}
