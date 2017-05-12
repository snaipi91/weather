import React, {Component} from 'react';

import {Link} from 'react-router';

import './main.scss';

class AnotherContoiner extends Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                Another page
                <Link to="/page"/>
            </div>
        )
    }
}

export default AnotherContoiner;