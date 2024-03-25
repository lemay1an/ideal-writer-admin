import { baseUrl } from '../apiConfigs';

export async function getBlogs() {
  try {
    const response = await fetch(`${baseUrl}/blogs/getAll`, {
      method: 'GET',
    });

    const data = await response.json();

    return data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function createBlog(title, description) {
  console.log(description);
  try {
    const response = await fetch(`${baseUrl}/blogs/createBlog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: '',
        password: 'password',
      }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error('');
    }

    const data = await response.json();
    console.log(data);

    return data.data.data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteBlog(id) {
  console.log(id);
  try {
    const res = await fetch(`${baseUrl}/blogs/deleteBlog/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    console.log(res.status);

    if (!res.status !== 204) {
      throw new Error('Something went wrong');
    }

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
