
import { getGlobalCategories } from "../../../../api/categoriesAPI";
import Links from "./GlobalLinksList";


interface LinkData {
    id: number;
    title: string;
    url: string;
    image: File | string;
    description: string;
    category_name: string;
    name: string;
    links: Array<LinkData>;
}

// Assuming that the getGlobalCategories() returns a response that looks like this:
interface Category {
    id: number;
    name: string;
    links: LinkData[]; // Array of links
}

interface CategoriesResponse {
    categories: Category[]; // Assuming the API response has this structure
}

export default async function PublicCategories({ params }: { params: { category_name: string } }) {
    console.log("Params:", params.category_name);
    let publicCategory_name = params.category_name.split("%20").join(" ");
    publicCategory_name = publicCategory_name.split("%2C").join(",");
    try {
        const categoriesData: CategoriesResponse = await getGlobalCategories();
        let links: LinkData[] = [];

        categoriesData.categories.forEach((category) => {
            if (category.name === publicCategory_name) {
                links = category.links;
            }
        });

        return <Links links={links} />;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return <div>Error loading categories</div>;
    }
}
