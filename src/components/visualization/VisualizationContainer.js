import React, {Component} from 'react';

export default class VisualizationContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: {},
            collection: {}
        }
    }

    googleCharts(response) {
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

    requestStaticData(days, city) {
        let xhr = new XMLHttpRequest(),
            response = null,
            _days = days || 10,
            _city = city || 'voronezh';

        xhr.open("GET", `http://localhost:3000/api/days/${_days}?city=${_city}`, true);
        xhr.send();

        xhr.onreadystatechange = () => { // (3)
            if (xhr.readyState != 4) return;

            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                response = JSON.parse(xhr.responseText);
                this.setState({
                    collection: response
                });
                this.googleCharts(this.state.collection);
                // this.googleChartCoreChart(this.state.collection);
            }
        }
    }

    componentDidMount() {
        this.requestStaticData();
    }

    render() {
        return(
            <div className="wrapper-charts">
                <div className="b-charts-vertical">
                    <div id="chart_div"></div>
                </div>
                <div className="b-charts-horizontal">
                    <div id="bar"></div>
                </div>
            </div>
        )
    }
}