import React, { Component } from "react";
import Header from "../Header/Header";
import Section from "../Section/Section";
import "./Home.css";
import Modal from "react-awesome-modal";
import { connect } from "react-redux";
import {
  userLogin,
  changeSearch,
  changeSort,
  changeType,
  changeTime,
  changePage,
  fetchArticles,
} from "../../actions";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      isAuth: false,
      name: "",
      email: "",
      password: "",
      isInputValid: true,
      errorMessage: "",
      submitDisabled: false,
    };
  }
  componentDidMount() {
    let { sort, dateRange, type, page, query } = this.props.match.params;
    this.props.typeChange(type);
    this.props.sortChange(sort);
    this.props.timeChange(dateRange);
    this.props.pageChange(page);
    if (query === undefined || query === null) query = "";
    else this.props.queryChange(query);
    this.props.getArticles(query, type, dateRange, page, sort);
    document.getElementById("search").value = query;
    window.history.pushState(
      null,
      null,
      `/query=${query}/sort=${sort}/page=${page}/dateRange=${dateRange}/type=${type}`
    );
  }

  handleInputValidation = (event) => {
    const { isInputValid, errorMessage, submitDisabled } = validateInput(
      this.state.email
    );
    this.setState({
      isInputValid: isInputValid,
      errorMessage: errorMessage,
      submitDisabled: submitDisabled,
    });
  };
  toggleModal = () => {
    //var bool = this.state.visibleModal;
    this.setState({ visibleModal: true });
  };
  handleChangeName = (event) => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };
  handleChangeEmail = (event) => {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
  };
  handleChangePass = (event) => {
    console.log(event.target.value);
    this.setState({ password: event.target.value });
  };
  handleLogin = () => {
    const { name, email, password } = this.state;
    if (email === "testhalocom@gmail.com" && password === "12345678") {
      const storage = window.localStorage;
      storage.setItem("name", name);
      storage.setItem("email", email);
      this.props.setLogin(name, email);
      this.setState({ visibleModal: false });
    } else {
      alert("Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại");
    }
  };
  render() {
    const { user } = this.props;
    const { isLoggedIn } = user;
    return (
      <div className="home-container">
        <Header toggleModal={this.toggleModal} />
        {isLoggedIn ? (
          <Section />
        ) : (
          <div className="login-section">
            <p>Vui lòng đăng nhập để xem nội dung</p>
            <button onClick={this.toggleModal} className="login-btn">
              Đăng nhập
            </button>
          </div>
        )}
        <Modal
          visible={this.state.visibleModal}
          effect="fadeInDown"
          onClickAway={() => this.setState({ visibleModal: false })}
        >
          <form className="login-form" onSubmit={this.handleLogin}>
            <label htmlFor="input_name" className="inp">
              <input
                type="text"
                name="name"
                className="inputBox"
                placeholder=""
                id="input_name"
                value={this.state.name}
                onChange={this.handleChangeName}
                required
              />
              <span className="label">Name</span>
              <span className="border"></span>
            </label>
            <label htmlFor="input_email" className="inp">
              <input
                type="text"
                name="email"
                className="inputBox"
                placeholder=""
                id="input_email"
                value={this.state.email}
                onChange={this.handleChangeEmail}
                onBlur={this.handleInputValidation}
                required
              />
              <span className="label">Email</span>
              <span className="border"></span>
            </label>
            <FormError
              isHidden={this.state.isInputValid}
              errorMessage={this.state.errorMessage}
            />
            <label htmlFor="input_pass" className="inp">
              <input
                type="password"
                name="password"
                className="inputBox"
                placeholder=""
                id="input_pass"
                onChange={this.handleChangePass}
                required
              />
              <span className="label">Password</span>
              <span className="border"></span>
            </label>
            <button type="submit" disabled={this.state.submitDisabled}>
              Login
            </button>
          </form>
        </Modal>
      </div>
    );
  }
}

const validateInput = (checkingText) => {
  const regexp = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;

  if (regexp.exec(checkingText) !== null) {
    return {
      isInputValid: true,
      errorMessage: "",
      submitDisabled: false,
    };
  } else {
    return {
      isInputValid: false,
      errorMessage: "Email không hợp lệ.",
      submitDisabled: true,
    };
  }
};

function FormError(props) {
  if (props.isHidden) {
    return null;
  }
  return <div className="form-warning">{props.errorMessage}</div>;
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (name, email) => dispatch(userLogin(name, email)),
    typeChange: (value) => dispatch(changeType(value)),
    timeChange: (value) => dispatch(changeTime(value)),
    sortChange: (value) => dispatch(changeSort(value)),
    queryChange: (value) => dispatch(changeSearch(value)),
    pageChange: (value) => dispatch(changePage(value)),
    getArticles: (query, articleType, timeRange, page, sort) =>
      dispatch(fetchArticles(query, articleType, timeRange, page, sort)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
