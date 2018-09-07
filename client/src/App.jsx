import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fetchUser } from './store/actions';
import Navbar from './components/Navbar';

class App extends Component {
    componentDidMount() {
        const { fetchUser } = this.props;
        fetchUser();
    }

    render() {
        return (
            <Fragment>
                <CssBaseline />
                <Navbar />
                <Router>
                    <Fragment>
                        <Route />
                    </Fragment>
                </Router>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { fetchUser }
)(App);
