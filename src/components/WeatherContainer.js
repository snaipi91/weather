import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import WidgetWeather from './widgetWeather/WidgetWeather';
import VisualizationContainer from './visualization/VisualizationContainer';

import {Link} from 'react-router';

import './main.scss';

class WeatherContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: '',
            data: [],
            city: '',
            days: 1,
            value: 'voronezh',
            forecats: 0
        }
    }

    loadWeatherWidgetData = (value = 'voronezh') => {
        this.promises(value)
            .then(
                resolve => {
                    this.setState({
                        data: resolve.list,
                        city: resolve.city.name,
                        forecats: resolve.cnt
                    });
                },
                reject => {
                    this.setState({
                        errors: reject.errors
                    })
                }
        );
    };

    handleChange = (event, index, value) => {
        this.loadWeatherWidgetData(value);
        this.setState({
            value
        });
    };

    promises(city) {
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
                            errors: xhr.status + ': ' + xhr.statusText
                        }
                    )
                } else {
                    response = JSON.parse(xhr.responseText);
                    resolve(response);
                }
            }
        })
    };


    componentDidMount() {
        this.loadWeatherWidgetData();
    }

    render() {
        return (
            <div>
                <AppBar title="Weather demo" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <div className="wrapper-toggle-menu">
                    <div className="b-select-city">
                        <SelectField floatingLabelText="Город" value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={'voronezh'} primaryText="Воронеж" />
                            <MenuItem value={'dubai'} primaryText="Дубаи" />
                            <MenuItem value={'london'} primaryText="Лондон" />
                            <MenuItem value={'barcelona'} primaryText="Барселона" />
                            <MenuItem value={'madrid'} primaryText="Мадрид" />
                        </SelectField>
                    </div>
                    <WidgetWeather data={this.state.data} city={this.state.city}/>
                </div>
                <VisualizationContainer/>
                <h1>
                </h1>
            </div>
        )
    }
}

export default WeatherContainer;