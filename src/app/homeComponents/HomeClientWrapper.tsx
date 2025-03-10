"use client";

import { useState} from "react";
import SiderBar from "./Sider";
import HeaderNav from "./Header";

export default function HomeClientWrapper() { 
    const [collapsed, setCollapsed] = useState(true);

    const handleToggle = () => {
        console.log("toggle");
        setCollapsed(!collapsed);
    };

    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
            }}
        >
            < HeaderNav collapsed={collapsed} handleToggle={handleToggle} />
            <SiderBar collapsed={collapsed} />
        </div>
    );
}
