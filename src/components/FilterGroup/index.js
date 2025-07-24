import { Component } from "react"

import "./index.css"

class FilterGroup extends Component {
    state = {employeesList: [], firstNameFilter: "", departmentFilter: "", roleFilter: ""}

    componentDidMount () {
        const employeesDetails = JSON.parse(localStorage.getItem("Employees List"))

        this.setState({employeesList: employeesDetails})
    }

    onApplyFilter = event => {
        event.preventDefault()

        let {currentEmployeesList} = this.props
        const {firstNameFilter, departmentFilter, roleFilter} = this.state
        const filtererdEmployeesList = currentEmployeesList.filter(eachEmployee => {
            const firstName = eachEmployee.name.split(" ")[0]

            const matchesName = firstNameFilter
            ? firstName.toLowerCase().includes(firstNameFilter.toLowerCase())
            : false;

        const matchesDept = departmentFilter
            ? eachEmployee.department.toLowerCase() === departmentFilter.toLocaleLowerCase()
            : false;

        const matchesRole = roleFilter
            ? eachEmployee.role.toLowerCase().includes(roleFilter.toLowerCase())
            : false;

        // Include only if at least one is true
        return matchesName || matchesDept || matchesRole;
        })

        currentEmployeesList = filtererdEmployeesList
        console.log(currentEmployeesList)
    }

    onClickReset = () => {
        const employeesDetails = JSON.parse(localStorage.getItem("Employees List"))
        this.setState({employeesList: employeesDetails, firstNameFilter: "", departmentFilter: "", roleFilter: ""})
    }

    onChangeFirstName = event => {this.setState({firstNameFilter: event.target.value})}

    onChangeDepartment = event => {this.setState({departmentFilter: event.target.value})}

    onChangeRole = event => {this.setState({roleFilter: event.target.value})}

    render() {
        const {firstNameFilter, departmentFilter, roleFilter} = this.state
        const {isFilterActive} = this.props
        const displayFilterGroup = isFilterActive ? "" : "hide-filter"

        return (
            <div className={`filter-group-bg-container ${displayFilterGroup}`}>
                <form className="filter-group-container"  onSubmit={this.onApplyFilter}>
                    <p className="filter-employees-heading">Filter Employees</p>
                    <div className="filter-input-container">
                        <label className="filter-type-label" htmlFor="first name">First Name: </label>
                        <input type="search" className="filter-input-text" value={firstNameFilter} id="first name" onChange={this.onChangeFirstName} />
                    </div>
                    <div className="filter-input-container">
                        <label className="filter-type-label" htmlFor="department">Department: </label>
                        <input type="search" className="filter-input-text" value={departmentFilter} id="department" onChange={this.onChangeDepartment} />
                    </div>
                    <div className="filter-input-container">
                        <label className="filter-type-label" htmlFor="role">Role: </label>
                        <input type="search" className="filter-input-text" value={roleFilter} id="role" onChange={this.onChangeRole} />
                    </div>
                    <div className="filter-buttons-container">
                        <button type="submit" className="apply-button">Apply</button>
                        <button type="button" className="apply-button" onClick={this.onClickReset}>Reset</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default FilterGroup