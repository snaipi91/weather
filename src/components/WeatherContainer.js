// React, Redux
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Link} from 'react-router';
import PropTypes from 'prop-types';

// Material-ui
import AppBar from 'material-ui/AppBar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// Components
import WidgetWeather from './widgetWeather/WidgetWeather';
import VisualizationContainer from './visualization/VisualizationContainer';

// Actions
import * as widgetWeatherAction from '../actionsCreate/widgetWeatherActionCreator';

import './main.scss';

class WeatherContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            errors: [],
            data: [],
            city: 'voronezh',
            days: 1,
            forecats: 0
        }
    }

    loadWeatherWidgetData = (value = 'voronezh') => {
        this.promises(value)
            .then(
                resolve => {
                    this.setState({
                        data: resolve.list,
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

    componentWillMount() {
    }


    componentDidMount() {
        this.props.widgetWeatherAction.loadData();
        this.loadWeatherWidgetData();
    }

    render() {
        return (
            <div>
                <AppBar title="Weather demo" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <div className="wrapper-toggle-menu">
                    <div className="b-select-city">
                        <SelectField floatingLabelText="Город" value={this.props.widget.city} onChange={this.handleChange}>
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

WeatherContainer.propTypes = {
    city: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        widget: state.widgetWeather
    };
};

const mapDispatchToProps = (dispatch) => ({
    widgetWeatherAction: bindActionCreators(widgetWeatherAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);