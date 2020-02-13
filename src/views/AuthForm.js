import React, { Component } from 'react';
import Signup from '../components/signup'
import Signin from '../components/signin'
import { connect } from 'react-redux'
import { signup, signin } from '../store/actions/auth'
import Preloader from '../components/preloader'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

class Authentication extends Component {
    constructor(props) {
        super(props)
        this.state = {
            signin: true
        }
    }

    componentDidUpdate() {
        if (this.props.user.user) {
            this.props.history.push("/home")
        }
    }
    signup = (values) => {
        this.props.signup(values.email, values.password, values.firstName, values.lastName)
            .then(() => {
                if (this.props.errors.error) {
                    toast.error(this.props.errors.error.message)
                }
            }
            )
    }

    signin = (values) => {
        this.props.signin(values.email, values.password)
            .then(() => {
                if (this.props.errors.error) {
                    toast.error(this.props.errors.error.message)
                }
            }
            )
    }
    changeRequiredAction = (e) => {
        this.setState({ signin: !this.state.signin })
    }
    render() {
        return (
            <div className='container'>
                <ToastContainer />
                {this.props.loading.loading ? <div className='container page-centered'>
                    <Preloader />
                </div> : null
                }
                {this.state.signin ? <Signin onSubmit={this.signin} /> : <Signup onSubmit={this.signup} />}

                <div className='container padded'>
                    <button type="submit" onClick={this.changeRequiredAction}>{this.state.signin ? 'Signup' : 'Signin'}</button>
                </div>

            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    signup: (email, password, firstName, lastName) => dispatch(signup(email, password, firstName, lastName)),
    signin: (email, password) => dispatch(signin(email, password))

})
const mapStateToProps = (state) => {
    return {
        errors: state.errors,
        loading: state.loading,
        form: state.form,
        user: state.user
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Authentication)