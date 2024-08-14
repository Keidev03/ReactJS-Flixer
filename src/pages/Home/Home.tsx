import classNames from "classnames/bind"

import HeroSlide from "../../layouts/components/HeroSlide/HeroSlide"
import List from "../../layouts/components/List/List"
import styles from "./Home.module.scss"
import Button from "../../components/Button/Button";
import React from "react";

const cx = classNames.bind(styles);

const Home: React.FC = () => {
    return (
        <div className={cx("wrapper")}>
            <HeroSlide />
            <div className={cx("container")}>
                <div className={cx("section")}>
                    <div className={cx("header")}>
                        <h2>Lasted Update</h2>
                        <Button rounded outline to={"/favourite"}>View more</Button>
                    </div>
                    <List />
                </div>
                <div className={cx("section")}>
                    <div className={cx("header")}>
                        <h2>Top Rating</h2>
                        <Button rounded outline to={"/favourite"}>View more</Button>
                    </div>
                    <List />
                </div>
                <div className={cx("section")}>
                    <div className={cx("header")}>
                        <h2>Movies</h2>
                        <Button rounded outline to={"/favourite"}>View more</Button>
                    </div>
                    <List />
                </div>
                <div className={cx("section")}>
                    <div className={cx("header")}>
                        <h2>TV Series</h2>
                        <Button rounded outline to={"/favourite"}>View more</Button>
                    </div>
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Home