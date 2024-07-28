import axios, { AxiosResponse } from "axios";

// send image to backend with access token and return the location of the image
export async function uploadImageForCreateLink(
    access_token: string,
    file: File,
    url: string
): Promise<any> {
    const headers = {
        Authorization: `${access_token}`,
    };

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response: AxiosResponse = await axios.post(url, formData, {
            headers,
        });
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
}
