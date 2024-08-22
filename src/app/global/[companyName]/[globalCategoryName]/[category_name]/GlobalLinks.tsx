// "use server"
import { getGlobalCategories } from "../../../../api/categoriesAPI";
import PublicCategoriesList from './GlobalLinksList'; // Import the client component

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

export default async function PublicCategories( {params }: { params: { category_name: string } }) {
    const publicCategory_name = params.category_name.split("%20").join(" ");
    try {
        const categoriesData = await getGlobalCategories();
        let links: LinkData[] = [];
        categoriesData.categories.forEach((category: LinkData) => {
            if (category.name === publicCategory_name) {
                links = category.links;
            }
        });

        return (
            <PublicCategoriesList links={links} /> // Pass data to client component
        );
    } catch (error) {
        console.error("Error fetching categories:", error);
        return <div>Error loading categories</div>;
    }
}