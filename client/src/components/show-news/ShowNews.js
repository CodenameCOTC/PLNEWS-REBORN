import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Triangles from "../common/Triangles";
import { getShowNews, deleteNews } from "../../actions/postActions";
import NewsItem from "./NewsItem";

class ShowNews extends Component {
  componentDidMount() {
    this.props.getShowNews(this.props.match.params.news_id);
  }

  render() {
    const { loading, show_news } = this.props.news;
    let newsData;
    // Checking the data
    if (!show_news || loading) {
      newsData = <Triangles />;
    } else {
      newsData = <NewsItem news={show_news} />;
    }
    return (
      <div className="container mt-1">
        <div className="row justify-content-center">
          <div className="col-md-10 border pb-3">{newsData}</div>
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

export default connect(mapStateToProps, { getShowNews, deleteNews })(
  withRouter(ShowNews)
);
