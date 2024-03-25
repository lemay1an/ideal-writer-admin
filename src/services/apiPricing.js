import { baseUrl } from '../apiConfigs';

export async function getPricing() {
  try {
    const response = await fetch(`${baseUrl}/price/getAllPricing`, {
      method: 'GET',
    });

    const data = await response.json();

    return data.data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deletePricing(id) {
  try {
    const response = await fetch(`${baseUrl}/price/deletePricing/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
}
