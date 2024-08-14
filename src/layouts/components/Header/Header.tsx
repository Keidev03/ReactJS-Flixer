import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from 'classnames/bind';

import images from "../../../assets/images";

import styles from "./Header.module.scss";
import config from "../../../config";
const cx = classNames.bind(styles);


interface HeaderNavItem {
    path: string;
    icon: React.ReactNode;
    display: string;
}


const headerNav: Array<HeaderNavItem> = [
    {
        display: "Home",
        icon: "bx bx-home",
        path: config.routes.home
    },
    {
        display: "Search",
        icon: "bx bx-search",
        path: config.routes.search
    },
    {
        display: "Favourite",
        icon: "bx bx-bookmark",
        path: config.routes.favourite
    },
    {
        display: "Profile",
        icon: "bx bx-user",
        path: config.routes.profile
    }
];

const Header: React.FC = () => {

    const { pathname } = useLocation();
    const headerRef: any = useRef();
    const logoRef: any = useRef();
    const isActive = headerNav.findIndex(e => e.path === pathname);

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                headerRef.current.classList.add(styles.shrink);
            } else {
                headerRef.current.classList.remove(styles.shrink);
            }
        }
        window.addEventListener('scroll', shrinkHeader)
        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        }
    }, [])

    return (
        <header ref={headerRef} className={cx("header")}>
            <div className={cx("inner")}>
                <div ref={logoRef} className={cx("logo")}>
                    <Link to={config.routes.home}>
                        <img src={images.logo} alt="logo" />
                    </Link>
                </div>
                <ul className={cx("navbar")}>
                    {headerNav.map((item, index) => (
                        <li className={cx("nav-item", { 'active': isActive === index })} key={index}>
                            <Link to={item.path}>
                                <i className={cx(item.icon, { 'active': isActive === index })}></i>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    )
}

export default Header