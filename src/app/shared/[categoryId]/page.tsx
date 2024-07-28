import SharedLinks from "./SharedLinks";

export default function Home({ params }: { params: { categoryId: number } }) {
    return (
        <>
            <SharedLinks params={{ categoryId: params.categoryId }} />
        </>
    );
}
