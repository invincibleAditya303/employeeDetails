import { Component } from "react";
import {v4 as uuidv4} from "uuid"

import "./index.css"

import EmployeeListItem from "../EmployeeListItem"

const mockEmployees = [
    {
        id: uuidv4(),
        name: "Alice Smith",
        email: "alice@example.com",
        Department: "HR",
        Role: "Developer"
    },
    {
        id:uuidv4(),
        name: "Bob Jhonson",
        email: "bob@example.com",
        Department: "IT",
        Role: "Manager"
    },
    {
        id: uuidv4(),
        name: "Charlie Lee",
        email: "charlie@example.com",
        Department: "Finance",
        Role: "Analyst"
    }
]
console.log(mockEmployees)

class Dashboard extends Component {
    state = {employeesList: mockEmployees}

    render () {
        const {employeesList} = this.state

        return (
            <div className="dashboard-bg-container">
                <div className="sorting-container">
                    <div className="sorting-type-container">
                        <label className="sorting-label">Sort:</label>
                        <select className="select-sort">
                            <option className="sort-type">First Name</option>
                            <option className="sort-type">Department</option>
                        </select>
                        <label className="sorting-label">Show:</label>
                        <select className="select-sort" >
                            <option className="sort-type" checked>10</option>
                        </select>
                    </div>
                    <button type="button" className="add-button">Add Employee</button>
                </div>
                <ul className="employees-list-container">
                    {employeesList.map(eachEmployee => 
                        <EmployeeListItem employeeDetails={eachEmployee} id={eachEmployee.id} />
                    )}
                </ul>
            </div>
        )
    }
}

export default Dashboard