import React, {Component} from 'react';
import {Link} from "react-router-dom";
import defaultAvatar from "../../images/avatars/defaultAvatar.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import {getProfiles, searchProfiles} from "../../actions/userProfileActions"
import {connect} from "react-redux";
import PropTypes from "prop-types";

class Users extends Component {

	state = {
		firstName: "",
		lastName: "",
		birthDateFrom: null,
		birthDateTo: null,
		selectedSex: null,
		withPhoto: false,

		profiles: [],

		AZSortFirstName: true,
		AZSortLastName: true,
		AZSortSex: true,
		AZSortByDate: true,
	};

	componentDidMount() {
		this.props.getProfiles(this.props.history);
	}

	componentWillReceiveProps(nextProps) {
		const {profiles} = nextProps.profile;
		this.setState({profiles});
	}

	handleBirthDateFromChange = date => {
		this.setState({birthDateFrom: date});
	};

	handleBirthDateToChange = date => {
		this.setState({birthDateTo: date});
	};

	handleSelectSexChange = selectedSex => {
		this.setState({selectedSex: selectedSex});
	};

	handleCheckboxChange = e => {
		this.setState({withPhoto: e.target.checked});
	};

	onChange = e => {
		this.setState({[e.target.name]: e.target.value});
	};

	onSubmit = e => {
		e.preventDefault();
		const searchParams = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			birthDateFrom: this.state.birthDateFrom ? this.convertDateToServerFormat(this.state.birthDateFrom) : null,
			birthDateTo: this.state.birthDateTo ? this.convertDateToServerFormat(this.state.birthDateTo) : null,
			sex: this.state.selectedSex ? this.state.selectedSex.value : null,
			withPhoto: this.state.withPhoto
		};
		this.props.searchProfiles(searchParams);
	};

	handleClear = () => {
		this.setState({
			firstName: "",
			lastName: "",
			birthDateFrom: null,
			birthDateTo: null,
			selectedSex: null,
			withPhoto: false
		});
	};

	convertDateToServerFormat = date => {
		let d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	};

	//Sort functions:
	//1) by firstName
	sortByFirstName = (e) => {
		e.preventDefault();
		const {profiles, AZSortFirstName} = this.state;
		let sortList = [...profiles];
		if (AZSortFirstName)
			sortList.sort(this.sortByFirstNameUp);
		else
			sortList.sort(this.sortByFirstNameDown);
		this.setState({profiles: sortList, AZSortFirstName: !AZSortFirstName});
	};
	sortByFirstNameUp = (a, b) => {
		let x = a.firstName.toLowerCase();
		let y = b.firstName.toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};
	sortByFirstNameDown = (a, b) => {
		let x = a.firstName.toLowerCase();
		let y = b.firstName.toLowerCase();
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	};

	//2) by lastName
	sortByLastName = (e) => {
		e.preventDefault();
		const {profiles, AZSortLastName} = this.state;
		let sortList = [...profiles];
		if (AZSortLastName)
			sortList.sort(this.sortByLastNameUp);
		else
			sortList.sort(this.sortByLastNameDown);
		this.setState({profiles: sortList, AZSortLastName: !AZSortLastName});
	};
	sortByLastNameUp = (a, b) => {
		let x = a.lastName.toLowerCase();
		let y = b.lastName.toLowerCase();
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};
	sortByLastNameDown = (a, b) => {
		let x = a.lastName.toLowerCase();
		let y = b.lastName.toLowerCase();
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	};

	//3) by BirthDate
	sortByBirthDate = (e) => {
		e.preventDefault();
		const {profiles, AZSortByDate} = this.state;
		const sortList = [];
		const arrOfNull = [];
		profiles.forEach((obj) => {
			if (obj.birthDate)
				sortList.push(obj);
			else
				arrOfNull.push(obj)
		});
		if (AZSortByDate)
			sortList.sort((a, b) => (a.birthDate < b.birthDate) ? -1 : ((a.birthDate > b.birthDate) ? 1 : 0));
		else
			sortList.sort((a, b) => (b.birthDate < a.birthDate) ? -1 : ((b.birthDate > a.birthDate) ? 1 : 0));
		this.setState({profiles: sortList.concat(arrOfNull), AZSortByDate: !AZSortByDate});
	};

	//4) by Sex
	sortBySex = (e) => {
		e.preventDefault();
		const {profiles, AZSortSex} = this.state;
		let sortList = [...profiles];
		if (AZSortSex)
			sortList.sort(this.sortBySexUp);
		else
			sortList.sort(this.sortBySexDown);
		this.setState({profiles: sortList, AZSortSex: !AZSortSex});
	};
	sortBySexUp = (a, b) => {
		let x = a.sex || "z";
		let y = b.sex || "z";
		return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	};
	sortBySexDown = (a, b) => {
		let x = a.sex || "";
		let y = b.sex || "";
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
	};

	render() {
		const {selectedSex, profiles} = this.state;
		const optionsSex = [{label: `Male`, value: `MALE`}, {label: `Female`, value: `FEMALE`}];

		return (
			<main>
				<div className="container custom-div-height">
					<div className="row">


						<div className="col-12">
							<h1 className="text-center font-weight-light my-4">Users</h1>
							<hr className="mb-4"/>
						</div>

						<div className="col-9 mb-5">
							<div className="p-4 card h-100">
								<h3 className="font-weight-normal mb-3 pl-1">Profiles</h3>
								<div className="table-responsive">
									<table className="table table-hover">
										<thead className="">
										<tr>
											<th scope="col" className="custom-avatar-column">Avatar</th>
											<th scope="col" className="custom-firstname-column">
												First name&nbsp;<Link className="text-muted" to="" onClick={this.sortByFirstName}><i className="fas fa-sort"/></Link>
											</th>
											<th scope="col" className="custom-lastname-column">
												Last name&nbsp;<Link className="text-muted" to="" onClick={this.sortByLastName}><i className="fas fa-sort"/></Link>
											</th>
											<th scope="col" className="custom-birthdate-column">
												Birthdate&nbsp;<Link className="text-muted" to="" onClick={this.sortByBirthDate}><i className="fas fa-sort"/></Link>
											</th>
											<th scope="col" className="custom-sex-column">
												Sex&nbsp;<Link className="text-muted" to="" onClick={this.sortBySex}><i className="fas fa-sort"/></Link>
											</th>
											<th scope="col" className="custom-profile-column">Profile</th>
										</tr>
										</thead>
										<tbody>
										{profiles.map((profile, index) => (
											<tr key={index}>
												<td className="">
													<img className="custom-avatar-users" src={profile.avatar ? `data:image/jpeg;base64,${profile.avatar}` : defaultAvatar} alt="avatar"/>
												</td>
												<td className="">{profile.firstName}</td>
												<td>{profile.lastName}</td>
												<td>{profile.birthDate || "-"}</td>
												<td>
													{profile.sex ? (profile.sex === "MALE"
														? <i className="custom-font-size-2 text-primary fas fa-male"/>
														: <i className="custom-font-size-2 custom-color-pink fas fa-female"/>
													) : "-"}
												</td>
												<td>
													<Link className="text-muted" to={`/profiles/${profile.id}`} target="_blank">
														<i className="custom-font-size-2 fas fa-eye"/>
													</Link>
												</td>
											</tr>
										))}
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div className="col-3 mb-5">
							<div className="p-4 card">
								<h3 className="font-weight-normal pl-1">Search</h3>
								<hr className="mt-3 mb-4 custom-bg-color-999"/>
								<form onSubmit={this.onSubmit}>
									<div className="form-group mb-0">
										<input type="text"
										       className="form-control form-control-lg custom-font-size-3 mb-4"
										       placeholder="First name"
										       name="firstName"
										       value={this.state.firstName}
										       onChange={this.onChange}/>
										<input type="text"
										       className="form-control form-control-lg custom-font-size-3 mb-4"
										       placeholder="Last name"
										       name="lastName"
										       value={this.state.lastName}
										       onChange={this.onChange}/>
										<DatePicker dateFormat="dd/MM/yyyy"
										            className="custom-datepicker custom-font-size-3 mb-4"
										            placeholderText="Birth date from"
										            isClearable={true}
										            maxDate={this.state.birthDateTo}
										            showYearDropdown
										            selected={this.state.birthDateFrom}
										            onChange={this.handleBirthDateFromChange}/>
										<DatePicker dateFormat="dd/MM/yyyy"
										            className="custom-datepicker custom-font-size-3 mb-4"
										            placeholderText="Birth date to"
										            isClearable={true}
										            minDate={this.state.birthDateFrom}
										            showYearDropdown
										            selected={this.state.birthDateTo}
										            onChange={this.handleBirthDateToChange}/>
										<Select value={selectedSex}
										        onChange={this.handleSelectSexChange}
										        options={optionsSex}
										        isClearable={true}
										        placeholder="Sex"
										        className="react-select-container mb-4 custom-margin-top"
										        classNamePrefix="react-select"/>
										<label className="text-muted d-block mt-4 mb-1">
											<input type="checkbox"
											       className="mr-2 custom-cursor-pointer"
											       name="hasPhoto"
											       checked={this.state.withPhoto}
											       onChange={this.handleCheckboxChange}/>Only with photo
										</label>
										<button type="submit" className="btn btn-primary mt-4">Submit</button>
										<button type="button" className="btn btn-secondary text-muted ml-2 mt-4" onClick={this.handleClear}>Clear</button>
									</div>
								</form>
							</div>
						</div>


					</div>
				</div>
			</main>
		);
	}
}

Users.propTypes = {
	getProfiles: PropTypes.func.isRequired,
	searchProfiles: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	profile: state.profile,
});

export default connect(
	mapStateToProps,
	{getProfiles, searchProfiles}
)(Users);