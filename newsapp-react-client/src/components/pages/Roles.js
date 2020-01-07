import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAllPermissions, getAllRoles, createRole, deleteRole, updateRole} from "../../actions/rolesActions";
import Select from 'react-select';

class Roles extends Component {

	state = {
		selectedOption: null,
		showModal: false,
		name: "",
		nameValid: false,
		selectedCheckboxes: []
	};

	componentDidMount() {
		this.props.getAllPermissions(this.props.history);
		this.props.getAllRoles(this.props.history);
	}

	onChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value}, () => {
			this.validateField(name, value)
		});
	}

	validateField = (name, value) => {
		let nameValid = this.state.nameValid;
		const {roles} = this.props.roles;
		const roleNames = roles.map(function (role) {
			return role.name;
		});
		switch (name) {
			case "name":
				if (!value)
					nameValid = false;
				else
					nameValid = !roleNames.includes(value);
				break;
			default:
				break;
		}
		this.setState({nameValid: nameValid});
	};

	handleSelectChange = selectedOption => {
		this.setState({selectedOption});
		if (selectedOption)
			this.setChecked(selectedOption.permissions);
	};

	setChecked = (permissions) => {
		let checkedCheckboxes = this.state.selectedCheckboxes;
		document.getElementsByName('check').forEach(x => {
			x.checked = permissions.includes(x.value);
			if (x.checked)
				checkedCheckboxes.push(x.value);
		});
		this.setState({selectedCheckboxes: checkedCheckboxes});
	};

	checkboxChangeHandle(e) {
		const value = e.target.value;
		const checked = e.target.checked;
		let checkedCheckboxes = this.state.selectedCheckboxes;
		if (checked)
			checkedCheckboxes.push(value);
		else
			checkedCheckboxes = checkedCheckboxes.filter(e => e !== value);
		this.setState({selectedCheckboxes: checkedCheckboxes});
	}

	clearAllCheckboxes = () => {
		document.getElementsByName('check').forEach(x => x.checked = false);
	};

	createRoleModalHandle = () => {
		this.setState({showModal: !this.state.showModal, name: ""});
	};

	createRole = () => {
		const newRole = {
			name: this.state.name
		};
		this.props.createRole(newRole);
		this.createRoleModalHandle();
	};

	deleteRoleHandle = () => {
		this.props.deleteRole(this.state.selectedOption.value);
		this.setState({selectedOption: null});
	};

	updateRole = () => {
		const updatedRole = {
			name: this.state.selectedOption.label,
			permissions: this.state.selectedCheckboxes
		};
		this.props.updateRole(this.state.selectedOption.value, updatedRole);
		this.setState({selectedOption: null, selectedCheckboxes: []});
		this.clearAllCheckboxes();
	};

	render() {
		const {permissions} = this.props.roles;
		const {roles} = this.props.roles;
		const options = roles.map(role => ({
			label: `${role.name}`,
			value: `${role.id}`,
			permissions: `${role.permissions}`
		}));
		const {selectedOption, showModal} = this.state;
		const {currentPermissions} = this.props.security;
		const createEditRoleDisabled = !(currentPermissions.includes("ROLE_ROLE_READ") && currentPermissions.includes("ROLE_ROLE_EDIT"));
		const deleteRoleDisabled = currentPermissions.includes("ROLE_ROLE_DELETE") ? !this.state.selectedOption : true;

		return (
			<main>
				<div className="container custom-div-height">
					<div className="row">


						{/*Modal for create new role (with one input)*/}
						<div className={`modal overflow-auto ${showModal === true ? 'd-block' : ''}`}>
							<div className="custom-modal-wrapper"/>
							<div className="modal-dialog modal-dialog-centered">
								<div className="modal-content">
									<div className="modal-header">
										<h4 className="modal-title font-weight-normal">Create new role</h4>
										<button className="close" onClick={this.createRoleModalHandle}><span
											aria-hidden="true">&times;</span></button>
									</div>
									<div className="modal-body custom-modal font-weight-normal">
										<input type="text"
										       className="form-control form-control-lg"
										       placeholder="Enter role name..."
										       name="name"
										       value={this.state.name}
										       onChange={this.onChange.bind(this)}/>
									</div>
									<div className="modal-footer">
										<button className="btn btn-secondary" onClick={this.createRoleModalHandle}>
											Close
										</button>
										<button className="btn btn-primary" disabled={!this.state.nameValid} onClick={this.createRole}>
											Submit
										</button>
									</div>
								</div>
							</div>
						</div>

						<div className="col-12">
							<h1 className="text-center font-weight-light my-4">Roles</h1>
							<hr className="mb-4"/>
						</div>

						<div className="col-12 mb-4">
							<div className="row align-items-center">
								<div className="col-4">
									<Select value={selectedOption}
									        onChange={this.handleSelectChange}
									        options={options}
									        isClearable={true}
									        isDisabled={createEditRoleDisabled}
									        placeholder="SELECT ROLE..."
									        className="react-select-container-roles"
									        classNamePrefix="react-select-roles"/>
								</div>
								<div className="col-8">
									<button type="button" className="btn btn-success" onClick={this.createRoleModalHandle} disabled={createEditRoleDisabled}>
										Create Role
									</button>
									<button type="button" className="btn btn-danger ml-3" disabled={deleteRoleDisabled} onClick={this.deleteRoleHandle}>
										Delete Role
									</button>
								</div>
							</div>
						</div>

						<div className="col-12">
							<div className="row">
								<div className="col-8 mb-5">
									<div className="p-4 card h-100">
										<h3 className="font-weight-normal mb-4">Permissions:</h3>
										{permissions.map((permission, index) => (
											<div className="text-muted mt-3 mb-0 ml-2" key={index}>
												<label className="custom-cursor-pointer mb-0">
													<input type="checkbox"
													       className="mr-2 custom-cursor-pointer"
													       name="check"
													       value={permission}
													       disabled={!this.state.selectedOption}
													       onChange={this.checkboxChangeHandle.bind(this)}/>
													<span>{permission}</span>
												</label>
											</div>
										))}
										<hr className="my-4"/>
										<div>
											<button type="button" className="btn btn-info" onClick={this.updateRole}>Update Role</button>
										</div>
									</div>
								</div>
								<div className="col-4 mb-5">
									<div className="p-4 card h-100">
										<h3 className="font-weight-normal mb-0">Roles:</h3>
										{roles.map((role, index) => (
											<div className="mt-4" key={index}>
												<h4 className="my-0 font-weight-normal text-muted">{role.name}</h4>
												{role.permissions.map((permission, index) => (
													<p className="text-muted mt-2 mb-0 ml-4 pl-2" key={index}>{permission}</p>
												))}
											</div>
										))}
									</div>
								</div>
							</div>
						</div>


					</div>
				</div>
			</main>
		);
	}
}

Roles.propTypes = {
	getAllPermissions: PropTypes.func.isRequired,
	getAllRoles: PropTypes.func.isRequired,
	createRole: PropTypes.func.isRequired,
	deleteRole: PropTypes.func.isRequired,
	updateRole: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	roles: state.roles,
	security: state.security
});

export default connect(
	mapStateToProps,
	{getAllPermissions, getAllRoles, createRole, deleteRole, updateRole}
)(Roles);