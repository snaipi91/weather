import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';

// material UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Custom
import App from './App';
import WeatherContainer from './components/WeatherContainer';
import AnotherContainer from './components/AnotherContoiner';
import Error404 from './components/Error404';

import './global.scss';

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={WeatherContainer}/>
                <Route path="news" component={AnotherContainer}/>
                <Route path="login" component={AnotherContainer}/>
                <Route path="*" component={Error404}/>
            </Route>
        </Router>
    </MuiThemeProvider>,
    document.getElementById('root')
);
