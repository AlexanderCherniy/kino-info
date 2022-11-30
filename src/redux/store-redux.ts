import {applyMiddleware, combineReducers, createStore, compose } from "redux";
import middleWare from 'redux-thunk'
import filmReducer from "./film-reducer";
import filmSearch from "./film-search-reducer";
import filmsByKeywordReducer from "./films-by-keyword-reducer";
import FilmsReducer from "./films-reducer";
import headerReducer from "./header-reducer";
import participantsReducer from "./participants-reducer";
import premieresReducer from "./premieres-reducer";
import topFilmsReducer from "./topFilms-reducer";
const reducers = combineReducers({
    topFilms: topFilmsReducer,
    filmsByKeyword: filmsByKeywordReducer,
    header: headerReducer,
    premieres: premieresReducer,
    participants: participantsReducer,
    film: filmReducer,
    filmSearch: filmSearch,
    films: FilmsReducer,
})
type reducersType = typeof reducers
export type AppState = ReturnType<reducersType>
export type AllActionType<T> = T extends {[key: string]:infer U} ? U : never
export function TypeFunction<T extends string>(arg: T):T{
    return arg
}


//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(middleWare)));
//@ts-ignore
window.store = store
export default store