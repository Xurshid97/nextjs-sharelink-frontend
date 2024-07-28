import axios, { AxiosResponse } from "axios";
import { getAccessToken } from "../constants/storage";
import { CATEG_URL } from "../constants/urls";

export async function getCategories(url: string): Promise<any> {
    const headers = {
        Authorization: `${getAccessToken()}`,
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

export async function postCategory(url: string, data: object): Promise<any> {
    let access_token = getAccessToken();
    if (access_token === null) {
        access_token = "";
    }
    const headers = {
        Authorization: `${access_token}`,
        "Content-Type": "application/json",
    };

    try {
        const response: AxiosResponse = await axios.post(url, data, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

interface Array {
    listOfCategories: [];
}

export async function getSharedCategories(
    url: string,
    listOfCategories: Array[]
): Promise<any> {
    let token: string = "";
    if (getAccessToken() !== null) {
        token = getAccessToken()?.trimEnd() || ""; // Provide a default value of an empty string if getAccessToken() returns undefined
    }
    const headers = {
        Authorization: `${token}SharedCategoryListSent${listOfCategories}`,
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

// after edit button clicked this function needs to send data
export async function patchCategory(url: string, data: object): Promise<any> {
    const headers = {
        Authorization: `${getAccessToken()}`,
        "Content-Type": "application/json",
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

// send delete request to the server
export async function deleteCategory(url: string, id: number): Promise<any> {
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


export async function getGlobalCategories(): Promise<any> {
    const headers = {
        Authorization: `global_categories`,
        "Content-Type": "application/json",
    };

    try {
        const response: AxiosResponse = await axios.get(CATEG_URL, {
            headers,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}