import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import classNames from "classnames/bind";

import Card from "../../../components/Card/Card";
import styles from "./List.module.scss"

const cx = classNames.bind(styles);

const List: React.FC = () => {

     const [items, setItems] = useState([]);
     useEffect(() => {
          const getList = async () => {
               const response: any = await fetch(`http://192.168.1.4:3000/anime/getall?page=1&limit=20`)
               const data = await response.json();
               setItems(data.data.items);
          }
          getList();
     }, [])

     return (
          <div className={cx("list")}>
               <Swiper
                    spaceBetween={23}
                    slidesPerView={'auto'}
               >
                    {
                         items.map((item, index) => (
                              <SwiperSlide key={index}>
                                   <Card item={item} />
                              </SwiperSlide>
                         ))
                    }
               </Swiper>
          </div>
     )
}

export default List