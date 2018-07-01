import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Triangles from "../common/Triangles";
import { getShowNews, deleteNews } from "../../actions/postActions";
import ShowNewsItem from "./ShowNewsItem";
import CommentsForm from "./comments/CommentsForm";
import CommentsFeed from "./comments/CommentsFeed";

class ShowNews extends Component {
  componentDidMount() {
    this.props.getShowNews(this.props.match.params.news_id);
    document.title = "Loading";
  }

  render() {
    const { loading, show_news } = this.props.news;

    let newsData;
    let commentForms;
    let commentsItem;
    let commentFeedsHeader;
    let noCommentsYet;

    if (show_news === null || loading || Object.keys(show_news).length === 0) {
      newsData = <Triangles />;
      commentsItem = <Triangles />;
    } else {
      newsData = <ShowNewsItem news={show_news} />;
      commentForms = <CommentsForm news_id={show_news._id} />;
      commentsItem = (
        <CommentsFeed comments={show_news.comments} news_id={show_news._id} />
      );
      commentFeedsHeader = (
        <h4
          className="rounded text-center"
          style={{
            background: "#4f112e",
            color: "white",
            opacity: "0.5"
          }}
        >
          {" "}
          Comments Feed
        </h4>
      );
      noCommentsYet =
        show_news.comments.length === 0 ? (
          <p className="text-lead text-center">There's no comment yet</p>
        ) : null;
    }

    return (
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-12 border pb-3">{newsData}</div>
          {loading ? null : (
            <div className="col-md-12 border pt-2">
              {commentForms}
              {commentFeedsHeader}
              {noCommentsYet}
              {commentsItem}
            </div>
          )}
        </div>
      </div>
    );
  }
}

ShowNews.propTypes = {
  news: PropTypes.object.isRequired,
  getShowNews: PropTypes.func.isRequired,
  deleteNews: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  { getShowNews, deleteNews }
)(withRouter(ShowNews));
