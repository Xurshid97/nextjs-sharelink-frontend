import Links from "./GlobalLinks";

export default function Home({ params }: { params: { category_name: string } }) {

    return (
        <>
            <Links params={{ category_name: params.category_name }} />
        </>
    );
}