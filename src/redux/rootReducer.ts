import {combineReducers} from "redux";
import {reducer as generator} from "./Generator"

const rootReducer = combineReducers({ generator });
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
