import { useState } from "react";
import { getAccessToken } from "../constants/storage";
import { getCategories, postCategory } from "../api/categoriesAPI";
import { BASE_URL, CATEG_URL } from "../constants/urls";
import { userCreateWithoutAccessToken } from "../api/userAPI";
import "./CreateCategory.css";
import { message } from "antd";

interface Props {
    setCategories: Function;
}

function CreateCategory({ setCategories }: Props) {
    const [categoryName, setCategoryName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const access_token = getAccessToken();
            if (access_token) {
                messageApi.info("Collection has been sent");
                let response = await postCategory(CATEG_URL, { name: categoryName });
                console.log("response", response.error);
                if (response.error === "SiteUser matching query does not exist.") {
                    localStorage.setItem("Access token Sharelink", "")
                    messageApi.info("Please try one more time");
                }
                const categoriesData = await getCategories(CATEG_URL);
                setCategories(categoriesData.categories);
                setCategoryName("");
            } else {
                await userCreateWithoutAccessToken(BASE_URL);
                await postCategory(CATEG_URL, { name: categoryName });
                const categoriesData = await getCategories(CATEG_URL);
                setCategories(categoriesData.categories);
                setCategoryName("");
            }
        } catch (error) {
            console.error("Error creating Collection:", error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    };

    return (
        <>
            {contextHolder}
            <form
                onSubmit={handleSubmit}
                className="create-category-form"
                style={{}}>
                <input
                    type="text"
                    value={categoryName}
                    onChange={handleChange}
                    placeholder="Collection name"
                    required
                    className="create-category-input"
                />
                <button
                    type="submit"
                    className="create-category-button">
                    Create
                </button>
            </form>
        </>
    );
}

export default CreateCategory;
