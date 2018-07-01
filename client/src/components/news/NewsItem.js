import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class ShowNewsItem extends Component {
  render() {
    const { news } = this.props;

    return (
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex">
        <div id="card-news-index" className="card mb-1 flex-fill text-center">
          <img src={news.image} alt={news.title} className="img-thumbnail" />
          <div className="card-body">
            <h5
              id="title"
              className="card-title"
              data-toggle="tooltip"
              data-placement="top"
              title={news.title}
            >
              {news.title.substring(0, 50)}
              {news.title.length > 50 ? " ..." : null}
            </h5>
          </div>
          <div className="card-footer text-muted">
            <Moment fromNow>{news.created}</Moment>
            <Link
              to={`/news/${news._id}`}
              className="btn btn-outline-primary btn-sm btn-block mt-1"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ShowNewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

export default ShowNewsItem;
