import React, { Component } from "react";
import { connect } from "react-redux";
import { getNews } from "../../actions/postActions";
import PropTypes from "prop-types";
import Triangles from "../common/Triangles";
import NewsFeed from "./NewsFeed";

class IndexNews extends Component {
  componentDidMount() {
    this.props.getNews();
  }

  componentWillReceiveProps(nextProps) {
    document.title = this.props.news.loading ? "PLN News Feed" : "Loading...";
    // if (nextProps.news.news !== undefined) {
    //   document.title = "PL Index News";
    // } else {
    //   document.title = "Loading...";
    // }
  }

  render() {
    const { news, loading } = this.props.news;
    let postContent;
    let warning;

    if (loading) {
      postContent = <Triangles />;
    } else {
      postContent = <NewsFeed news={news} />;
      warning = (
        <div className="container">
          <p
            style={{ background: "#010b56", color: "white" }}
            className="btn btn-white mt-2"
          >
            News Feed
          </p>
          <div
            className="alert alert-warning alert-dismissible fade show mt-1 text-center"
            role="alert"
          >
            <strong>
              All article in this site is owned by premireleague.com, I'm just
              using it for studying purpose.
            </strong>
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="index-news">
        <div className="container">
          <div className="col-md-10" />
          <div className="row justify-content-center">
            {warning}
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

IndexNews.propTypes = {
  getNews: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  news: state.news
});

export default connect(
  mapStateToProps,
  { getNews }
)(IndexNews);
