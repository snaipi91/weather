import { combineReducers } from 'redux';

import widgetWeather from './widgetWeather';
import visualWidget from './visualWidget';

export default combineReducers({
    widgetWeather,
    visualWidget
})