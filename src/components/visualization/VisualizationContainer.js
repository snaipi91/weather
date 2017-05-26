import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// ActionCreator
import * as visualizationAction from '../../actionsCreate/visualizationActionCreator';

// Components
import ChildrenVisual from '../ChildrenVisual';

class VisualizationContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentWillUpdate(nextProps) {
        console.log('render');
        nextProps.visualizationAction.loadData(3, nextProps.city);
        return true;
    }

    render() {
        return(
            <ChildrenVisual city={this.props.city}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        visual: state.visualWidget
    };
};

const mapDispatchToProps = (dispatch) => ({
    visualizationAction: bindActionCreators(visualizationAction, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(VisualizationContainer);