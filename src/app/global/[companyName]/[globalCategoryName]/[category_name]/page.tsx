import { getGlobalCategories } from "@/app/api/categoriesAPI";
import Links from "./GlobalLinks";

interface LinkData {
    id: number;
    title: string;
    url: string;
    image: string;
    description: string;
    category_name: string;
    name: string;
    links: LinkData[];
}

interface Category {
    id: number;
    name: string;
    globalcategory: string;
    isPublic: boolean;
    username: string;
    links: {
        id: number;
        title: string;
        url: string;
        image: string;
        description: string;
        category_name: string;
        name: string;
    }[];
}

export default async function Page({ params }: { params: { category_name: string } }) {
    const { category_name } = params;
    console.log("category_name", category_name)
    let links: LinkData[] = [];

    try {
        const categoriesData = await getGlobalCategories();
        const category = categoriesData.categories.find((cat: Category) => cat.name === category_name);

        if (category) {
            links = category.links.map(link => ({
                ...link,
                image: typeof link.image === 'string' ? link.image : '',
            }));
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }

    return (
        <Links links={links} category_name={category_name} />
    );
}
