import { baseUrl } from '../apiConfigs';

export async function getPricing() {
  try {
    const response = fetch(`${baseUrl}/price/getAllPricing`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();

    console.log(data.data);

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
