/**
 * Created by Андрей on 23.05.2017.
 */

import {VisualState} from '../state/'
import {LOAD_DATA_VISUAL, IS_ERRORS} from '../const/actionsType';

export default (state = VisualState, action) => {

    switch(action.type) {

        case LOAD_DATA_VISUAL: {
            return Object.assign({}, state, {
                collection: action.collection
            })
        }

        case IS_ERRORS: {
            return Object.assign({}, state, {
                errors: action.errors
            })
        }

        default: return state;
    }
};