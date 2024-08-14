import React from "react";
import classNames from "classnames/bind";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer"
import styles from "./MainLayout.module.scss";

const cx = classNames.bind(styles);

interface LayoutProps {
    children: React.ReactNode;
}
const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <div className={cx("container")}>
                <div className={cx("content")}>{children}</div>
            </div>
            <Footer />
        </div >
    )
}

export default MainLayout