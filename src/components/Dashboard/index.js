import { Component } from "react";
import { Link } from "react-router-dom";
import {RingLoader} from "react-spinner" 

import "./index.css"
import Header from "../Header"
import Footer from "../Footer"
import EmployeeListItem from "../EmployeeListItem"
import FilterGroup from "../FilterGroup"
import Pagination from "../Pagination"

const apisStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
}

class Dashboard extends Component {
    state = {employeesList: JSON.parse(localStorage.getItem("Employees List")) || [], filteredList: [], isFilterGroupClicked: false, isFilterActive: false, searchInput: "", sortType: "none", firstNameFilter: "", departmentFilter: "", roleFilter: "", pageNo: 1, apiStatus: apisStatusConstants.initial}


    componentDidMount () {
        this.getEmployeeslist()
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState.employeesList !== this.state.employeesList) {
            localStorage.setItem("Employees List", JSON.stringify(this.state.employeesList))
        }
    }

    getEmployeeslist = () => {
        this.setState({apiStatus: apisStatusConstants.inProgress})

        const employeesDetails = JSON.parse(localStorage.getItem("Employees List"))

        this.setState({employeesList: employeesDetails, apiStatus: apisStatusConstants.success})
    }

    onClickFilter = () => {this.setState(prevState => ({isFilterActive: !prevState.isFilterActive}))}

    onChangeFirstName = eventType => {this.setState({firstNameFilter: eventType})}

    onChangeDepartment = eventType => {this.setState({departmentFilter: eventType})}

    onChangeRole = eventType => {this.setState({roleFilter: eventType})}

    onSubmitFilterForm = filterEvent => {
        filterEvent.preventDefault()

        const {employeesList, searchInput, pageNo, firstNameFilter, departmentFilter, roleFilter} = this.state
        const upperLimit = pageNo * 8

        let currentEmployeesList = employeesList.slice(upperLimit-8, upperLimit)
        currentEmployeesList = currentEmployeesList.filter(eachEmployee => (eachEmployee.name ?? '').toLowerCase().includes(searchInput.toLowerCase()))
        const filtererdEmployeesList = currentEmployeesList.filter(eachEmployee => {
            const firstName = eachEmployee.name.split(" ")[0]

            const matchesName = firstNameFilter? firstName.toLowerCase().includes(firstNameFilter.toLowerCase()): false;

            const matchesDept = departmentFilter? eachEmployee.department.toLowerCase() === departmentFilter.toLocaleLowerCase(): false;

            const matchesRole = roleFilter? eachEmployee.role.toLowerCase().includes(roleFilter.toLowerCase()): false;

            // Include only if at least one is true
            return matchesName || matchesDept || matchesRole;
        })

        this.setState({filteredList: filtererdEmployeesList, isFilterGroupClicked: true})
    }

    onClickReset = () => {
        this.setState({firstNameFilter: "", departmentFilter: "", roleFilter: "", isFilterGroupClicked: false})
    }

    onClickSearch = inputText => {this.setState({searchInput: inputText})}

    onChangeSortType = event => {
        const {employeesList, pageNo} = this.state
        const upperLimit = pageNo * 8
        const lowerLimit = (pageNo - 1) * 8
        const sortField = event.target.value
        const newEmployeesList = [...employeesList]

        if (sortField === "firstName") {
            newEmployeesList.sort((a, b) => {
                const x = a.name.split(" ")[0]?.toLowerCase() ?? ""
                const y = b.name.split(" ")[0]?.toLowerCase() ?? ""
                return x < y ? -1 : x > y ? 1 : 0
            })
        }
        else if (sortField !== 'none') {
            newEmployeesList.sort((a, b) => {
                const x = a[sortField]?.toLowerCase() ?? ""
                const y = b[sortField]?.toLowerCase() ?? ""
                return x < y ? -1 : x > y ? 1 : 0
            })
        }
        this.setState({employeesList: newEmployeesList.slice(lowerLimit, upperLimit), sortType: sortField})
    }

    onClickPrev = () => {
        const {pageNo} = this.state
        
        if (pageNo > 1) {
            this.setState(prevState => ({pageNo: prevState.pageNo - 1}))
        }
    }

    onClickNext = () => {
        const {pageNo, employeesList} = this.state
        const lastPage = Math.ceil(employeesList.length / 8)

        if (pageNo < lastPage) {
            this.setState(prevState => ({pageNo: prevState.pageNo + 1}))
        }

    }

    onClickDelete = employeeId => {
        this.setState(prevState => {
            const currentEmployeesList = prevState.employeesList.filter(eachEmployee => eachEmployee.id !== employeeId)
            return {employeesList: currentEmployeesList}
        })
    }

    renderLoaderView = () => (
        <RingLoader color="#36d7b7"  size={30} />
    )

    renderSuccessView = () => {
        const {employeesList, searchInput, pageNo, filteredList, isFilterGroupClicked} = this.state
        const upperLimit = pageNo * 8

        let currentEmployeesList

        if (isFilterGroupClicked) {
            currentEmployeesList = filteredList
        }
        else {
            currentEmployeesList = employeesList.slice(upperLimit-8, upperLimit)
        }

        currentEmployeesList = currentEmployeesList.filter(eachEmployee => (eachEmployee.name ?? '').toLowerCase().includes(searchInput.toLowerCase()))

        return (
            <ul className="employees-list-container">
                {currentEmployeesList.map(eachEmployee => 
                    <EmployeeListItem employeeDetails={eachEmployee} key={eachEmployee.id} onClickDelete={this.onClickDelete} />
                )}
            </ul>
        )
    }

    renderStatusView = () => {
        const {apiStatus} = this.state
        console.log(apiStatus)
    
        switch (apiStatus) {
          case apisStatusConstants.success:
            return this.renderSuccessView()
          case apisStatusConstants.inProgress:
            return this.renderLoaderView()
          default:
            return null
        }
      }

    render() {
        const {employeesList, isFilterActive, searchInput, sortType, pageNo, firstNameFilter, departmentFilter, roleFilter} = this.state
        const upperLimit = pageNo * 8

        let currentEmployeesList = employeesList.slice(upperLimit-8, upperLimit)
        currentEmployeesList = currentEmployeesList.filter(eachEmployee => (eachEmployee.name ?? '').toLowerCase().includes(searchInput.toLowerCase()))
        const dashboardFullwidth = isFilterActive ? "compress-container" : ""
        const totalPages = Math.ceil(employeesList.length / 8)

        return (
            <div className="dashboard-bg-container">
                <div className={`dashboard-container ${dashboardFullwidth}`}>
                    <Header onClickFilter={this.onClickFilter} onClickSearch={this.onClickSearch} searchInput={searchInput} />
                    <div className="sorting-container">
                        <div className="sorting-type-container">
                            <label className="sorting-label">Sort:</label>
                            <select className="select-sort" value={sortType} onChange={this.onChangeSortType}>
                                <option className="sort-type" value="firstName">First Name</option>
                                <option className="sort-type" value="department">Department</option>
                                <option className="sort-type" value="role">Role</option>
                                <option className="sort-type" value="none">None</option>
                            </select>
                            <label className="sorting-label">Show:</label>
                            <select className="select-sort" >
                                <option className="sort-type" checked>10</option>
                            </select>
                        </div>
                        <Link to="/employeeform" target="_blank">
                            <button type="button" className="add-button">Add Employee</button>
                        </Link>
                    </div>
                    {this.renderStatusView()}
                    <Pagination pageNo={pageNo} totalPages={totalPages} onClickPrev={this.onClickPrev} onClickNext={this.onClickNext} />
                    <Footer />
                </div>
                <FilterGroup 
                    isFilterActive={isFilterActive} 
                    currentEmployeesList={currentEmployeesList} 
                    firstNameFilter={firstNameFilter} 
                    departmentFilter={departmentFilter} 
                    roleFilter={roleFilter}
                    onChangeFirstName={this.onChangeFirstName}
                    onChangeDepartment={this.onChangeDepartment}
                    onChangeRole= {this.onChangeRole}
                    onSubmitFilterForm={this.onSubmitFilterForm}
                    onClickReset={this.onClickReset}
                />
            </div>
        )
    }
}

export default Dashboard