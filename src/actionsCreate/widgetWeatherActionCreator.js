/**
 * Created by Андрей on 24.05.2017.
 */
import WidgetWeather from '../actions/widgetWeatherAction';

export function loadData() {
    return (dispatch) => {
        dispatch({
            type: 'LOAD_DATA',
            payload: 'VRN'
        })
    }
}