import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPremieres } from "../../../redux/premieres-reducer";
import { AppState } from "../../../redux/store-redux";
import cn from "./TopFilms.module.css"
import Top250Films from "./Top250Films/Top250Films";
import Premier from "./Premier/Premier";
const TopFilms: React.FC = () => {
    const [popularFilmsPage, setPopularFilmsPage] = useState<number>(1)
    const [counterRandom, setCounterRandom] = useState<number>(555)
    const [expectedFilmsPage, setExpectedFilmsFilmsPage] = useState<number>(1)
    const popularFilms = useSelector((state: AppState) => state.topFilms.popularFilms)
    const expectedFilms = useSelector((state: AppState) => state.topFilms.expectedFilms)
    const dispatch = useDispatch()
    // let randomPremierNumber = 0
    // const randomPremier = (min: number, max: number) => {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     setCounterRandom(counterRandom + 1)
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }
    // if(premieres.length !== 0 && counterRandom === 555){
    //     randomPremierNumber = randomPremier(0, premieres.length - 1)
    // }
    useEffect(() => {
        //@ts-ignore
        // dispatch(addTopFilms(topFilmsPage, 'TOP_250_BEST_FILMS', 'topFilms'))
        // //@ts-ignore
        // dispatch(addTopFilms(popularFilmsPage, 'TOP_100_POPULAR_FILMS', 'popularFilms'))
        // //@ts-ignore
        // dispatch(addTopFilms(expectedFilmsPage, 'TOP_AWAIT_FILMS', 'expectedFilms'))
        //@ts-ignore
        dispatch(addPremieres())
        // // @ts-ignore
        // dispatch(getFilmInfo())
    }, [])
    // useEffect(() => {
    //     //@ts-ignore
    //     dispatch(addTopFilms(popularFilmsPage, 'TOP_100_POPULAR_FILMS', 'popularFilms'))
    // }, [selectedCategory, popularFilmsPage])
    // useEffect(() => {
    //     //@ts-ignore
    //     dispatch(addTopFilms(expectedFilmsPage, 'TOP_AWAIT_FILMS', 'expectedFilms'))
    // }, [selectedCategory, expectedFilmsPage])
    return (
        <div className={cn.TopFilmsContainer}>
            <Premier />
           <Top250Films />
            {/* 
            <div>
                <h2>😎Популярные Фильмы😎</h2>
                <div style={{ height: 380, overflowY: 'auto' }} className={cn.TopFilms}>
                    {popularFilms.map((film: any) => <TopFilm countries={film.countries} year={film.year} genres={film.genres} nameEn={film.nameEn} nameRu={film.nameRu} posterUrl={film.posterUrl} key={film.filmId} filmId={film.filmId} />)}
                </div>
                <div>
                    {popularFilmsPage !== 1 ? <button onClick={ () => setPopularFilmsPage(popularFilmsPage - 1) }>-</button> : <></>}
                    <button onClick={() => setPopularFilmsPage(popularFilmsPage + 1) }>+</button>
                </div>
            </div>
            <div>
                <h2>😎Ожидаемые Фильмы😎</h2>
                <div style={{ height: 380, overflowY: 'auto' }} className={cn.TopFilms}>
                    {expectedFilms.map((film: any) => <TopFilm countries={film.countries} year={film.year} genres={film.genres} nameEn={film.nameEn} nameRu={film.nameRu} posterUrl={film.posterUrl} key={film.filmId} filmId={film.filmId} />)}
                </div>
                <div>
                    {expectedFilmsPage !== 1 ? <button onClick={ () => setExpectedFilmsFilmsPage(expectedFilmsPage - 1) }>-</button> : <></>}
                    <button onClick={() => setExpectedFilmsFilmsPage(expectedFilmsPage + 1) }>+</button>
                </div> */}
        </div>
    )
}
export default TopFilms


{/* <div>
<div onClick={() => setSelectedCategory('TOP_250_BEST_FILMS')} style={selectedCategory === 'TOP_250_BEST_FILMS' ? { background: 'green' } : {}}>
    ТОП 250 ЛУЧШИХ ФИЛЬМОВ
</div>
<div onClick={() => setSelectedCategory('TOP_100_POPULAR_FILMS')} style={selectedCategory === 'TOP_100_POPULAR_FILMS' ? { background: 'green' } : {}}>
    ТОП 100 ПОПУЛЯРНЫХ ФИЛЬМОВ
</div>
<div onClick={() => setSelectedCategory('TOP_AWAIT_FILMS')} style={selectedCategory === 'TOP_AWAIT_FILMS' ? { background: 'green' } : {}}>
    ТОП ОЖИДАЕМЫХ ФИЛЬМОВ
</div>
</div> */}