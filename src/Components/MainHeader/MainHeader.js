import React, { Component } from "react";
import { connect } from "react-redux";
import "./MainHeader.css";
import {
  changeSort,
  changeType,
  changeTime,
  changePage,
  fetchArticles,
} from "../../actions";

class MainHeader extends Component {
  handleTypeChange = (event) => {
    const { query, timeRange, sort } = this.props.searchSettings;
    const articleType = event.currentTarget.getAttribute("value");
    this.props.onTypeChange(articleType);
    this.props.pageChange(0);
    this.props.getArticles(query, articleType, timeRange, 0, sort);
  };
  handleTypeClick = () => {
    document.getElementById("typeDiv").classList.toggle("active");
  };
  handleSortChange = (event) => {
    this.props.onSortChange(event.currentTarget.getAttribute("value"));
    this.props.pageChange(0);
    const { query, articleType, timeRange } = this.props.searchSettings;
    this.props.getArticles(
      query,
      articleType,
      timeRange,
      0,
      event.currentTarget.getAttribute("value")
    );
  };
  handleSortClick = () => {
    document.getElementById("sortDiv").classList.toggle("active");
  };
  handleTimeChange = (event) => {
    this.props.onTimeChange(event.currentTarget.getAttribute("value"));
    this.props.pageChange(0);
    const { query, articleType, sort } = this.props.searchSettings;
    this.props.getArticles(
      query,
      articleType,
      event.currentTarget.getAttribute("value"),
      0,
      sort
    );
  };
  handleTimeClick = () => {
    document.getElementById("timeDiv").classList.toggle("active");
  };

  render() {
    let type, sortt, time;
    const { searchSettings } = this.props;
    const { articleType, sort, timeRange } = searchSettings;

    if (articleType === "all") type = "All";
    else if (articleType === "story") type = "Stories";
    else type = "Comments";

    if (sort === "byPopularity") sortt = "Popularity";
    else sortt = "Date";

    if (timeRange === "all") time = "All time";
    else if (timeRange === "last24h") time = "Last 24h";
    else if (timeRange === "pastWeek") time = "Past Week";
    else if (timeRange === "pastMonth") time = "Past Month";
    else time = "Past Year";

    return (
      <header>
        <span className="filter-label">Search</span>
        <div
          className="type-dropdown wrap-dd-select"
          id="typeDiv"
          onClick={this.handleTypeClick}
        >
          <span className="selected">{type}</span>
          <ul className="dropdown">
            <li
              className="dropdown-item"
              value="all"
              onClick={this.handleTypeChange.bind(this)}
            >
              <i className="dropdown-item">All</i>
            </li>
            <li
              className="dropdown-item"
              value="story"
              onClick={this.handleTypeChange.bind(this)}
            >
              <i className="dropdown-item">Stories</i>
            </li>
            <li
              className="dropdown-item"
              value="comment"
              onClick={this.handleTypeChange.bind(this)}
            >
              <i className="dropdown-item">Comments</i>
            </li>
          </ul>
        </div>
        <span className="filter-label">by</span>
        <div
          className="type-dropdown wrap-dd-select"
          id="sortDiv"
          onClick={this.handleSortClick.bind(this)}
        >
          <span className="selected">{sortt}</span>
          <ul className="dropdown">
            <li
              className="dropdown-item"
              value="byPopularity"
              onClick={this.handleSortChange.bind(this)}
            >
              <i className="dropdown-item">Popularity</i>
            </li>
            <li
              className="dropdown-item"
              value="byDate"
              onClick={this.handleSortChange.bind(this)}
            >
              <i className="dropdown-item">Date</i>
            </li>
          </ul>
        </div>
        <span className="filter-label">for</span>
        <div
          className="type-dropdown wrap-dd-select"
          onClick={this.handleTimeClick}
          id="timeDiv"
        >
          <span className="selected">{time}</span>
          <ul className="dropdown">
            <li
              className="dropdown-item"
              value="all"
              onClick={this.handleTimeChange.bind(this)}
            >
              <i className="dropdown-item">All time</i>
            </li>
            <li
              className="dropdown-item"
              value="last24h"
              onClick={this.handleTimeChange.bind(this)}
            >
              <i className="dropdown-item">Last 24h</i>
            </li>
            <li
              className="dropdown-item"
              value="pastWeek"
              onClick={this.handleTimeChange.bind(this)}
            >
              <i className="dropdown-item">Past Week</i>
            </li>
            <li
              className="dropdown-item"
              value="pastMonth"
              onClick={this.handleTimeChange.bind(this)}
            >
              <i className="dropdown-item">Past Month</i>
            </li>
            <li
              className="dropdown-item"
              value="pastYear"
              onClick={this.handleTimeChange.bind(this)}
            >
              <i className="dropdown-item">Past Year</i>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
function mapStateToProps(state) {
  const { searchSettings, searchResults } = state;
  return {
    searchResults,
    searchSettings,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTypeChange: (value) => dispatch(changeType(value)),
    onSortChange: (value) => dispatch(changeSort(value)),
    onTimeChange: (value) => dispatch(changeTime(value)),
    pageChange: (page) => dispatch(changePage(page)),
    getArticles: (query, articleType, timeRange, page, sort) =>
      dispatch(fetchArticles(query, articleType, timeRange, page, sort)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
