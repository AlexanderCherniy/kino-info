import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addFilm, getFilmImages, getSimilars } from "../../../../redux/film-reducer";
import { AppState } from "../../../../redux/store-redux";
import cn from './Film.module.css'
import FilmItem from "./FilmItem/FilmItem";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import SliderCn from '../../../Slider/Slider.module.css'

const Film: React.FC = () => {
    const FilmInfo = useSelector((state: AppState) => state.film.FilmInfo)
    const Similars = useSelector((state: AppState) => state.film.Similars)
    const Images = useSelector((state: AppState) => state.film.Images)
    const [counter, setCounter] = useState<number>(0)
    const [SimilarsCounter, setSimilarsCounter] = useState<number>(0)
    const filmId = window.location.href.split('/').slice(-1)[0]
    const [linePosition, setLinePosition] = useState(0)
    const dispatch = useDispatch()
    if (counter === 0) {
        setCounter(1)
        //@ts-ignore
        dispatch(addFilm(filmId))
        //@ts-ignore
        dispatch(getSimilars(filmId))
        //@ts-ignore
        dispatch(getFilmImages(filmId))
    }
    useEffect(() => {
        //@ts-ignore
        dispatch(addFilm(filmId))
        //@ts-ignore
        dispatch(getSimilars(filmId))
        //@ts-ignore
        dispatch(getFilmImages(filmId))
    }, [SimilarsCounter])
    const getAgeLimit = FilmInfo?.ratingAgeLimits?.split('')[3]; 
    
    return (
        <>
            <div className={cn.Film}>
                <div className={cn.PosterContainer}>
                    <img className={cn.Poster} src={FilmInfo.posterUrl} />
                    <div className={cn.Description}>
                        {FilmInfo?.shortDescription}
                    </div>
                </div>
                <div>
                    <div><b className={cn.name}>{FilmInfo?.nameOriginal}</b></div>
                    {FilmInfo?.logoUrl === null ? <div><b className={cn.name}> FilmInfo.nameRu </b></div> : <img className={cn.ImgLogo} src={FilmInfo.logoUrl} />}
                    <div>
                        <h2>О Фильме:</h2>
                        <div>Год Выпуска: <span>{FilmInfo?.year}</span></div>
                        <div>Длительность: <span>{FilmInfo?.filmLength}m</span></div>
                        {FilmInfo?.slogan !== null ? <div>Слоган: <span>"{FilmInfo?.slogan}"</span></div> : <></>}
                        <div>Жанры: <span>{FilmInfo?.genres?.map((genre: any, index: number) => <span key={index}>{index + 1 !== FilmInfo?.genres?.length ? genre.genre + ", " : genre.genre}</span>)} </span></div>
                        <div>Страны в фильме: <span>{FilmInfo?.countries?.map((country: any, index: number) => <span key={index}>{index + 1 !== FilmInfo?.countries?.length ? country.country + ', ' : country.country}</span>)} </span></div>
                        <div>Можно смотреть с: <span>{getAgeLimit} лет</span></div>
                        <div>В 3D: <span>{FilmInfo?.has3D === true ? 'Да' : 'Нет'}</span></div>
                        <div className={cn.Images}>
                            <div>
                                {Images.length !== 0 ? <img style={{ height: 260 }} src={Images?.items[0]?.previewUrl} /> : <></>}
                            </div>
                            <div>
                                {Images.length !== 0 ? <img style={{ height: 130, display: 'block', marginBottom: 5 }} src={Images?.items[1]?.previewUrl} /> : <></>}
                                {Images.length !== 0 ? <img style={{ height: 125 }} src={Images?.items[2]?.previewUrl} /> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {Similars?.total !== 0
                ?
                <div>
                    <h2>Найдено похожих фильмов: {Similars.total}</h2>
                    <div className={SliderCn.SliderContainer}>
                        {linePosition !== 0 ? <div className={SliderCn.ScrollMinus} onClick={() => setLinePosition(linePosition + 190)}>
                            <LeftOutlined style={{ fontSize: 35 }} />
                        </div> : <></>}
                        <div className={SliderCn.Slider}>
                            <div style={{ left: linePosition }} className={SliderCn.SliderLine}>
                                {Similars?.items?.map((film: any) => <FilmItem key={film.filmId} setLinePosition={setLinePosition} setSimilarsCounter={setSimilarsCounter} SimilarsCounter={SimilarsCounter} film={film} />)}
                            </div>
                        </div>
                        {linePosition > -160 * Similars?.total
                            ? <div className={SliderCn.ScrollPlus} onClick={() => {
                                setCounter(counter + 1)
                                setLinePosition(linePosition - 190)
                            }}><RightOutlined style={{ fontSize: 35 }} /></div> : <></>}
                    </div>
                </div>
                :
                <></>
            }

        </>
    )
}

export default Film