import { FETCH_SURVEY } from "../actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = [], action){
    switch (action.type) {
        case FETCH_SURVEY:
            return action.payload
        default:
            return state;
    }
}