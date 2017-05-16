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

    handleChange = (event, index, value) => {
        this.loadData(value);
        this.setState({value});
    };

    // loadData(city) {
    //     let promiseData = new Promise((resolve, reject) => {
    //
    //     });
    //
    //     let xhr = new XMLHttpRequest(),
    //         response = null,
    //         _city = city || 'voronezh';
    //
    //     xhr.open("GET", `http://localhost:3000/api/${_city}?ctn=1`, true);
    //     xhr.send();
    //
    //     xhr.onreadystatechange = () => { // (3)
    //         if (xhr.readyState != 4) return;
    //
    //         if (xhr.status != 200) {
    //             this.state({
    //                 errors: xhr.status + ': ' + xhr.statusText
    //             })
    //         } else {
    //             response = JSON.parse(xhr.responseText);
    //             this.setState({
    //                 data: response.list,
    //                 city: response.city.name,
    //                 forecats: response.cnt
    //             });
    //         }
    //     }
    // }

    loadData(city) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest(),
                response = null,
                _city = city || 'voronezh';

            xhr.open("GET", `http://localhost:3000/api/${_city}?ctn=1`, true);
            xhr.send();

            xhr.onreadystatechange = () => { // (3)
                if (xhr.readyState != 4) return;

                if (xhr.status != 200) {
                    this.state({
                        errors: xhr.status + ': ' + xhr.statusText
                    })
                } else {
                    response = JSON.parse(xhr.responseText);
                    resolve();
                    this.setState({
                        data: response.list,
                        city: response.city.name,
                        forecats: response.cnt
                    });
                }
            }
        })
    };


    componentDidMount() {
        this.loadData()
            .then((resolve) => {
                console.log('Выполнен успешно')
            })

            .catch((reject) => {
                console.log(reject);
            })
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
                    <Link to="/news/sports">To link</Link>
                </h1>
            </div>
        )
    }
}

export default WeatherContainer;