/**
 * Created by Андрей on 26.05.2017.
 */
import React, {Component} from 'react';

export default class ChildrenVisual extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper-charts">
                <div className="b-charts-vertical">
                    <div id="chart_div">{this.props.city}</div>
                </div>
                <div className="b-charts-horizontal">
                    <div id="bar"></div>
                </div>
            </div>
        )
    }
}