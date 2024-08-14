import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import images from "../../../assets/images"
import styles from "./Footer.module.scss"

const cx = classNames.bind(styles)

const Footer: React.FC = () => {
    return (
        <div className={cx("footer")} style={{ backgroundImage: `url(${images.footer})` }}>
            <div className={cx("content")}>
                <div className={cx("logo")}>
                    <Link to={"/"} className={cx("logo-link")}><img src={images.logo} alt="logo" /></Link>
                </div>
                <div className={cx("menus")}>
                    <div className={cx("menu")}>
                        <h4>Explore</h4>
                        <Link to={"/"}>Home</Link>
                        <Link to={"/search"}>Search</Link>
                        <Link to={"/favourite"}>Favourite</Link>
                        <Link to={"/profile"}>Profile</Link>
                    </div>
                    <div className={cx("menu")}>
                        <h4>Community</h4>
                        <Link to={"/forums"}>Forums</Link>
                        <Link to={"/hentai"}>Hentai</Link>
                        <Link to={"/events"}>Events</Link>
                    </div>
                    <div className={cx("menu")}>
                        <h4>Support</h4>
                        <Link to={"/faq"}>FAQ</Link>
                        <Link to={"/contact"}>Contact Us</Link>
                        <Link to={"/terms"}>Terms of Service</Link>
                        <Link to={"/privacy"}>Privacy Policy</Link>
                    </div>
                    <div className={cx("menu")}>
                        <h4>About Us</h4>
                        <Link to={"/about"}>About Us</Link>
                        <Link to={"/careers"}>Careers</Link>
                        <Link to={"/press"}>Press</Link>
                        <Link to={"/partners"}>Partners</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer