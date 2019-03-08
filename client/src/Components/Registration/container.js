import { connect } from 'react-redux';
import { registerUser } from './actionCreators'; 
import RegistrationPage from './RegistrationPage';

const mapStateToProps = ({ registration }) => ({
  registration
})

const mapDispatchToProps = () => ({
  registerUser
})

export default connect(mapStateToProps, {registerUser})(RegistrationPage)