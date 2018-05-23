import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteNews } from "../../actions/postActions";

class NewsItem extends Component {
  onDeleteClick(id) {
    this.props.deleteNews(id, this.props.history);
  }

  onEditClick(id) {
    console.log(`Edited ${id}`);
  }

  render() {
    const { news, auth } = this.props;
    let contentCreatorAction;

    if (auth.isAuthenticated && auth.user.isContentCreator) {
      contentCreatorAction = (
        <div className="hm">
          <div className="btn-group">
            <button
              className="btn btn-dark"
              onClick={this.onEditClick.bind(this, news._id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.onDeleteClick.bind(this, news._id)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="news-content">
        <h1 className="text-center mt-1">{news.title}</h1>
        <img
          src={news.image}
          alt=""
          className="img-fluid rounded mx-auto d-block"
        />

        <p className="text-secondary text-right">
          Posted by:
          <b> {news.author.nickname}</b>
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: news.body }}
          className="description"
        />

        {contentCreatorAction}
      </div>
    );
  }
}

NewsItem.propTypes = {
  news: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteNews })(withRouter(NewsItem));
