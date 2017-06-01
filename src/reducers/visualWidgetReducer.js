/**
 * Created by Андрей on 23.05.2017.
 */

import {VisualState} from '../state/'
import {VISUAL_LOAD_DATA, IS_ERRORS} from '../actions/visualizationAction';

export default (state = VisualState, action) => {

    switch(action.type) {

        case VISUAL_LOAD_DATA: {
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