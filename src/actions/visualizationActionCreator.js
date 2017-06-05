/**
 * Created by Андрей on 26.05.2017.
 */
import {LOAD_DATA_VISUAL, IS_ERRORS} from '../const/actionsType';

import * as D3 from 'd3';

export function loadData(days = 10, city) {

    return (dispatch) => {


        promises(days, city)
            .then(
                resolve => {
                    dispatch({
                        type: LOAD_DATA_VISUAL,
                        collection: resolve.collection
                    });
                    drawCharts(resolve.collection)
                }
            );

        function promises(days = 10, city = 'voronezh') {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest(),
                    response = null;

                xhr.open("GET", `http://localhost:3000/api/days/${days}?city=${city}`, true);
                xhr.send();

                xhr.onreadystatechange = () => { // (3)
                    if (xhr.readyState != 4) return;

                    if (xhr.status != 200) {
                        reject(
                            {
                                errors: `Error ${xhr.statusText}`
                            }
                        )
                    } else {
                        response = JSON.parse(xhr.responseText);

                        resolve(
                            {
                                collection: response
                            }
                        );
                    }
                }
            });
        }

        function drawCharts(response) {
            //clear canvas
            D3.select('#canvas svg').remove();

            const canvas = D3.select('#canvas').append('svg')
                .attr('width', '100%')
                .attr('height', 420);

            const xScale = D3.scaleLinear()
                .domain([50, '-50'])
                .range([0, 300]);

            const xAxis = D3.axisRight().scale(xScale);

            canvas.append('g')
                .call(xAxis);

            // days
            let _days = response.cnt,
                _city = response.city.name,
                _collection = response.list,
                _indicators = [_city, 'Влажность', 'Температура'];

            var arr = _collection.map(function (item, index) {
                return [(index+1) + ' день', item.humidity, item.temp.max-273]
            });

            arr.unshift(_indicators);
        }
    }

}