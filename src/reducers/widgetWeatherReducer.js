/**
 * Created by Андрей on 19.05.2017.
 */

import {WidgetWeatherState} from '../state/'
import WidgetWeatherActions from '../actions/widgetWeatherAction';

export default (state = WidgetWeatherState, action) => {

    switch(action.type) {

        case WidgetWeatherActions.LOAD_DATA: {
            return Object.assign({}, state, {
                city: action.payload
            })
        }

        default: return state;
    }
};