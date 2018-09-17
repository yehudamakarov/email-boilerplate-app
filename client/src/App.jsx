import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fetchUser } from './store/actions';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';
import SurveyNew from './components/SurveyNew';

class App extends Component {
    componentDidMount() {
        const { fetchUser } = this.props;
        fetchUser();
    }

    render() {
        return (
            <Fragment>
                <CssBaseline />
                <Router>
                    <Fragment>
                        <Navbar />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
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
