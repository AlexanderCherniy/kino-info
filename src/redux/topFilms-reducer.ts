import { ThunkAction } from "redux-thunk"
import { FilmsApi } from "../DAL/Films"
import { AllActionType, AppState, TypeFunction } from "./store-redux"
const initialState = {
    topFilms: [],
    popularFilms: [],
    expectedFilms: []
}
type initialStateType = typeof initialState
const topFilmsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "topFilms-reducer/ADD_FILMS": {
            return {
                ...state,
                [action.wantChange]: [...state.topFilms, ...action.topFilms]
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
    addTopFilms: (topFilms: any, wantChange: string) => ({ type: TypeFunction("topFilms-reducer/ADD_FILMS"), topFilms, wantChange }),
}
export const addTopFilms = (page: number, category: string, wantChange: string):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getFilms(page, category)
    dispatch(actions.addTopFilms(response, wantChange))
    return response
}

export default topFilmsReducer