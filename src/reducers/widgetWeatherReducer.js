/**
 * Created by Андрей on 19.05.2017.
 */

import {WidgetWeatherState} from '../state/'
import {LOAD_DATA} from '../actions/widgetWeatherAction';

export default (state = WidgetWeatherState, action) => {

    switch(action.type) {

        case LOAD_DATA: {
            return Object.assign({}, state, {
                data: action.data,
                forecats: action.forecats
            })
        }

        default: return state;
    }
};