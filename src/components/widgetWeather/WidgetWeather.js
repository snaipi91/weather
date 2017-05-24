import React, {Component} from 'react';
import './WidgetWeather.scss';

export default class WidgetWeather extends Component {

    render() {

        if(this.props.data) {

            var _link = null,
                city = this.props.city,
                widgetWeather = this.props.data.map(function (item, index) {
                    _link = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;

                    return (
                        <widgetWeather key={index} className="widget-weather__item">
                            <h1 className="widget-weather__item-title">Погода {city}</h1>
                            <div className="widget-weather__item-data">{parseInt(item.main.temp_max - 273.15)} С&deg;</div>
                            <div className="widget-weather__item-data">Влажность: {item.main.humidity}%</div>
                            <img src={_link} alt=""/>
                        </widgetWeather>
                    )
            });
        }

        return(
            <div className="widget-weather">
                {widgetWeather}
            </div>
        )
    }
}