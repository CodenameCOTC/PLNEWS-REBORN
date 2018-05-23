import React, { Component } from "react";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeComment } from '../../../actions/postActions';

class CommentsItem extends Component {
  onClick(comment_id) {
    this.props.removeComment(this.props.news_id, comment_id)
  }
  render() {
    const { auth, comment } = this.props;
    console.log(comment.length)

    return (
      <div className="commentItems">
        <ul className="list-unstyle5">
          <li key={comment._id} className="media border-bottom border-dark pb-2 pt-2">
            <img
              src={comment.author.avatar}
              alt="avatar"
              className=" mr-2 rounded-circle"
              style={{ maxHeight: "64px", maxWidth: "64px" }}
            />
            <div className="media-body">
              <h5 className="mt-0 mb-1">
                <strong>{comment.author.nickname}</strong>
              </h5>
              {comment.text}
              <p className="secondary">
                <Moment fromNow>{comment.created}</Moment>
              </p>
              {comment.author._id === auth.user.id ? (
                <button className="btn btn-success" onClick={this.onClick.bind(this, comment._id)}>Delete</button>
              ) : null}
            </div>
          </li>
        </ul>
      </div>
    );
  }
}

CommentsItem.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
  news_id: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { removeComment })(CommentsItem);
