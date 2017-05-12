import React, {Component} from 'react';

import { Link } from 'react-router'

import './main.scss';

export default class Error404 extends Component {
    render() {
        return (
            <div>
                <h1>Страница не найдена!</h1>
                <Link to="/">
                    Вернуться на главную
                </Link>
            </div>
        )
    }
}