import React, { useEffect, useRef, useState } from "react"
import classNames from "classnames/bind"

import styles from "./Search.module.scss"
import Grid from "../../components/Grid/Grid"
import axios from "axios"
import useDebounce from "../../hooks/useDebounce"
import images from "../../assets/images"

const cx = classNames.bind(styles)

interface Item {
    id: string
    title: string
    description: string
    imagePoster: string
    imageBackground: string
}

const Search: React.FC = () => {

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [stateSearch, setStateSearch] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [search, setSearch] = useState<Item[]>([]);
    const [storage, setStorage] = useState<Item[]>([]);

    const debouncedKeyword: string = useDebounce(keyword, 500);

    useEffect(() => {

        const getall = async () => {
            try {
                const resAnime = await axios.get(`http://192.168.1.4:3000/anime/getall?page=1&query=20`);
                setStorage(resAnime.data.data.items);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } catch (error) {
                console.error('Error fetching anime details:', error);
            }
        }

        getall();
    }, []);

    useEffect(() => {

        const fetchSearchResults = async () => {
            try {
                const resAnime = await axios.get(`http://192.168.1.4:3000/anime/search?keyword=${debouncedKeyword}`)
                setSearch(resAnime.data.data.items)
                setStateSearch(false)
            } catch (error) {
                console.error('Error fetching anime details:', error);
            }
        }

        (keyword.length > 0) ? fetchSearchResults() : setSearch([])

    }, [debouncedKeyword]);

    const HandlerSetKeyword = async (keyword: string) => {
        setKeyword(keyword)
        setStateSearch(true)
    }

    const HandleClear = () => {
        setKeyword('')
        inputRef.current?.focus()
    }

    return (
        <div className={cx("wrapper")}>
            <div className={cx("search")}>
                <input
                    ref={inputRef}
                    value={keyword}
                    type="text"
                    placeholder="Search Anime"
                    onChange={(e) => HandlerSetKeyword(e.target.value)}
                />
                <div className={cx("button")}>
                    <button className={cx("left")}
                        onClick={HandleClear}
                    >
                        {keyword && (<i className={cx("bx bx-x-circle")}></i>)}
                    </button>
                    <button className={cx("right")}>
                        {keyword && stateSearch ? (<i className={cx("bx bx-loader bx-spin")}></i>) : (<i className={cx("bx bx-search")}></i>)}
                    </button>
                </div>
            </div>
            <div className={cx("list")}>
                <Grid items={(search.length === 0 && keyword.length <= 0) ? storage : search} />
            </div>
            {search.length === 0 && keyword.length > 0 && (
                <div className={cx("no-result")}>
                    <img src={images.noresult} alt="noresult" />
                </div>
            )}

        </div >
    )
}

export default Search