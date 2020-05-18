import React, { Component } from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Pagination from '../Pagination/Pagination';
import MainHeader from '../MainHeader/MainHeader';
import './Section.css';

class Section extends Component {

	render() {
		return (
			<section className="main">			
				<MainHeader />
				<SearchResults />
				<Pagination />
			</section>
		);
	}
}

export default Section;