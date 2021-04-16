//import Header from '../components/elements/Header';
import Home from '../components/Home';
import { connect } from 'react-redux';
import { saveAuthData } from '../Services/actions/action';
console.log("AUTH Container");
const mapStateToProps = state => ({
    //data: state
});

const mapDispatchToProps = dispatch => ({
    authDataHandler: data => dispatch(saveAuthData(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
