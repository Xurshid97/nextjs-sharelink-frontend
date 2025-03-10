import "./homeComponents/Home.css";
import { Layout } from "antd";
import Content from "antd/lib/layout/layout";
import HomeClientWrapper from "./homeComponents/HomeClientWrapper";

interface HomeProps {
    children: React.ReactNode;
}

function Home({ children }: Readonly<HomeProps>) {
    return (
            <Layout style = {{height: '100vh'}}>
                <HomeClientWrapper />

                {/* <Content style={{padding: '10% 20% !important',}}> */}
                <Content>
                    {children}
                </Content>
            </Layout>
    );
}

export default Home;
