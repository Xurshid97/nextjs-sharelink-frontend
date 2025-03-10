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

interface HeaderNavProps {
    collapsed: boolean;
    handleToggle: () => void;
}

export default function HeaderNav({ collapsed, handleToggle }:HeaderNavProps) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
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