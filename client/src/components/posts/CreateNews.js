import React, { Component } from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class CreateNews extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      image: "",
      tags: "",
      body: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newNews = {
      title: this.state.title,
      image: this.state.image,
      author: this.props.auth.user.nickname,
      tags: this.state.tags.split(",")
    };

    console.log(newNews);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create a New News</h1>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                placeholder="Title"
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.onChange}
                error={errors.title}
                info="This will be Title News"
              />
              <TextFieldGroup
                placeholder="Image URL"
                name="image"
                type="text"
                value={this.state.image}
                onChange={this.onChange}
                error={errors.image}
                info="This will be Image News"
              />
              <TextFieldGroup
                placeholder="Tags"
                name="tags"
                type="text"
                value={this.state.tags}
                onChange={this.onChange}
                error={errors.tags}
                info="Tags will be split by comma(,)"
              />
              <TextAreaFieldGroup
                placeholder="News Content"
                name="body"
                type="text"
                value={this.state.body}
                onChange={this.onChange}
                error={errors.body}
              />
              <input type="submit" className="btn btn-block btn-primary" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateNews.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(CreateNews));
