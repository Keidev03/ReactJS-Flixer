import React from "react";
import classNames from "classnames/bind";
import styles from "./Player.module.scss";

import images from "../../assets/images";
const cx = classNames.bind(styles);

const Player: React.FC<any> = ({ src }) => {
    return (
        <>
            {
                src !== "No server data available" ? (<div className={cx("video")}>

                    <iframe
                        src={src}
                        allowFullScreen
                    >
                    </iframe>

                </div>) : (
                    < img className={cx("img")} src={images.oops} width={"100%"} height={"500vw"} />
                )
            }
        </>
    )
}

export default Player