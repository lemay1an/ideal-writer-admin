/* eslint-disable object-shorthand */
import { baseUrl } from '../apiConfigs';
import { getToday } from '../utils/helpers';
import supabase from './supabase';

export async function signUp({ email, password, role }) {
  try {
    const response = await fetch(`${baseUrl}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        passwordConfirm: password,
        role: role,
      }),
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();

    await markAsAdmin(data.data.user._id);

    return data;
  } catch (error) {
    throw new Error(error?.message || 'Something went wrong');
  }
}

async function markAsAdmin(id) {
  try {
    const response = await fetch(`${baseUrl}/user/markAsAdmin/${id}`, {
      method: 'PATCH',
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    throw new Error(error?.message || 'Something went wrong');
  }
}

export async function logIn({ email, password }) {
  try {
    const response = await fetch(`${baseUrl}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return data;
  } catch (error) {
    throw new Error(error?.message || 'Something went wrong');
  }
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getUsers(token) {
  try {
    const response = await fetch(`${baseUrl}/user/getUsers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    return data.data;
  } catch (error) {
    throw new Error(error?.message || 'Something went wrong');
  }
}

export async function getUsersByDate(date) {
  const { data, error } = await supabase
    .from('Users')
    .select()
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteUser(id) {
  console.log(id);
  try {
    const response = await fetch(`${baseUrl}/user/deleteUser/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Something went wrong');
    }
  } catch (error) {
    throw new Error(error?.message || 'Something went wrongs');
  }
}
