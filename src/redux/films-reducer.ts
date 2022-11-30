import { ThunkAction } from "redux-thunk"
import { FilmsApi } from "../DAL/Films"
import { AllActionType, AppState, TypeFunction } from "./store-redux"

type FilmsType = {

}
const initialState = {
    Films: {} as any
}
type initialStateType = typeof initialState
const FilmsReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "films-reducer/ADD_FILMS": {
            return {
                ...state,
                Films: action.films
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
    addFilms: (films: any) => ({ type: TypeFunction("films-reducer/ADD_FILMS"), films })
}
export const addFilms = (page: number, category: string):ThunkType => async (dispatch) => {
    const response = await FilmsApi.getFilms(page, category)
    console.log(response);
    dispatch(actions.addFilms(response))
    return response
}

export default FilmsReducer