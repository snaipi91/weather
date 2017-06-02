/**
 * Created by Андрей on 24.05.2017.
 */
import {LOAD_DATA_WIDGET, IS_ERRORS} from '../const/actionsType';

export function loadData(value) {
    return (dispatch) => {

        loadWeatherWidgetData(value);

        function loadWeatherWidgetData(value = 'voronezh') {
            promises(value)
                .then(
                    resolve => {
                        dispatch({
                            type: LOAD_DATA_WIDGET,
                            data: resolve.list,
                            forecats: resolve.cnt,
                            city: value
                        });
                    },
                    reject => {
                        dispatch({
                            type: IS_ERRORS,
                            errors: reject.errors
                        })
                    }
                );
        }

        function promises(city) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest(),
                    response = null;

                xhr.open("GET", `http://localhost:3000/api/${city}?ctn=1`, true);
                xhr.send();

                xhr.onreadystatechange = () => {
                    if (xhr.readyState != 4) return;

                    if (xhr.status != 200) {
                        reject(
                            {
                                errors: `Error${xhr.statusText}`
                            }
                        )
                    } else {
                        response = JSON.parse(xhr.responseText);
                        resolve(response);
                    }
                }
            })
        }
    }
}