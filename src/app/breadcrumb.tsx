import React from "react";
import { Breadcrumb } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Breadcrumbs: React.FC = () => {
    const router = useRouter();
    const pathname = router?.pathname || "/";
    const pathSnippets = pathname.split("/").filter((i) => i);

    const breadcrumbNameMap: { [key: string]: string } = {
        "/category": "Categories",
        "/category/category": "Links",
        "/user": "User",
        "/user/register": "Register",
        "/user/login": "Login",
        "/about": "About Us",
        "/shared": "Shared",
        "/shared/shared": "Links",
        "/global": "Global",
    };

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
        if (breadcrumbNameMap[url]) {
            return (
                <Breadcrumb.Item key={url}>
                    <Link href={url} passHref>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        }
        return null;
    }).filter(Boolean); // Remove null values

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link href="/" passHref>
                Home
            </Link>
        </Breadcrumb.Item>,
        ...extraBreadcrumbItems,
    ];

    return <Breadcrumb>{breadcrumbItems}</Breadcrumb>;
};

export default Breadcrumbs;
