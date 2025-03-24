import { api } from "../lib/axios";

export async function loginUser(email, password) {
  const url = `/auth/login`;

  const data = {
    email,
    password,
  };

  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      console.error("API Error Response:", error.response.data.message);
      throw error;
    }

    throw new Error("Ett oväntat fel inträffade.");
  }
}

export async function refreshAccessToken() {
  const url = "/auth/refresh";

  try {
    const response = await api.post(url);
    if (response.data) {
      return response.data;
    } else {
      throw new Error("Invalid response from refresh endpoint.");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Kunde inte uppdatera access token.");
  }
}

export async function logoutUser() {
  const url = `/auth/logout`;
  try {
    await api.post(url);

    return;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Error");
  }
}

export async function registerUser(firstName, lastName, email, password) {
  const url = `/auth/register`;
  const data = {
    firstName,
    lastName,
    email,
    password,
  };

  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function getUser(id) {
  const url = `/auth/user/${id}`;

  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      console.error("API Error Response:", error.response.data.message);
      throw error;
    }

    throw new Error("Ett oväntat fel inträffade.");
  }
}

export async function getAllUsers() {
  const url = `/auth/users`;

  try {
    const response = await api.get(url);

    return response.data;
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      console.error("API Error Response:", error.response.data.message);
      throw error;
    }

    throw new Error("Ett oväntat fel inträffade.");
  }
}

export async function makeUserAdmin(email) {
  const url = `/auth/makeadmin`;

  try {
    await api.post(url, email);

    return;
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      console.error("API Error Response:", error.response.data.message);
      throw error;
    }

    throw new Error("Ett oväntat fel inträffade.");
  }
}

export async function removeAdminStatus(email) {
  const url = `/auth/removeadmin`;

  try {
    await api.post(url, email);

    return;
  } catch (error) {
    console.error("Error:", error);

    if (error.response) {
      console.error("API Error Response:", error.response.data.message);
      throw error;
    }

    throw new Error("Ett oväntat fel inträffade.");
  }
}
