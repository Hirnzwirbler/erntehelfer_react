import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

/**
 * Checks if fields with required have a value and sets it to a const
 * @param {String} value - Input from the form
 */
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

/**
 * Checks if field with email is valid and sets it to a const
 * @param {String} value - Input from the form
 */
const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

/**
 * Checks if field with username is valid and sets it to const
 * @param {String} value 
 */
const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

/**
 * Checks if field with password is valid and sets it to const
 * @param {String} value 
 */
const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

/**
 * Represents the Register page
 */
export default class Register extends Component {
  /**
   * @constructor
   * @param {Any} props 
   */
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeExperience = this.onChangeExperience.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      experience: "",
      country: "",
      successful: false,
      message: ""
    };
  }

  /**
   * Eventhandler for username
   * @param {Event} e 
   */
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  /**
   * Eventhandler for email
   * @param {Event} e 
   */
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  /**
   * Eventhandler for password
   * @param {Event} e 
   */
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  /**
   * Eventhandler for experience
   * @param {Event} e 
   */
  onChangeExperience(e) {
    this.setState({
      experience: e.target.value
    });
  }

  /**
   * Eventhandler for country
   * @param {Event} e 
   */
  onChangeCountry(e) {
    this.setState({
      country: e.target.value
    });
  }

  /**
   * Eventhandler for register
   * Is called when the form is submitted
   * @param {Event} e 
   */
  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.experience,
        this.state.country
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="experience">Experience</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="experience"
                    value={this.state.experience}
                    onChange={this.onChangeExperience}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="country"
                    value={this.state.country}
                    onChange={this.onChangeCountry}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}