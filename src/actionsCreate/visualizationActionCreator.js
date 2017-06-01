/**
 * Created by Андрей on 26.05.2017.
 */
import {VISUAL_LOAD_DATA, IS_ERRORS} from '../actions/visualizationAction';

export function loadData(days = 10, city) {

    return (dispatch) => {


        promises(days, city)
            .then(
                resolve => {
                    dispatch({
                        type: VISUAL_LOAD_DATA,
                        collection: resolve.collection
                    });
                    googleCharts(resolve.collection)
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

        function googleCharts(response) {
            google.charts.load('current', {'packages':['bar']});

            // days
            let _days = response.cnt,
                _city = response.city.name,
                _collection = response.list,
                _indicators = [_city, 'Влажность', 'Температура'];

            var arr = _collection.map(function (item, index) {
                return [(index+1) + ' день', item.humidity, item.temp.max-273]
            });

            arr.unshift(_indicators);

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);

            function drawChart() {
                let data = google.visualization.arrayToDataTable(arr);

                let options = {
                    chart: {
                        title: `График температуры и влажности за период - ${_days} дней`
                    },
                    bars: 'horizontal' // Required for Material Bar Charts.
                };

                let optionsVertical = {
                    chart: {
                        title: `График температуры и влажности за период - ${_days} дней (Вертикальный)`
                    },
                    bars: 'vertical' // Required for Material Bar Charts.
                };

                let chart = new google.charts.Bar(document.getElementById('bar')),
                    chartVertical = new google.charts.Bar(document.getElementById('chart_div'));


                chart.draw(data, google.charts.Bar.convertOptions(options));
                chartVertical.draw(data, google.charts.Bar.convertOptions(optionsVertical));
            }
        }
    }

}