import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilmsApi } from "../../../DAL/Films";
import { addPremieres, getFilmInfo } from "../../../redux/premieres-reducer";
import { AppState } from "../../../redux/store-redux";
import { addTopFilms } from "../../../redux/topFilms-reducer";
import TopFilm from "./Film/Film";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import cn from "./TopFilms.module.css"
const TopFilms: React.FC = () => {
    const [topFilmsPage, setTopFilmsPage] = useState<number>(1)
    const [popularFilmsPage, setPopularFilmsPage] = useState<number>(1)
    const [counterRandom, setCounterRandom] = useState<number>(555)
    const [expectedFilmsPage, setExpectedFilmsFilmsPage] = useState<number>(1)
    const [selectedCategory, setSelectedCategory] = useState<string>('TOP_250_BEST_FILMS')
    const topFilms = useSelector((state: AppState) => state.topFilms.topFilms)
    const popularFilms = useSelector((state: AppState) => state.topFilms.popularFilms)
    const expectedFilms = useSelector((state: AppState) => state.topFilms.expectedFilms)
    const showerFilm = useSelector((state: AppState) => state.premieres.showerFilm)
    const staff = useSelector((state: AppState) => state.premieres.staff)
    const dispatch = useDispatch()
    const [linePosition, setLinePosition] = useState(0)
    const [counter, setCounter] = useState(0)
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
    useEffect(() => {
        //@ts-ignore
        dispatch(addTopFilms(topFilmsPage, 'TOP_250_BEST_FILMS', 'topFilms'))
    }, [selectedCategory, topFilmsPage])
    useEffect(()=>{
        if(counter % 15 === 0 && counter !== 0){
            setTopFilmsPage(topFilmsPage + 1)    
        }
    }, [counter])
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
            <div className={window.innerWidth <= 970 ? cn.PremierContainerLowWidth : cn.PremierContainer}>
                <div className={window.innerWidth <= 970 ? cn.TopFilmsLowWidth : cn.TopFilms}>
                    <div >
                        {showerFilm.logoUrl === null ? <h2>{showerFilm.nameRu}</h2> : <img className={cn.PremierTitle} src={showerFilm.logoUrl}/>}
                    </div>
                    <div style={{overflow: 'hidden', WebkitLineClamp: 2,
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical'}}>
                        {showerFilm.shortDescription === null ? showerFilm.description : showerFilm.shortDescription}
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', columnGap: 7}}>
                        <div style={{ opacity: .6}}>Актер:</div>
                        <div>
                            {staff.length !== undefined ? staff.filter((obj: any) => obj.professionText === 'Актеры').map((obj: any, index: number)=> index < 3 ? index === 2 ? obj.nameRu : obj.nameRu + ", " : "") : ""}
                        </div>
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', columnGap: 7}}>
                        <div style={{ opacity: .6}}>Режиссер:</div>
                        <div>
                            {staff.length !== undefined ? staff.filter((obj: any) => obj.professionText === 'Режиссеры').map((obj: any, index: number)=> index < 2 ? index === 1 ? obj.nameRu : obj.nameRu + ", " : "") : ""}
                        </div>
                    </div>
                </div>
                <div className={cn.PremierImgContainer}>
                    <img className={cn.PremierImg} src={showerFilm.coverUrl === null ? showerFilm.posterUrl : showerFilm.coverUrl}/>
                    <div className={window.innerWidth > 970 ? cn.PremierImgBackground : ""}></div>
                </div>
            </div>
            <div>
                <h2>😎Лучшие Фильмы😎</h2>
                <div style={{display: 'grid', gridTemplateColumns: ' 10fr', alignItems: 'center', position: 'relative'}}>
                    {linePosition !== 0 ? <div className={cn.ScrollMinus} onClick={()=>setLinePosition(linePosition + 190)}>
                        <LeftOutlined style={{fontSize: 35}}/>
                    </div> : <></>}
                    <div style={{ height: 390, overflow: 'hidden'}} className={cn.TopFilms}>
                        <div style={{left: linePosition}} className={cn.TopFilmsLine}>
                            {topFilms?.map((film: any) => <TopFilm countries={film.countries} year={film.year} genres={film.genres} nameEn={film.nameEn} nameRu={film.nameRu} posterUrl={film.posterUrl} key={film.filmId} filmId={film.filmId} />)}
                        </div>
                    </div>
                        <div className={cn.ScrollPlus} onClick={()=> {
                                    setCounter(counter + 1)
                                    setLinePosition(linePosition - 190)
                            }}><RightOutlined style={{fontSize: 35}}/></div>
                    </div>
                </div>
            {/* каждую категорию вынеси в компоненту, пока я не вынес тебя */}
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