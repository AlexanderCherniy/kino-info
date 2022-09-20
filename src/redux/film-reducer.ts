import { ThunkAction } from "redux-thunk"
import { FilmsApi } from "../DAL/Films"
import { AllActionType, AppState, TypeFunction } from "./store-redux"
type genre = {genre: string}
type country = {country: string}
type FilmInfoType = {
    has3D: boolean
    year: number
    filmLength: number
    slogan: string
    nameRu: string
    logoUrl: string
    posterUrl: string
    shortDescription: string
    nameOriginal: string
    ratingAgeLimits: string
    genres: Array<genre>
    countries: Array<country>
}
const initialState = {
    FilmInfo: {} as FilmInfoType,
    Similars: {} as any,
    Images: [] as any
}
type initialStateType = typeof initialState
const filmReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "films-reducer/ADD_FILM_INFO": {
            return {
                ...state,
                FilmInfo: action.FilmInfo
            }
        }
        case "films-reducer/ADD_SIMILARS": {
            return {
                ...state,
                Similars: action.Similars
            }
        }
        case "films-reducer/ADD_IMAGES": {
            return {
                ...state,
                Images: action.images
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
    addImages: (images: any) => ({ type: TypeFunction("films-reducer/ADD_IMAGES"), images }),
    addFilmInfo: (FilmInfo: any) => ({ type: TypeFunction("films-reducer/ADD_FILM_INFO"), FilmInfo }),
    addSimilars: (Similars: any) => ({ type: TypeFunction("films-reducer/ADD_SIMILARS"), Similars })
}
export const addFilm = (id: number):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getFilmInfo(id)
    console.log(response);
    dispatch(actions.addFilmInfo(response))
    return response
}
export const getFilmImages = (id: string):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getImages(id)
    dispatch(actions.addImages(response))
    return response
}
export const getSimilars = (id: number):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getSimilars(id)
    console.log(response);
    dispatch(actions.addSimilars(response))
    return response
}

export default filmReducer