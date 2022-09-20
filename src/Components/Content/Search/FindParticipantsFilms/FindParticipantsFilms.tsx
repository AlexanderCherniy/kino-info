import cn from './FindParticipantsFilms.module.css'
import { Form, Formik } from 'formik'
import { Input, SubmitButton } from 'formik-antd'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Participant from './Participant/Participant'
import { addParticipants } from '../../../../redux/participants-reducer'
import { AppState } from '../../../../redux/store-redux'
// import { createField, Input } from '../../../Forms/Forms'

const FindParticipantsFilm:React.FC = () =>{
    const [name, setName] = useState<string>("Уилл")
    const [page, setPage] = useState<number>(1)
    const participants = useSelector((state:AppState)=> state.participants.Participants)
    const dispatch = useDispatch()
    useEffect(()=>{
        //@ts-ignore
        dispatch(addParticipants(name, page))
    }, [name, page])
    return <Formik initialValues={{name: ""}}
    onSubmit={async values => {
        if (values.name !== '') {
            setName(values.name)
        }
    }}>
        <div className={cn.FindPartipicantsContainer}>
        <div>Актер <b>{name}:</b> </div> 
        <Form className={cn.SearchFilmFlexContainer}>
                {/* {createField(cn.SearchFilmInput, 'keyword', Input, "Введите Название Фильма")} */}
                <Input name='name' className={cn.SearchFilmInput} autoComplete='off' placeholder="Введите Имя"/>
                <SubmitButton type='default'>Find</SubmitButton>
        </Form>
        <div  className={cn.FilmsByKeyword}>
            {participants !== undefined ? participants.map((participant: any, index: number) => <Participant key={index} participant={participant}/>) : <></>}
            {/* <button onClick={()=> setPage(page - 1)}>-</button>
            <button onClick={()=> setPage(page + 1)}>+</button> */}
            <div>Больше ничего не удалось найти...</div>
        </div>
    </div>
    </Formik>
}



export default FindParticipantsFilm