"use client";

import { useState, useEffect } from "react";
import "./Home.css";
import {
    AppstoreOutlined,
    FileDoneOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    ClusterOutlined,
    GlobalOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Link from "next/link";
import Breadcrumbs from "./breadcrumb";

const { Header, Sider, Content } = Layout;

export default function SiderBar() {
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
        <Sider
            className={`custom-sider ${collapsed ? "collapsed" : ""
                }`}
            trigger={null}
            collapsible
            collapsed={collapsed}
            collapsedWidth={collapsedWidth} // set the width when collapse
        >
            <div className="demo-logo-vertical" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}>
                <Menu.Item key="/logo"></Menu.Item>
                <Menu.Item
                    key="/user"
                    icon={
                        <Link href="/user">
                            <UserOutlined className="menu-item-icon" />
                        </Link>
                    }>
                    <Link
                        href="/user"
                        className="menu-item-text">
                        User
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="/categories"
                    icon={
                        <Link href="/category">
                            <AppstoreOutlined className="menu-item-icon" />
                        </Link>
                    }>
                    <Link
                        href="/category"
                        className="menu-item-text">
                        Categories
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="/shared"
                    icon={
                        <Link href="/shared">
                            <ClusterOutlined className="menu-item-icon" />
                        </Link>
                    }>
                    <Link
                        href="/shared"
                        className="menu-item-text">
                        Shared with you
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="/global"
                    icon={
                        <Link href="/global">
                            <GlobalOutlined className="menu-item-icon" />
                        </Link>
                    }>
                    <Link
                        href="/global"
                        className="menu-item-text">
                        Global Data
                    </Link>
                </Menu.Item>
                <Menu.Item
                    key="/about"
                    icon={
                        <Link href="/about">
                            <FileDoneOutlined className="menu-item-icon" />
                        </Link>
                    }>
                    <Link
                        href="/about"
                        className="menu-item-text">
                        About Us
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}