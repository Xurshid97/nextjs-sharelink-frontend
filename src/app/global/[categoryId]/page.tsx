import Links from "./GlobalLinks";

export default function Home({ params }: { params: { categoryId: number } }) {
    return (
        <>
            <Links params={{ categoryId: params.categoryId }} />
        </>
    );
}