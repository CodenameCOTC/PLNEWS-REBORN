import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentsItem from "./CommentsItem";

class CommentsFeed extends Component {
  render() {
    const { comments, news_id } = this.props;
    return comments.map(comment => (
      <CommentsItem key={comment._id} comment={comment} news_id={news_id} />
    ));
  }
}

CommentsFeed.propTypes = {
  comments: PropTypes.array.isRequired,
  news_id: PropTypes.string.isRequired
};

export default CommentsFeed;
