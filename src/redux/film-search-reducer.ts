import { ThunkAction } from "redux-thunk"
import { FilmsApi } from "../DAL/Films"
import { AllActionType, AppState, TypeFunction } from "./store-redux"


const initialState = {
    Films: [] as any
}
type initialStateType = typeof initialState
const filmSearch = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "film-search-reducer/ADD_FILMS": {
            return {
                ...state,
                Films: action.Films
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
    addFilms: (Films: any) => ({ type: TypeFunction("film-search-reducer/ADD_FILMS"), Films }),
}
export const addFilm = (keyword: string):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getFilmByKeyword(1, keyword)
    console.log(response);
    dispatch(actions.addFilms(response))
    return response
}

export default filmSearch