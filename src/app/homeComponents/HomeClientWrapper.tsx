"use client";

import { useState, CSSProperties } from "react";
import SiderBar from "./Sider";
import HeaderNav from "./Header";

export default function HomeClientWrapper() { 
    const [collapsed, setCollapsed] = useState(true);
    const [style, setStyle] = useState<CSSProperties>({
        position: 'fixed',
        zIndex: 50,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    });
    const handleToggle = () => {
        setCollapsed(!collapsed);
        setStyle({
            ...style,
            zIndex: collapsed ? 101:50,
        });
    };

    return (
        <div 
            style={style}
        >
            < HeaderNav collapsed={collapsed} handleToggle={handleToggle} />
            <SiderBar collapsed={collapsed} />
        </div>
    );
}
