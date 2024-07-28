import axios, { AxiosResponse } from "axios";
import { getAccessToken, getStoredCategories, setAccessToken } from "../constants/storage";
import { BASE_URL } from "../constants/urls";

export async function userCreateWithoutAccessToken(url: string): Promise<any> {
    const storedCategories = getStoredCategories();
    try {
        const response: AxiosResponse = await axios.get(url, {
            maxRedirects: 5,
            headers: {
                Authorization: `userCreateWithoutAccessToken${storedCategories}`,
                "Content-Type": "application/json",
            },
        });
        setAccessToken(response.data);
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

export async function userCreateWithUsernameAndPassword(
    url: string,
    access_token: string,
    data: FormData // Change object to FormData
) {
    try {
        const response: AxiosResponse = await axios.post(url, data, {
            headers: {
                Authorization: `${access_token}`, // Example header
                "Content-Type": "multipart/form-data", // Change content type
            },
        });
        setAccessToken(response.data);
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

// function to get user data
export async function getUserData(access_token: string) {
    const url = BASE_URL;
    try {
        const response: AxiosResponse = await axios.get(url, {
            headers: {
                Authorization: `${access_token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

// delete user with access token
export async function deleteUser(url: string, access_token: string) {
    try {
        const response: AxiosResponse = await axios.delete(url, {
            headers: {
                Authorization: `${access_token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

// login user with username and password
export async function loginWithAccessToken(
    username: string,
    password: string,
    access_token: string | null
) {
    try {
        const response: AxiosResponse = await axios.post(
            BASE_URL,
            {
                username: username,
                password: password,
            },
            {
                headers: {
                    Authorization: `log_in_with_token${access_token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

export async function loginWithoutAccessToken(
    username: string,
    password: string
) {
    try {
        const response: AxiosResponse = await axios.post(
            BASE_URL,
            {
                username: username,
                password: password,
            },
            {
                headers: {
                    Authorization: `log_in_without_token`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

export async function saveCategoryListToUser(savedCategories: any[]) {
    const access_token = getAccessToken()
    try {
        const response: AxiosResponse = await axios.patch(
            BASE_URL,
            {
                savedCategories: savedCategories,
            },
            {
                headers: {
                    Authorization: access_token,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}

export async function patchUserData(
    access_token: string,
    data: FormData // Change object to FormData
) {
    try {
        const response: AxiosResponse = await axios.patch(BASE_URL, data, {
            headers: {
                Authorization: `${access_token}saveimage`, // Example header
                "Content-Type": "multipart/form-data", // Change content type
            },
        });
        setAccessToken(response.data);
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}