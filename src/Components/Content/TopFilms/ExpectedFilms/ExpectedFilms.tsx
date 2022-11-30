import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState } from '../../../../redux/store-redux';
import { addTopFilms } from '../../../../redux/topFilms-reducer';
import TopFilm from '../Film/Film';
import SliderCn from '../../../Slider/Slider.module.css'
import cn from './Top250Films.module.css'


const ExpectedFilms: React.FC = () => {
    const dispatch = useDispatch()
    const ExpectedFilms = useSelector((state: AppState) => state.topFilms.expectedFilms)
    console.log(ExpectedFilms);
    
    const [counter, setCounter] = useState(0)
    const [linePosition, setLinePosition] = useState(0)
    const [ExpectedPage, setExpectedPage] = useState<number>(1)
    const [selectedCategory, setSelectedCategory] = useState<string>('TOP_AWAIT_FILMS')
    useEffect(() => {
        //@ts-ignore
        dispatch(addTopFilms(ExpectedPage, 'TOP_AWAIT_FILMS', 'expectedFilms'))
    }, [selectedCategory, ExpectedPage])
    useEffect(() => {
        if (counter % 15 === 0 && counter !== 0) {
            setExpectedPage(ExpectedPage + 1)
        }
    }, [counter])
    return (
        <div>
            <h2>😎Ожидаемые Фильмы😎</h2>
            <div className={SliderCn.SliderContainer}>
                {linePosition !== 0 ? <div className={SliderCn.ScrollMinus} onClick={() => setLinePosition(linePosition + 190)}>
                    <LeftOutlined style={{ fontSize: 35, color: '#141414' }} />
                </div> : <></>}
                <div className={SliderCn.Slider}>
                    <div style={{ left: linePosition }} className={SliderCn.SliderLine}>
                        {ExpectedFilms?.map((film: any) => <TopFilm countries={film.countries} year={film.year} genres={film.genres} nameEn={film.nameEn} nameRu={film.nameRu} posterUrl={film.posterUrl} key={film.filmId} filmId={film.filmId} />)}
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


export default ExpectedFilms