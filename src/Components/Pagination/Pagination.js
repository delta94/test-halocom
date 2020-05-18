import React, { Component } from "react";
import { connect } from "react-redux";
// import Header from '../Header/Header';
import ButtonCard from "./ButtonCard";
import "./Pagination.css";
import { changePage, fetchArticles } from "../../actions";
import { createPagination } from "../../utils";

class Pagination extends Component {
  handleClick = (event) => {
    this.props.onButtonClick(parseInt(event.target.value) - 1);
    const { query, articleType, timeRange, sort } = this.props.searchSettings;
    this.props.getArticles(
      query,
      articleType,
      timeRange,
      parseInt(event.target.value) - 1,
      sort
    );
  };
  handleClickForward = (event) => {
    const { query, articleType, timeRange, sort } = this.props.searchSettings;
    const { page } = this.props.searchResults;

    this.props.onButtonClick(page + 1);
    this.props.getArticles(query, articleType, timeRange, page + 1, sort);
  };
  handleClickBackward = (event) => {
    const { query, articleType, timeRange, sort } = this.props.searchSettings;
    const { page } = this.props.searchResults;

    this.props.onButtonClick(page - 1);
    this.props.getArticles(query, articleType, timeRange, page - 1, sort);
  };

  render() {
    const { page, totalPages } = this.props.searchResults;
    const { handleClickBackward, handleClickForward, handleClick } = this;
    const PagiN = ({ buttons }) => {
      const pageComponent = buttons.map((button, i) => (
        <ButtonCard
          key={i}
          value={button.value}
          isActive={button.isActive}
          isDisabled={button.isDisabled}
          onClick={button.onClick}
        />
      ));
      return <ul className="search-pagination">{pageComponent}</ul>;
    };
    return (
      <PagiN
        buttons={createPagination(
          page,
          totalPages,
          handleClickBackward,
          handleClickForward,
          handleClick
        )}
      />
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
    onButtonClick: (page) => dispatch(changePage(page)),
    getArticles: (query, articleType, timeRange, page, sort) =>
      dispatch(fetchArticles(query, articleType, timeRange, page, sort)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
