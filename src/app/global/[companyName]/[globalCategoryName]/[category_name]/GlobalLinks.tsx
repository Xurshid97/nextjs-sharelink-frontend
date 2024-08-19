import { GetServerSideProps } from "next";
import { Avatar, Card, Divider, List, Skeleton } from "antd";
import Link from "next/link";
import Meta from "antd/es/card/Meta";
import { ShareAltOutlined, ExportOutlined } from "@ant-design/icons";
import { getGlobalCategories } from "@/app/api/categoriesAPI";
import { changed_img } from "../../../../constants/urls";
import styles from './styles.module.css';

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

interface LinksProps {
    links: LinkData[];
    category_name: string;
}

const Links = ({ links, category_name }: LinksProps) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
            }}>
           
           <div
                id="scrollableDiv"
                style={{
                    height: "70vh",
                    width: "100%",
                    overflow: "auto",
                    padding: "0 16px",
                    border: "none",
                }}>
                {links.length === 0 ? (
                    <Skeleton avatar paragraph={{ rows: 2 }} active />
                ) : (
                    <List
                        className={styles.cardsParent}
                        dataSource={links}
                        renderItem={(link) => (
                            <Card
                                className={styles.cardLinks}
                                cover={
                                    link.image ? (
                                        <Avatar
                                            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                                            style={{
                                                width: "100%",
                                                border: "none",
                                                height: "100%",
                                                padding: "5px",
                                                backgroundColor: "transparent",
                                            }}
                                            icon={
                                                <img
                                                    src={changed_img + link.image}
                                                    alt={link.title}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                        borderRadius: "8px",
                                                    }}
                                                />}
                                        />
                                    ) : (
                                        <ShareAltOutlined />
                                    )
                                }
                                key={link.id}>
                                <div className="link-details">
                                    <Card
                                        style={{
                                            border: "none",
                                            width: "100%",
                                        }}>
                                        <Meta
                                            title={
                                                <Link
                                                    href={`${link.url}`}
                                                    target={"_blank"}
                                                    rel="noopener noreferrer">
                                                    <div
                                                        style={{
                                                            display: "inline-block",
                                                            whiteSpace: "normal",
                                                            wordWrap: "break-word",
                                                        }}
                                                    >
                                                        {link.title}
                                                        <ExportOutlined style={{
                                                            marginLeft: "8px",
                                                        }} />
                                                    </div>

                                                    <p
                                                        style={{
                                                            fontSize: "12px",
                                                            color: "gray",
                                                            marginTop: "1px",
                                                            marginBottom: "1px",
                                                        }}>
                                                        {link.url.split("/")[2] === 't.me' ?
                                                            link.url.split("//")[1] :
                                                            link.url.split("//")[0] + "//" + link.url.split("/")[2]
                                                        }
                                                    </p>
                                                </Link>
                                            }
                                            description={link.description}
                                        />
                                    </Card>
                                </div>
                            </Card>
                        )}
                    />
                )}
            </div>
        </div>
    );
};

// Server-side data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
    const { category_name } = context.query;

    let links: LinkData[] = [];
    let categoryName = Array.isArray(category_name) ? category_name[0] : category_name;

    try {
        const categoriesData = await getGlobalCategories();
        const category = categoriesData.categories.find((cat: Category) => cat.name === categoryName);

        if (category) {
            links = category.links.map(link => ({
                ...link,
                // Make sure the image property is a string
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

export default Links;
