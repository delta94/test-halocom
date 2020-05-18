export const REQUEST_ARTICLES = "REQUEST_ARTICLES";
export const RECEIVE_ARTICLES = "RECEIVE_ARTICLES";
export const CHANGE_SEARCH = "CHANGE_SEARCH";
export const CHANGE_SORT = "CHANGE_SORT";
export const CHANGE_TYPE = "CHANGE_TYPE";
export const CHANGE_TIME = "CHANGE_TIME";
export const CHANGE_PAGE = "CHANGE_PAGE";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export function userLogin(name, email) {
  return {
    type: USER_LOGIN,
    name,
    email,
  };
}

export function userLogout() {
  return {
    type: USER_LOGOUT,
  };
}

export function changeSearch(query) {
  return {
    type: CHANGE_SEARCH,
    query,
  };
}

export function changeSort(sort) {
  return {
    type: CHANGE_SORT,
    sort,
  };
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page,
  };
}

export function changeTime(timeRange) {
  return {
    type: CHANGE_TIME,
    timeRange,
  };
}

export function changeType(articleType) {
  return {
    type: CHANGE_TYPE,
    articleType,
  };
}

function requestArticles(query, articleType, timeRange, page, sort) {
  return {
    type: REQUEST_ARTICLES,
    query,
    articleType,
    timeRange,
    page,
    sort,
  };
}

function receiveArticles(query, articleType, timeRange, page, sort, json) {
  return {
    type: RECEIVE_ARTICLES,
    query,
    articleType,
    timeRange,
    page,
    sort,
    data: json,
  };
}

const getLastWeek = () => {
  const today = new Date();
  const last = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );
  return last.getTime() / 1000;
};
const getLastMonth = () => {
  const today = new Date();
  const last = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  return last.getTime() / 1000;
};
const getLast24h = () => {
  const today = new Date();
  const last = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1
  );
  return last.getTime() / 1000;
};
const getLastYear = () => {
  const today = new Date();
  const last = new Date(
    today.getFullYear() - 1,
    today.getMonth(),
    today.getDate()
  );
  return last.getTime() / 1000;
};

export function fetchArticles(query, articleType, timeRange, page, sort) {
  return (dispatch) => {
    window.history.pushState(
      null,
      null,
      `/query=${query}/sort=${sort}/page=${page}/dateRange=${timeRange}/type=${articleType}`
    );
    dispatch(requestArticles(query, articleType, timeRange, page, sort));
    let sort_t, timeRange_t, articleType_t;

    switch (sort) {
      case "byPopularity":
        sort_t = "search";
        break;
      case "byDate":
        sort_t = "search_by_date";
        break;
      default:
        sort_t = "search";
    }
    switch (timeRange) {
      case "all":
        timeRange_t = null;
        break;
      case "last24h":
        timeRange_t = getLast24h();
        break;
      case "pastWeek":
        timeRange_t = getLastWeek();
        break;
      case "pastMonth":
        timeRange_t = getLastMonth();
        break;
      case "pastYear":
        timeRange_t = getLastYear();
        break;
      default:
        timeRange_t = null;
    }
    switch (articleType) {
      case "story":
        articleType_t = "story";
        break;
      case "comment":
        articleType_t = "comment";
        break;
      case "all":
        articleType_t = "(story,comment)";
        break;
      default:
        articleType_t = "story";
    }
    let url;
    if (timeRange_t === null) {
      url = `https://hn.algolia.com/api/v1/${sort_t}?query=${query}&page=${page}&tags=${articleType_t}`;
    } else {
      url = `https://hn.algolia.com/api/v1/${sort_t}?query=${query}&page=${page}&tags=${articleType_t}&numericFilters=created_at_i>${timeRange_t}`;
    }
    console.log(url);
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          receiveArticles(query, articleType, timeRange, page, sort, data)
        );
      });
  };
}
