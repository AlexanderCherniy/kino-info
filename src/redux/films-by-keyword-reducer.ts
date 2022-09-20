import { ThunkAction } from "redux-thunk"
import { FilmsApi } from "../DAL/Films"
import { AllActionType, AppState, TypeFunction } from "./store-redux"
const initialState = {
    filmsByKeyword: []
}
type initialStateType = typeof initialState
const filmsByKeywordReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "topFilms-reducer/ADD_FILMS_BY_KEYWORD": {
            return {
                ...state,
                filmsByKeyword: action.filmsByKeyword
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
    addFilmsByKeyword: (filmsByKeyword: any) => ({ type: TypeFunction("topFilms-reducer/ADD_FILMS_BY_KEYWORD"), filmsByKeyword }),
}
export const addFilmsByKeyword = (page: number, keyword: string):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getFilmByKeyword(page, keyword)
    console.log(response);
    dispatch(actions.addFilmsByKeyword(response))
    return response
}

export default filmsByKeywordReducer