import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';

import styles from "./HeroSlide.module.scss";
import Button from "../../../components/Button/Button";

const cx = classNames.bind(styles);

SwiperCore.use([Autoplay, Keyboard])

const HeroSlide = () => {

     const [movieItems, setMovieItems] = useState([]);

     useEffect(() => {
          const getMovies = async () => {
               try {
                    const response: any = await fetch(`http://192.168.1.4:3000/anime/getall?page=1&limit=10`)
                    const data = await response.json();
                    console.log(data)
                    setMovieItems(data.data.items)
               } catch (error) {
                    console.log(error)
               }
          }
          getMovies();
     }, [])


     return (
          <div className={cx("hero-slide")}>
               <Swiper
                    // autoplay={{ delay: 5000 }}
                    slidesPerView={1}
                    keyboard={{ enabled: true }}
               >
                    {
                         movieItems.map((item, index) => (
                              <SwiperSlide key={index}>
                                   {({ isActive }) => (
                                        <HeroSlideItem item={item} active={isActive} />
                                   )}
                              </SwiperSlide>
                         ))
                    }
               </Swiper>
          </div>
     )
}

interface HeroSlideItemProps {
     item: any,
     active: boolean,
}
const HeroSlideItem: React.FC<HeroSlideItemProps> = ({ item, active }) => {

     return (
          <div
               className={cx("item", { active })}
               style={{ backgroundImage: `url(${item.imageBackground})` }}
          >
               <div className={cx("content")}>
                    <div className={cx("poster")}>
                         <img src={item.imagePoster} alt="" />
                    </div>
                    <div className={cx("info")}>
                         <h2 className={cx("title")}>
                              {item.title}
                         </h2>
                         <div className={cx("overview")}>{item.description}</div>
                         <div className={cx("btns")}>
                              <Button to={`/detail/${item.id}`} large outline primary>
                                   Watch now
                              </Button>
                              <Button className={cx("addfavourite")} onClick={() => alert("hello")} outline>
                                   <i className='bx bx-bookmark'></i>
                              </Button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default HeroSlide