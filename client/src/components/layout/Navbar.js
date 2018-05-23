import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <button
            className="btn btn-sm btn-info nav-link dropdown-toggle active"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Login/Sign Up
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          >
            <Link className="dropdown-item" to="/login">
              Login
            </Link>
            <Link className="dropdown-item" to="/register">
              Sign Up
            </Link>
          </div>
        </li>
      </ul>
    );

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <button
            className="btn btn-sm btn-info nav-link dropdown-toggle active"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {" "}
            {user.nickname}
            <img
              className="rounded-circle ml-2"
              src={user.avatar}
              alt="avatar"
              style={{
                width: "25px",
                marginRight: "5px"
              }}
            />
          </button>
          <div
            className="dropdown-menu"
            aria-labelledby="navbarDropdownMenuLink"
          > {user.isContentCreator ? (
            <Link className="dropdown-item" to="/create-news">
              Create News
            </Link>
          ) : null}

            <a
              href=""
              onClick={this.onLogoutClick.bind(this)}
              className="dropdown-item"
            >
              Log out
            </a>
          </div>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">
            Premire League News
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  News
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </nav>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
