import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import TextAreaFieldGroup from "../../common/TextAreaFieldGroup";
import { postComments } from "../../../actions/postActions";

class CommentsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const commentData = {
      text: this.state.text,
      author: this.props.auth.user.id
    };

    this.setState({
      text: ""
    })

    // Call func to posting comments data to endpoint
    this.props.postComments(this.props.news_id, commentData);
  }

  render() {
    const { errors, auth } = this.props;
    let commentsForm;

    // Authentication checking
    if (auth.isAuthenticated) {
      commentsForm = (
        <div>
          <h5
            style={{ background: "grey", color: "white" }}
            className="text-center border text-lead"
          >
            Comments Forms
          </h5>

          <TextAreaFieldGroup
            name="text"
            placeholder="Write your comments here"
            value={this.state.text}
            onChange={this.onChange}
            info="Feel free to write anything you want"
            error={errors.comments}
          />
          <button
            style={{ background: "#321c3a", color: "white" }}
            type="submit"
            className="btn btn-lg mb-2"
          >
            Submit
          </button>
        </div>
      );
    } else {
      commentsForm = (
        <div>
          <div className="alert alert-danger">
            Plase{" "}
            <Link className="alert-link" to="/login">
              Login
            </Link>{" "}
            or
            <Link className="alert-link" to="register">
              {" "}
              Register
            </Link>{" "}
            so you can add a comment
          </div>
          <h5
            style={{ background: "grey", color: "white" }}
            className="text-center border text-lead"
          >
            Comments Forms
          </h5>

          <TextAreaFieldGroup
            name="text"
            placeholder="Write your comments here"
            value={this.state.text}
            onChange={this.onChange}
            info="Feel free to write anything you want"
            error={errors.comments}
            disabled="disabled"
          />
          <button
            style={{ background: "#321c3a", color: "white" }}
            type="submit"
            className="btn btn-lg mb-2"
            disabled
          >
            Submit
          </button>
        </div>
      );
    }

    return (
      <div>
        <form onSubmit={this.onSubmit}>{commentsForm}</form>
      </div>
    );
  }
}

CommentsForm.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  news_id: PropTypes.string.isRequired,
  postComments: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { postComments })(CommentsForm);
