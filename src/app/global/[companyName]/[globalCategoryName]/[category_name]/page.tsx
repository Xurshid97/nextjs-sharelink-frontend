import { GetServerSideProps } from "next";
import Links from "./GlobalLinks";
import { getGlobalCategories } from "@/app/api/categoriesAPI";

interface LinkData {
    id: number;
    title: string;
    url: string;
    image: string; // Assuming image is a URL string
    description: string;
    category_name: string;
    name: string;
    links: LinkData[]; // Recursive type definition
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
        image: string; // Adjusted to string
        description: string;
        category_name: string;
        name: string;
    }[];
}
interface HomeProps {
    links: LinkData[];
    category_name: string;
}

export default function Home({ links, category_name }: HomeProps) {
    return (
        <>
            <Links links={links} category_name={category_name} />
        </>
    );
}

// Server-side data fetching
export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
    const { category_name } = context.query;
    let links: LinkData[] = [];
    let categoryName = Array.isArray(category_name) ? category_name[0] : category_name;

    try {
        const categoriesData = await getGlobalCategories();
        const category = categoriesData.categories.find((cat: Category) => cat.name === categoryName);

        if (category) {
            links = category.links.map(link => ({
                ...link,
                image: typeof link.image === 'string' ? link.image : '',
            }));
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }

    return {
        props: {
            links,
            category_name: categoryName || "",
        },
    };
};
