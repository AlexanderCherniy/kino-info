import { ThunkAction } from "redux-thunk"
import { FilmsApi } from "../DAL/Films"
import { AllActionType, AppState, TypeFunction } from "./store-redux"
type premier = {
    kinopoiskId: number
    nameRu: string
}
type ConcreteInfoPartipicant = {
    age: number
    death: number
    growth: number
    personId: number
    deathplace: string
    nameRu: string
    birthday: string
    nameEn: string
    birthplace: string
    posterUrl: string
    profession: string
    spouses: any
    facts: any
    films: any
}
type FilmByPersonType = {
    kinopoiskId: number
    nameRu: string
    nameOriginal: string
    posterUrlPreview: string
}
type ImagesByRandomFilmType = {
    items: any
}
const initialState = {
    Participants: [],
    ConcreteInfoPartipicants: [] as Array<ConcreteInfoPartipicant>,
    RandomNumberFilmByPerson: null as number | null,
    FilmByPerson: {} as FilmByPersonType,
    ImagesByRandomFilm: {} as ImagesByRandomFilmType,
    SimilarsByRandomFilm: [] as any
}
type initialStateType = typeof initialState
const participantsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "premieres-reducer/ADD_PREMIERES": {
            return {
                ...state,
                Participants: action.Participants
            }
        }
        case "premieres-reducer/ADD_CONCRETE_INFO_PARTIPICANT": {
            return {
                ...state,
                ConcreteInfoPartipicants: [action.newInfo]
            }
        }
        case "premieres-reducer/ADD_RANDOM_NUMBER_FILM_BY_PERSON": {
            return {
                ...state,
                RandomNumberFilmByPerson: action.number
            }
        }
        case "premieres-reducer/ADD_FILM_BY_PERSON": {
            return {
                ...state,
                FilmByPerson: action.film
            }
        }
        case "premieres-reducer/ADD_IMAGES_BY_RANDOM_FILM": {
            return {
                ...state,
                ImagesByRandomFilm: action.images
            }
        }
        case "premieres-reducer/ADD_SIMILARS_BY_RANDOM_FILM": {
            return {
                ...state,
                SimilarsByRandomFilm: action.SimilarsByRandomFilm
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
    addFilmByPerson: (film: any) => ({ type: TypeFunction("premieres-reducer/ADD_FILM_BY_PERSON"), film }),
    addParticipants: (Participants: any) => ({ type: TypeFunction("premieres-reducer/ADD_PREMIERES"), Participants }),
    addConcreteInfoPartipicant: (newInfo: any) => ({ type: TypeFunction("premieres-reducer/ADD_CONCRETE_INFO_PARTIPICANT"), newInfo }),
    addRandomNumberFilmByPerson: (number: number) => ({ type: TypeFunction("premieres-reducer/ADD_RANDOM_NUMBER_FILM_BY_PERSON"), number }),
    addImages: (images: any) => ({ type: TypeFunction("premieres-reducer/ADD_IMAGES_BY_RANDOM_FILM"), images }),
    addSimilarsByRandomFilm: (SimilarsByRandomFilm: any) => ({ type: TypeFunction("premieres-reducer/ADD_SIMILARS_BY_RANDOM_FILM"), SimilarsByRandomFilm }),
}
export const addParticipants = (name: string, page: number):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getParticipants(name, page)
    dispatch(actions.addParticipants(response))
    return response
}
const randomNumberFunc = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const addConcreteInfoPartipicant = (id: string):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getInfomationAboutPartipicant(id)
    dispatch(actions.addConcreteInfoPartipicant(response))
    dispatch(actions.addRandomNumberFilmByPerson(randomNumberFunc(0, response.films.length - 1)));
    
    return response
}
const getImages = (id: string):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getImages(id)
    dispatch(actions.addImages(response))
    return response
}
const getSimilars = (id: number):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getSimilars(id)
    console.log(response);
    
    dispatch(actions.addSimilarsByRandomFilm(response))
    return response
}
export const FilmByPerson = (id: number):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getFilmInfo(id)
    
    dispatch(actions.addFilmByPerson(response))
    dispatch(getImages(response.kinopoiskId))
    dispatch(getSimilars(response.kinopoiskId))
    
    return response
}
export default participantsReducer