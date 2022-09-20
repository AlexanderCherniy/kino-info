import { ThunkAction } from "redux-thunk"
import { FilmsApi } from "../DAL/Films"
import { AllActionType, AppState, TypeFunction } from "./store-redux"
type premier = {
    kinopoiskId: number
    nameRu: string
}
const initialState = {
    premieres: [] as Array<premier>,
    premierFilmId: 300,
    showerFilm: {} as any,
    staff: {} as any
}
type initialStateType = typeof initialState
const premieresReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "premieres-reducer/ADD_PREMIERES": {
            return {
                ...state,
                premieres: action.premieres
            }
        }
        case "premieres-reducer/SET_PREMIER_FILM_ID": {
            return {
                ...state,
                premierFilmId: action.premierFilmId
            }
        }
        case "premieres-reducer/SET_SHOWER_FILM": {
            return {
                ...state,
                showerFilm: action.showerFilm
            }
        }
        case "premieres-reducer/SET_STAFF": {
            return {
                ...state,
                staff: action.staff
            }
        }
        default: {
            return state
        }
    }
}
type ActionType = ReturnType<AllActionType<typeof actions>>
type ThunkType = ThunkAction<Promise<void>, AppState, unknown, any>

export const actions = {
    addPremieres: (premieres: any) => ({ type: TypeFunction("premieres-reducer/ADD_PREMIERES"), premieres }),
    setPremierFilmId: (premierFilmId: any) => ({ type: TypeFunction("premieres-reducer/SET_PREMIER_FILM_ID"), premierFilmId }),
    setShowerFilm: (showerFilm: any) => ({ type: TypeFunction("premieres-reducer/SET_SHOWER_FILM"), showerFilm }),
    setStaff: (staff: any) => ({ type: TypeFunction("premieres-reducer/SET_STAFF"), staff }),
}

const randomPremier = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let ConcretePremiere = randomPremier(0, 40)

export const addPremieres = ():ThunkType => async (dispatch) => {
    const response = await FilmsApi.getFilmPremieres()
    dispatch(actions.addPremieres(response))
    dispatch(actions.setPremierFilmId(response[ConcretePremiere].kinopoiskId))
    dispatch(getFilmInfo(response[ConcretePremiere].kinopoiskId))
    dispatch(getFilmStaff(response[ConcretePremiere].kinopoiskId))
    return response
}
export const getFilmInfo = (id: number):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getFilmInfo(id)
    dispatch(actions.setShowerFilm(response))
    return response
}
export const getFilmStaff = (id: number):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getStaff(id)
    dispatch(actions.setStaff(response))
    return response
}
export default premieresReducer