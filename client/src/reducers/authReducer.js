import {FETCH_USER} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}
