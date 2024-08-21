<<<<<<< HEAD
import { Avatar, Card, List, Skeleton } from "antd";
=======
import { getAccessToken } from "../../../../constants/storage";
import { getLinks } from "../../../../api/linksAPI";
import { CATEG_URL, LINKS_URL, changed_img } from "../../../../constants/urls";
>>>>>>> 1a2636a (global links server side rendering)
import Link from "next/link";
import Meta from "antd/es/card/Meta";
import { ShareAltOutlined, ExportOutlined } from "@ant-design/icons";
import { changed_img } from "../../../../constants/urls";
import styles from './styles.module.css';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
interface LinkData {
    id: number;
    title: string;
    url: string;
    image: string;
    description: string;
    category_name: string;
    name: string;
<<<<<<< HEAD
    links: LinkData[];
}

interface LinksProps {
    links: LinkData[];
    category_name: string;
}

const Links = ({ links, category_name }: LinksProps) => {
=======
    links: Array<LinkData>;
    categories: Array<LinkData>;
  }
  
  async function Links({ params }: { params: { category_name: string } }) {
    let links: LinkData[] = [];
    let loading: boolean = false;
    const publicCategory_name = params?.category_name?.split("%20").join(" ");
  
    const fetchData = async () => {
      loading = true;
      try {
        const categoriesData: LinkData[] = await getGlobalCategories(); // Await the result
        categoriesData?.forEach((category: LinkData) => {
          if (category.name === publicCategory_name) {
            links = category.links;
          }
        });
      } catch (error) {
        console.error("Error fetching links:", error);
      }
      loading = false;
    };
  
    await fetchData(); 
>>>>>>> 1a2636a (global links server side rendering)
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

export default Links;
