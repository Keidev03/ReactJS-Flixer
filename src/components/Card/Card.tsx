import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";

import Button from "../Button/Button";
import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

interface CardProps {
     item: {
          id: string
          title: string
          description: string
          imagePoster: string
          imageBackground: string
     }
}

const Card: React.FC<CardProps> = ({ item }) => {

     const link = '/detail/' + item.id;

     return (
          <div>
               <Link to={link}>
                    <div className={cx("card")} style={{ backgroundImage: `url(${item.imagePoster})` }}>
                         <Button disabled outline><i className={cx("bx bx-play")}></i></Button>
                    </div>
                    <h5 className={cx("title")}>{item.title}</h5>
               </Link>
          </div>
     )
}

export default Card