import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './store/actions';

class App extends Component {
    componentDidMount() {
        const { fetchUser } = this.props;
        fetchUser();
    }

    render() {
        return (
            <div>
                <a href="/auth/google">Sign In with Google</a>
            </div>
        );
    }
}

export default connect(
    null,
    { fetchUser }
)(App);
