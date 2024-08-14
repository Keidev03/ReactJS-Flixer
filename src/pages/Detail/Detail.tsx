import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classNames from "classnames/bind";
import axios from "axios";


import DateDisplay from "../../components/DateDisplay/DateDisplay";
import Player from "../../components/Player/Player";
import Button from "../../components/Button/Button";
import Comment from "../../layouts/components/Comment/Comment";

import styles from "./Detail.module.scss";

const cx = classNames.bind(styles)

const Detail: React.FC = () => {

     const params = useParams();

     const navigate = useNavigate();

     const [anime, setAnime] = useState<any>({});
     const [episode, setEpisode] = useState<any>([]);
     const [item, setItem] = useState<any>({});

     useEffect(() => {

          const getDetail = async () => {
               try {
                    const resAnime = await axios.get("http://192.168.1.4:3000/anime/getone/" + params.id);
                    setAnime(resAnime.data.data);
                    const resEpisode = await axios.get("http://192.168.1.4:3000/episode/getall/" + resAnime.data.data.id);
                    setEpisode(resEpisode.data.data.items);
                    setItem(resEpisode.data.data.items[0])
               } catch (error) {
                    console.error('Error fetching anime details:', error);
               }
          }

          window.scrollTo({
               top: 0,
               behavior: 'smooth'
          });

          getDetail();
     }, [params]);

     const handleClick = () => {
          navigate('/detail/' + anime.id);
     };


     const server = item && item.server && item.server.length > 0 ? item.server[0] : 'No server data available';

     return (
          <div className={cx("wrapper")}>
               {
                    anime && anime.imagePoster && anime.imageBackground && (
                         <>
                              <div className={cx("banner")} style={{ backgroundImage: `url(${anime.imageBackground})` }}></div>
                              <div className={cx("movie-content")}>
                                   <div className={cx("info")}>
                                        <div className={cx("title")}><h3>{anime.title}</h3></div>
                                        <div className={cx("genres")}>
                                             {
                                                  anime.genres && anime.genres.map((genre: string, index: number) => (
                                                       <span className={cx("item")} key={index}>{genre}</span>
                                                  ))
                                             }
                                        </div>
                                        <p className={cx("description")}>{anime.description}</p>
                                        <div className={cx("items")}>
                                             <div className={cx("namepart")}>
                                                  <strong>Type: </strong>
                                                  <span>{anime.type}</span>
                                             </div>
                                             <div className={cx("rating")}>
                                                  <strong>Rating: </strong>
                                                  <span>98%</span>
                                             </div>
                                             <div className={cx("episode")}>
                                                  <strong>Episode: </strong>
                                                  <span>{episode && episode.length}</span>
                                                  <span>/</span>
                                                  <span>{anime.totalEpisode}</span>
                                             </div>
                                             <div className={cx("duration")}>
                                                  <strong>Duration: </strong>
                                                  <span>{item.duration}m</span>
                                             </div>
                                             <DateDisplay text={"Episode Date"} date={item.releaseDate} />
                                             <DateDisplay text={"Release Date"} date={anime.releaseDate} />
                                             <div className={cx("anothername")}>
                                                  <strong className={cx("label")}>Another name: </strong>
                                                  {anime.anotherName && anime.anotherName.length > 0 ? (
                                                       <>
                                                            {anime.anotherName.map((name: string, index: number) => (
                                                                 <React.Fragment key={index}>
                                                                      <span>{name}</span>
                                                                      {index < anime.anotherName.length - 1 && <span>, </span>}
                                                                 </React.Fragment>
                                                            ))}
                                                       </>
                                                  ) : (
                                                       <span>No names available</span>
                                                  )}
                                             </div>
                                        </div>
                                        <Button onClick={handleClick} outline>
                                             <i className="bx bx-bookmark"></i>
                                        </Button>
                                   </div>
                                   <div className={cx("poster")}>
                                        <img src={anime.imagePoster} alt="" />
                                   </div>
                              </div>
                         </>
                    )
               }
               <div className={cx("player")}>
                    <Player src={server} />
               </div>
               <div className={cx("auxiliary")}>
                    <div className={cx("episode")}>
                         {
                              episode && episode.map((ep: any, index: number) => (
                                   <button
                                        className={cx("item", { "active": item.episode === index + 1 })}
                                        onClick={() => setItem(ep)}
                                        key={index}
                                   >
                                        {ep.episode}
                                   </button>
                              ))
                         }
                    </div>
               </div>
               <div className="comment">
                    <Comment />
               </div>
          </div>
     )
}

export default Detail