/**
 * Created by Андрей on 19.05.2017.
 */

import {WidgetWeatherState} from '../state/'
import {LOAD_DATA_WIDGET, IS_ERRORS} from '../const/actionsType';

export default (state = WidgetWeatherState, action) => {

    switch(action.type) {

        case LOAD_DATA_WIDGET: {
            return Object.assign({}, state, {
                data: action.data,
                forecats: action.forecats,
                city: action.city
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