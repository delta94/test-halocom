import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../../assets/logo-hn-search.png";
import algoliaLogo from "../../assets/algolia-logo-white.svg";
import "./Header.css";
import {
  changeSearch,
  changePage,
  fetchArticles,
  userLogout,
} from "../../actions";

class Header extends Component {
  handleSearchChange = (event) => {
    this.props.onSearchChange(event);
    this.props.pageChange(0);
    const { articleType, timeRange, sort } = this.props.searchSettings;
    this.props.getArticles(event.target.value, articleType, timeRange, 0, sort);
  };
  handleLogout = () => {
    const storage = window.localStorage;
    storage.clear();
    this.props.setLogout();
  };
  render() {
    const { user } = this.props;
    const { isLoggedIn } = user;
    return (
      <header className="page-header">
        <div className="logo-wrapper">
          <Link className="logo" to="/?">
            <img src={logo} alt="logo" />
            <div className="logo-name">
              Search
              <br />
              Hacker News
            </div>
          </Link>
        </div>
        <div className="search-wrapper">
          <div className="input-item-wrapper">
            <i className="icon-search"></i>
            <input
              id="search"
              onChange={this.handleSearchChange}
              type="search"
              placeholder="Search stories by title, url or author"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              autoCorrect="off"
              autoFocus
            />
          </div>
          <span className="powered-by">
            by
            <a
              href="https://www.algolia.com/?utm_source=hn_search&amp;utm_medium=link&amp;utm_term=logo&amp;utm_campaign=hn_algolia"
              title="Realtime Search Engine"
            >
              <img
                src={algoliaLogo}
                alt="Algolia logo white"
                width="60"
                height="15"
              />
            </a>
          </span>
        </div>
        <div className="account-wrapper">
          {!isLoggedIn ? (
            <i className="icon-head" onClick={this.props.toggleModal}></i>
          ) : (
            <span onClick={this.handleLogout}>LOGOUT</span>
          )}
        </div>
      </header>
    );
  }
}
function mapStateToProps(state) {
  const { user, searchSettings, searchResults } = state;
  return {
    user,
    searchResults,
    searchSettings,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(changeSearch(event.target.value)),
    pageChange: (page) => dispatch(changePage(page)),
    setLogout: () => dispatch(userLogout()),
    getArticles: (query, articleType, timeRange, page, sort) =>
      dispatch(fetchArticles(query, articleType, timeRange, page, sort)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
