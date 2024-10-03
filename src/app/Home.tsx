import "./homeComponents/Home.css";
import { Layout } from "antd";
import SiderBar from "./homeComponents/Sider";
import HeaderNav from "./homeComponents/Header";
import Content from "antd/lib/layout/layout";


function Home({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div
            style={{
                height: "100%",
            }}
        >
            <Layout style={{
                height: "100vh",
                width: "100%",
            }}>
                <SiderBar />

                <Layout>
                    <HeaderNav />

                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                        }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
}

export default Home;
