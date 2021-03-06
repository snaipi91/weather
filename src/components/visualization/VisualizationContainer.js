import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ActionCreator
import * as visualizationAction from '../../actions/visualizationActionCreator';

// Components
import ChildrenVisual from '../ChildrenVisual';

class VisualizationContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.visualizationAction.loadData(12, this.props.city);
    }

    componentDidUpdate() {
        this.props.visualizationAction.loadData(12, this.props.city);
    }

    render() {
        return(
            <ChildrenVisual city={this.props.city}/>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    visualizationAction: bindActionCreators(visualizationAction, dispatch)
});

export default connect(() => ({}), mapDispatchToProps)(VisualizationContainer);