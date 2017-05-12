import React from 'react';

class App extends React.Component {

    render() {
        return (
            <div>
                <div className="router">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App;