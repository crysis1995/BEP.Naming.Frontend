import { combineReducers } from "redux";
import { reducer as layers } from "./Layers";
import { reducer as nodeSelects } from "./Node.Selects";

const rootReducer = combineReducers({
    layers,
    nodeSelects,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
