import { ThunkAction } from "redux-thunk"
import { AllActionType, AppState, TypeFunction } from "./store-redux"
const initialState = {
    SearchValue: ''
}
type initialStateType = typeof initialState
const headerReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case "header-reducer/SET_SEARCH_VALUE": {
            return {
                ...state,
                SearchValue: action.SearchValue
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
    setSearchValue: (SearchValue: string) => ({ type: TypeFunction("header-reducer/SET_SEARCH_VALUE"), SearchValue }),
}
export const setSearchValue = (SearchValue: string):ThunkType => async (dispatch) => {
    dispatch(actions.setSearchValue(SearchValue))
}
export default headerReducer