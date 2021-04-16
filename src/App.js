import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import SinglePost from "./components/SinglePost";

import ErrorPage from "./components/Error";
import './App.css';

import DefaultLayout from "./layout/defaultLayout";

import { connect } from 'react-redux';
import { saveAuthData } from './Services/actions/authAction';

const mapStateToProps = state => ({
  data: state
});

const mapDispatchToProps = dispatch => ({
  saveAuthData: data => dispatch(saveAuthData(data)),
});
const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route {...rest} render={props => (
    <Layout><Component {...props}></Component></Layout>
  )}></Route>
);

function App(props) {
  // console.log("APP ========>", props.data.authData.lng);
  return (
    <div className="App" isLogin="OK">
      <Router>
        <Switch>
          <AppRoute exact path="/" layout={DefaultLayout} component={Home} />
          <AppRoute exact path="/about-us" layout={DefaultLayout} component={About} />
          <AppRoute exact path="/contact-us" layout={DefaultLayout} component={Contact} />
          <AppRoute exact path="/profile" layout={DefaultLayout} component={Profile} />
          <AppRoute exact path="/single-post/:id" layout={DefaultLayout} component={SinglePost} />
          <AppRoute path="*" layout={DefaultLayout} component={ErrorPage} />
        </Switch>
      </Router>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


