import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import WeatherContainer from './components/WeatherContainer';

import './global.scss';

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <WeatherContainer/>
    </MuiThemeProvider>,
    document.getElementById('root')
);
