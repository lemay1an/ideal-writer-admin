import { baseUrl } from '../apiConfigs';
import { getToday } from '../utils/helpers';
import supabase, { supabaseUrl } from './supabase';

export async function createServing({ servingsName, description, noServings, price, image }) {
  const certName = `${Math.random()}-${image.name}`.replaceAll('/', '');
  const certPath = `${supabaseUrl}/storage/v1/object/public/images/${certName}`;

  const { data, error } = await supabase.from('Servings').insert({
    servingsName,
    serviceDescription: description,
    noServings,
    price,
    image: certPath,
  });

  const { error: storageError } = await supabase.storage.from('images').upload(certName, image, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error || storageError) {
    console.log(storageError.message);
    throw new Error(error?.message);
  }

  return data;
}

export async function getOrders() {
  try {
    const response = await fetch(`${baseUrl}/orders/getAllOrders`, {
      method: 'GET',
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return data.data;
  } catch (error) {
    throw new Error(error?.message || 'Something went wromg');
  }
}

// TODO -> DELETE ORDER
export async function deleteOrder(id) {
  try {
    const response = await fetch(`${baseUrl}/orders/deleteOrder/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error?.message || 'Something went wrong');
  }
}

export async function createOrder(newOrder) {
  const { data, error } = await supabase.from('Orders').insert(newOrder);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getOrdersByDate(date) {
  const { data, error } = await supabase
    .from('Orders')
    .select()
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateOrder(order) {
  try {
    const response = await fetch(`${baseUrl}/orders/markAsActive/${order?._id}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return;
  } catch (error) {
    throw new Error(error?.message || 'Something went wrong');
  }
}
