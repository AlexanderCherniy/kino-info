import { Form, Formik } from 'formik'
import { Input, SubmitButton } from 'formik-antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addFilmsByKeyword } from '../../../redux/films-by-keyword-reducer'
import { AppState } from '../../../redux/store-redux'
import FilmByKeyword from './FilmByKeyword/FilmByKeyword'
import cn from './FilmsByKeyword.module.css'
// import { createField, Input } from '../../../Forms/Forms'

const FilmsByKeyword:React.FC = () =>{
    const [filmsByKeywordHeight, setFilmsByKeywordHeight] = useState<number>(850)
    const [page, setPage] = useState<number>(1)
    const filmsByKeyword = useSelector((state:AppState)=> state.filmsByKeyword.filmsByKeyword)
    const headerFormValue = useSelector((state:AppState)=> state.header.SearchValue)
    const [keyword, setKeyword] = useState<string>("Мстители")
    const dispatch = useDispatch()
    useEffect(()=>{
        //@ts-ignore
        dispatch(addFilmsByKeyword(page, headerFormValue === '' ? keyword : headerFormValue))
    }, [])
    return <Formik initialValues={{keyword: ""}}
    onSubmit={async values => {
        if (values.keyword !== '') {
            setKeyword(values.keyword)
            //@ts-ignore
            dispatch(addFilmsByKeyword(1,values.keyword))
        }
    }}>
        <div className={cn.FilmsByKeywordContainer}>
        <div>Фильм <b>{keyword}:</b> </div> 
        <Form className={cn.SearchFilmFlexContainer}>
                {/* {createField(cn.SearchFilmInput, 'keyword', Input, "Введите Название Фильма")} */}
                <Input autoComplete='off' name='keyword' className={cn.SearchFilmInput}  placeholder="Введите Название Фильма"/>
                <SubmitButton type='default'>Find</SubmitButton>
        </Form>
        <div style={{ height: filmsByKeywordHeight }} className={cn.FilmsByKeyword}>
            {filmsByKeyword.map((film: any, index: number, array: any) => <FilmByKeyword key={index} index={index} array={array} year={film.year} countries={film.countries} filmId={film.filmId} genres={film.genres} nameEn={film.nameEn} nameRu={film.nameRu} posterUrl={film.posterUrl}/>)}
        </div>
        <div>
            {page !== 1 ? <button onClick={ () => setPage(page - 1) }>-</button> : <></>}
            <button onClick={() => setPage(page + 1) }>+</button>
        </div>
        {filmsByKeywordHeight === 2000
            ? <button onClick={() => setFilmsByKeywordHeight(850)}>Close</button>
            : <button onClick={() => setFilmsByKeywordHeight(2000)}>Show All</button>
        }
    </div>
    </Formik>
}


export default FilmsByKeyword