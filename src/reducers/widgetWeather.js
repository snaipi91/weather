/**
 * Created by Андрей on 19.05.2017.
 */

import {WidgetWeather} from '../state/'
import WidgetWeatherActions from '../actions/widgetWeather';

export default (state = WidgetWeather, action) => {
    console.log(WidgetWeatherActions);

    switch(action) {

        case WidgetWeatherActions.LOAD_DATA: {
            return Object.assign({}, state, {
                city: action.city
            })
        }

        default: return state;
    }
};