"use client";
import { useState, useEffect } from "react";
import "./Home.css";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import Breadcrumbs from "./breadcrumb";

const { Header } = Layout;
export default function HeaderNav() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [collapsedWidth, setCollapsedWidth] = useState(40); // default width for large screens

    const [collapsed, setCollapsed] = useState(true);

    useEffect(() => {
        // telegr.ready()
        const handleResize = () => {
            if (window.innerWidth < 600) {
                setCollapsed(true);
                setCollapsedWidth(0); // collapse completely on small screens
            } else {
                setCollapsed(true);
                setCollapsedWidth(40); // only icons on large screens
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // call the function initially

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggle = () => {
        if (window.innerWidth < 600) {
            if (collapsedWidth === 0) {
                setCollapsedWidth(collapsed ? 40 : 0);
            } else {
                setCollapsedWidth(0);
                setCollapsed(true);
            }
        } else {
            setCollapsed(!collapsed);
            setCollapsedWidth(collapsed ? 200 : 40);
        }
    };
    return (
        <Header
            style={{
                padding: 0,
                background: colorBgContainer,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                width: "100%",
                paddingRight: 16,
            }}>
            <div
                style={{
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                }}>
                <Button
                    type="text"
                    icon={
                        collapsed ? (
                            <MenuUnfoldOutlined />
                        ) : (
                            <MenuFoldOutlined />
                        )
                    }
                    onClick={handleToggle}
                    style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                    }}
                />
                <Breadcrumbs />
            </div>
            <h3
                className="title">
                ShareLink
            </h3>
        </Header>
    );
}