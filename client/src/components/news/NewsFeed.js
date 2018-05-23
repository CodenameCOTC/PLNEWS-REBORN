import React, { Component } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";

class NewsFeed extends Component {
  render() {
    const { news } = this.props;

    return news.map(news => <NewsItem key={news._id} news={news} />);
  }
}

NewsFeed.propTypes = {
  news: PropTypes.array.isRequired
};

export default NewsFeed;
