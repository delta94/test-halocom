import React, { Component }from 'react';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import { connect } from 'react-redux'
import {
  userLogout,
  userLogin
} from './actions'

class App extends Component {
	componentDidMount() {
		const { dispatch, user } = this.props;

		if(!user.isLoggedIn){
			if(window.localStorage.getItem('email') && window.localStorage.getItem('name')){
				dispatch(userLogin(window.localStorage.getItem('name'), window.localStorage.getItem('email')))
			} else {
				dispatch(userLogout())
			}
		}
	}

	render() {
		const { searchSettings, searchResults } = this.props;
		const { query, articleType, timeRange, sort } = searchSettings
		const { page } = searchResults

	  	if(window.location.pathname==='/')
			window.location.href=(`/query=${query}/sort=${sort}/page=${page}/dateRange=${timeRange}/type=${articleType}`);
		return (
			<div className="App">
				<Switch>
					<Route path="/query=:query?/sort=:sort/page=:page/dateRange=:dateRange/type=:type" render={(props) => {
						return(
							<Home {...props} />
						)
					}}
					/>
				</Switch>
			</div>
		);
	}
}
function mapStateToProps(state) {
  const { user, searchSettings, searchResults } = state
  return {
  	searchSettings,
    user,
    searchResults
  }
}

export default connect(mapStateToProps)(App)