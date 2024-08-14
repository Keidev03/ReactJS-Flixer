import React from "react";
import classNames from "classnames/bind";

import styles from "./Grid.module.scss"
import Card from "../Card/Card";

const cx = classNames.bind(styles);

interface Item {
     // Define the properties of the item based on your Card component's needs
     id: string
     title: string
     description: string
     imagePoster: string
     imageBackground: string
     // Add other properties as needed
}

// Define the props interface for the Grid component
interface GridProps {
     items: Item[]; // Array of items to be rendered
}

const Grid: React.FC<GridProps> = ({ items }) => {

     return (
          <div className={cx("grid")}>
               {items.map((item) => (
                    <Card item={item} key={item.id} />
               ))}
          </div>
     );
}

export default Grid;