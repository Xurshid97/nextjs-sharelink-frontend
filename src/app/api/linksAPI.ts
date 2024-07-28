import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../constants/storage";

export async function getLinks(url: string, categoryId: number): Promise<any> {
    const headers = {
        Authorization: `${getAccessToken()}broken${categoryId}`,
        "Content-Type": "application/json",
    };

    try {
        const response: AxiosResponse = await axios.get(url, { headers });
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

export async function postLink(url: string, data: FormData): Promise<any> {
    const headers = {
        Authorization: `${getAccessToken()}`,
        "Content-Type": "multipart/form-data",
    };
    // console.log("postLink data:", data);
    try {
        const response: AxiosResponse = await axios.post(url, data, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

// after edit button clicked this function needs to send data
export async function patchLink(url: string, data: object): Promise<any> {
    const headers = {
        Authorization: `${getAccessToken()}`,
        "Content-Type": "multipart/form-data",
    };

    try {
        const response: AxiosResponse = await axios.patch(url, data, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

export async function deleteLink(url: string, id: number): Promise<any> {
  const headers = {
      Authorization: `${getAccessToken()}`,
      "Content-Type": "application/json",
  };

  const config = {
      headers,
      data: {
          id: id, // replace categoryId with the actual id of the category you want to delete
      },
  };

  try {
      const response: AxiosResponse = await axios.delete(url, config);
      return response.data;
  } catch (error) {
      console.error("Axios error:", error);
      throw error;
  }
}