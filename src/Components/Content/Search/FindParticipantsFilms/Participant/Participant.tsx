import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addConcreteInfoPartipicant } from '../../../../../redux/participants-reducer'
import { AppState } from '../../../../../redux/store-redux'
import cn from './Participant.module.css'


type Props = {
    participant: any
}
const Participant:React.FC<Props> = (props) =>{
    const conctereInfoPartipicant = useSelector((state:AppState)=> state.participants.ConcreteInfoPartipicants)
    const dispatch = useDispatch()
    console.log(conctereInfoPartipicant);
    
    return(
        <div className={cn.Partipicant}>
            <img className={cn.Photo} src={props.participant.posterUrl} />
            <div>
                <b style={{fontSize: 22}}>{props.participant.nameRu}</b>
                <div>{props.participant.nameEn}</div>
                {/* {conctereInfoPartipicant[0]?.personId === props.participant.kinopoiskId ? <div>Дата Рождения: {conctereInfoPartipicant[0]?.birthday} </div> : <></>} */}
                {/* {conctereInfoPartipicant[0]?.personId !== props.participant.kinopoiskId ? <div onClick={()=>dispatch(addConcreteInfoPartipicant(props.participant.kinopoiskId))}>Больше Информации +</div> : <></>} */}
                {/* @ts-ignore */}
                <NavLink onClick={()=>dispatch(addConcreteInfoPartipicant(props.participant.kinopoiskId))} to={`/name/${props.participant.kinopoiskId}`}>Больше Информации +</NavLink>
            </div>

        </div>
    )
}



export default Participant