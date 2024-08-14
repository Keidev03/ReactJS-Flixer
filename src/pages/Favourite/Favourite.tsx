import React from "react";
import classNames from "classnames/bind"

import styles from "./Favourite.module.scss"
import Oops from "../Oops/Oops";

const cx = classNames.bind(styles);

const Favourite: React.FC = () => {
    return (
        <div className={cx("wrapper")}>
            <Oops/>
        </div>
    )
}

export default Favourite