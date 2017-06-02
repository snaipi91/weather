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
import * as widgetWeatherAction from '../actions/widgetWeatherActionCreator';

import './main.scss';

class WeatherContainer extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (event, index, value) => {
        this.props.widgetWeatherAction.loadData(value);
    };

    // Component before render
    componentWillMount() {
    }

    // Component after render
    componentDidMount() {
        this.props.widgetWeatherAction.loadData();
    }

    // Component get props before render
    componentDidUpdate() {
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
                    <WidgetWeather data={this.props.widget.data} city={this.props.widget.city}/>
                </div>
                <VisualizationContainer city={this.props.widget.city}/>
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