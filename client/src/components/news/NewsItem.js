import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class NewsItem extends Component {
  render() {
    const { news } = this.props;

    return (
      <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 d-flex">
        <div className="card mt-2 flex-fill text-center">
          <img src={news.image} alt={news.title} className="img-thumbnail" />
          <div className="card-body">
            <h5 id="title" className="card-title">
              {news.title}
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

NewsItem.propTypes = {
  news: PropTypes.object.isRequired
};

export default NewsItem;
