import PublicCategories from "./GlobalLinks";

export default function Home({ params }: { params: { category_name: string } }) {

    return (
        <>
            <PublicCategories params={{ category_name: params.category_name }} />
        </>
    );
}