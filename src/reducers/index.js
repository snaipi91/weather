import { combineReducers } from 'redux';

import widgetWeather from './widgetWeatherReducer';
import visualWidget from './visualWidgetReducer';

export default combineReducers({
    widgetWeather,
    visualWidget
})