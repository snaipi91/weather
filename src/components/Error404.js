import React, {Component} from 'react';

import { Link } from 'react-router'

import AppBar from 'material-ui/AppBar';

import './main.scss';

export default class Error404 extends Component {
    render() {
        return (
            <div>
                <AppBar title="Weather demo" iconClassNameRight="muidocs-icon-navigation-expand-more"/>
                <h1>Страница не найдена!</h1>
                <Link to="/">
                    Вернуться на главную
                </Link>
            </div>
        )
    }
}