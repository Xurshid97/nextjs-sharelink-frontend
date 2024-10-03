
import {
    Card,
    Skeleton,
} from "antd";
import Link from "next/link";

type Category = {
    id: number;
    name: string;
    globalcategory: string,
    isPublic: boolean;
    username: string;
};

export default function PublicCategories({ categories }: { categories: Category[] }) {
    const loading = !categories.length;

    return (
        <div
            id="scrollableDiv"
            style={{
                height: "70vh",
                overflow: "auto",
                padding: "0 16px",
            }}>
            {
                loading ?
                    <ul
                        style={{
                            listStyleType: "none",
                            padding: "0",
                            margin: "0",
                            width: "100%",
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "16px",
                        }}>
                        <Card
                            className="category-card"
                            style={{
                                marginBottom: "16px",
                            }}>
                            <Skeleton
                                loading={loading}
                                avatar
                                active>
                                <p
                                    style={{
                                        color: "blue",
                                        fontWeight: "bold",
                                    }}>
                                    Category Name
                                </p>
                            </Skeleton>
                        </Card>
                    </ul>
                    :
                    <ul
                    style={{
                        listStyleType: "none",
                        padding: "0",
                        margin: "0",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        flexWrap: "wrap",
                        gap: "16px",
                    }}
                >
                    {
                        categories.map((category) => (
                            <Card
                                    key={category.id}
                                    className="category-card"
                                    style={{
                                        marginBottom: "16px",
                                    }}>
                                    <Skeleton
                                        loading={loading}
                                        avatar
                                        active>
                                        <Link
                                            href={`global/${(category as { username: string }).username}/${(category as { globalcategory: string }).globalcategory}/${(category as { name: string }).name}`}>
                                            <p
                                                style={{
                                                    color: "blue",
                                                    fontWeight: "bold",
                                                }}>
                                                {(category as { name: string }).name}
                                            </p>
                                        </Link>
                                    </Skeleton>
                                </Card>
                        )
                        )
                        }
                    </ul>
            }
        </div>
    );
}