import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store-redux';
import { addTopFilms } from '../../../../redux/topFilms-reducer';
import TopFilm from '../Film/Film';
import SliderCn from '../../../Slider/Slider.module.css'
import cn from './Top250Films.module.css'


const Top250Films:React.FC = () => {
    const dispatch = useDispatch()
    const topFilms = useSelector((state: AppState) => state.topFilms.topFilms)
    const [counter, setCounter] = useState(0)
    const [linePosition, setLinePosition] = useState(0)
    const [topFilmsPage, setTopFilmsPage] = useState<number>(1)
    const [selectedCategory, setSelectedCategory] = useState<string>('TOP_250_BEST_FILMS')
    useEffect(() => {
        //@ts-ignore
        dispatch(addTopFilms(topFilmsPage, 'TOP_250_BEST_FILMS', 'topFilms'))
    }, [selectedCategory, topFilmsPage])
    useEffect(() => {
        if (counter % 15 === 0 && counter !== 0) {
            setTopFilmsPage(topFilmsPage + 1)
        }
    }, [counter])
    return(
        <div>
        <h2>😎Лучшие Фильмы😎</h2>
        <div className={SliderCn.SliderContainer}>
            {linePosition !== 0 ? <div className={SliderCn.ScrollMinus} onClick={() => setLinePosition(linePosition + 190)}>
                <LeftOutlined style={{ fontSize: 35, color: '#141414' }} />
            </div> : <></>}
            <div className={SliderCn.Slider}>
                <div style={{ left: linePosition }} className={SliderCn.SliderLine}>
                    {topFilms?.map((film: any) => <TopFilm countries={film.countries} year={film.year} genres={film.genres} nameEn={film.nameEn} nameRu={film.nameRu} posterUrl={film.posterUrl} key={film.filmId} filmId={film.filmId} />)}
                </div>
            </div>
            <div className={SliderCn.ScrollPlus} onClick={() => {
                setCounter(counter + 1)
                setLinePosition(linePosition - 190)
            }}><RightOutlined style={{ fontSize: 35, color: '#141414' }} /></div>
        </div>
    </div>
    )
}


export default Top250Films