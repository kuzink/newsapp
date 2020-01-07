import React, {Component} from 'react';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';
const pageNeighbours = 1;

const range = (from, to, step = 1) => {
	let i = from;
	const range = [];
	while (i <= to) {
		range.push(i);
		i += step;
	}
	return range;
};

class Pagination extends Component {

	fetchPageNumbers = (totalPages, currentPage) => {
		const totalNumbers = (pageNeighbours * 2) + 3;
		const totalBlocks = totalNumbers + 2;

		if (totalPages > totalBlocks) {
			const startPage = Math.max(2, currentPage - pageNeighbours);
			const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
			let pages = range(startPage, endPage);
			const hasLeftSpill = startPage > 2;
			const hasRightSpill = (totalPages - endPage) > 1;
			const spillOffset = totalNumbers - (pages.length + 1);

			switch (true) {
				case (hasLeftSpill && !hasRightSpill): {
					const extraPages = range(startPage - spillOffset, startPage - 1);
					pages = [LEFT_PAGE, ...extraPages, ...pages];
					break;
				}
				case (!hasLeftSpill && hasRightSpill): {
					const extraPages = range(endPage + 1, endPage + spillOffset);
					pages = [...pages, ...extraPages, RIGHT_PAGE];
					break;
				}
				default: {
					pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
					break;
				}
			}
			return [1, ...pages, totalPages];
		}
		return range(1, totalPages);
	};

	handleMoveLeft = e => {
		e.preventDefault();
		this.gotoPage((this.props.page.number + 1) - (pageNeighbours * 2) - 1);
	};

	handleMoveRight = e => {
		e.preventDefault();
		this.gotoPage((this.props.page.number + 1) + (pageNeighbours * 2) + 1);
	};

	handleClick = page => e => {
		e.preventDefault();
		this.gotoPage(page);
	};

	gotoPage = page => {
		if (this.props.id) {
			this.props.getItems(this.props.id, this.props.page.size, page - 1);
		} else {
			this.props.getItems(this.props.page.size, page - 1, this.props.search);
		}
	};

	render() {
		const {totalPages, number} = this.props.page;
		if (!totalPages || totalPages === 1) return null;

		const currentPage = number + 1;
		const pages = this.fetchPageNumbers(totalPages, currentPage);

		return (
			<div className="btn-group">
				{pages.map((page, index) => {
					if (page === LEFT_PAGE) return (
						<button key={index} className="btn btn-secondary" onClick={this.handleMoveLeft}>&laquo;</button>
					);
					if (page === RIGHT_PAGE) return (
						<button key={index} className="btn btn-secondary" onClick={this.handleMoveRight}>&raquo;</button>
					);
					return (
						<button key={index} className={`btn ${ currentPage === page ? ' btn-primary' : ' btn-secondary'}`}
						        onClick={this.handleClick(page)}>{page}</button>
					);
				})}
			</div>
		);
	}
}

export default Pagination;