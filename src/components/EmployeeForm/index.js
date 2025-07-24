import { Component } from "react"
import {v4 as uuidv4} from "uuid"

import "./index.css"

class EmployeeForm extends Component {
    state = {employeesList: JSON.parse(localStorage.getItem("Employees List")) || [], form: { id: '', name: '', email: '', department: '', role: '' }, isSuccess: false, isEdited: false, isError: false}

    componentDidMount () {
        this.getEmployeesList()
    }

    componentDidUpdate (prevProps, prevState) {
        if (prevState.employeesList !== this.state.employeesList) {
            localStorage.setItem("Employees List", JSON.stringify(this.state.employeesList))
        }
    }


    getEmployeesList = () => {
        const employeesDetails = JSON.parse(localStorage.getItem("Employees List"))
        const {match} = this.props
        const {params} = match
        const {id} = params

        const employee = employeesDetails.find(e => e.id === id)

        if (employee) {
            const nameArr = employee.name.split(" ")
            const firstName = nameArr[0]
            const lastName = nameArr[1]
            this.setState({form: {...employee, firstName, lastName}})
        }
        this.setState({employeesList: employeesDetails})
    }

    onSubmitEmployeeForm = event => {
        event.preventDefault()
    
        const {form} = this.state
        const {firstName, lastName, email, department, role} = form
        const name = firstName + " " + lastName

        const {match} = this.props
        const {params} = match
        const {id} = params

        if (id !== undefined) {
            this.setState(prevState => ({
                employeesList: prevState.employeesList.map(eachEmployee => {
                    if (eachEmployee.id === id) {
                        return {...eachEmployee, name, email, department, role}
                    }
                    return {...eachEmployee}
                }), isEdited: true
            }))
        } else {
            if (firstName !== "" && lastName !== "" && email !== "" && department !== "" && role !== "") { 
                    
                const newEmployee = {id: uuidv4(), name, email, department, role}
                    

                this.setState(prevState => ({employeesList: [...prevState.employeesList, newEmployee], isSuccess: true, form: {firstName: "", lastName: "", email: "", department: "", role: ""}}))
            } else {
                this.setState({isError: true})
            }
        }
    }

    onChangeFirstname = event => {this.setState(prevState => ({form: {...prevState.form, firstName: event.target.value}}))}

    onChangeLastname = event => {this.setState(prevState => ({form : {...prevState.form, lastName: event.target.value}}))}

    onChangeEmail = event => {this.setState(prevState =>({form: {...prevState.form, email: event.target.value}}))}

    onChangeDepartment = event => {this.setState(prevState => ({form: {...prevState.form,department: event.target.value}}))}

    onChangeRole = event => {this.setState(prevState => ({form: {...prevState.form,role: event.target.value}}))}

    render() {
        const {form, isSuccess, isEdited, isError} = this.state
        console.log(isError)
        const {firstName, lastName, email, department, role} = form

        return (
            <div className="employee-bg-container">
                <form className="employee-form-container" onSubmit={this.onSubmitEmployeeForm}>
                    <h1 className="add-employee-title">Add Employee</h1>
                    <div className="add-employee-input-container">
                        <label htmlFor="first name" className="add-employee-label-heading">First name</label>
                        <input type="text" className="add-employee-input-text" value={firstName} id="first name" onChange={this.onChangeFirstname} />
                    </div>
                    <div className="add-employee-input-container">
                        <label htmlFor="last name" className="add-employee-label-heading">Last name</label>
                        <input type="text" className="add-employee-input-text" value={lastName} id="last name" onChange={this.onChangeLastname} />
                    </div>
                    <div className="add-employee-input-container employee-sub-details-container">
                        <div className="add-employee-email-input-container">
                            <label htmlFor="email" className="add-employee-label-heading">Email</label>
                            <input type="text" className="add-employee-input-text" value={email} id="email" onChange={this.onChangeEmail} />
                        </div>
                        <div className="add-employee-email-input-container">
                            <label htmlFor="department" className="add-employee-label-heading">Department</label>
                            <select className="department-select-container" id="department" value={department} onChange={this.onChangeDepartment}>
                                <option value=""></option>
                                <option className="employee-select-option-text" value="IT">IT</option>
                                <option className="employee-select-option-text" value="Finance">Finance</option>
                                <option className="employee-select-option-text" value="HR">HR</option>
                            </select>
                        </div>
                    </div>
                    <div className="add-employee-email-input-container email-mobile-container">
                        <label htmlFor="email" className="add-employee-label-heading">Email</label>
                        <input type="text" className="add-employee-input-text" value={email} id="email" onChange={this.onChangeEmail} />
                    </div>
                    <div className="add-employee-email-input-container email-mobile-container ">
                        <label htmlFor="department" className="add-employee-label-heading">Department</label>
                        <select className="department-select-container" id="department" value={department} onChange={this.onChangeDepartment}>
                            <option value=""></option>
                            <option className="employee-select-option-text" value="IT">IT</option>
                            <option className="employee-select-option-text" value="Finance">Finance</option>
                            <option className="employee-select-option-text" value="HR">HR</option>
                        </select>
                    </div>
                    <div className="add-employee-input-container">
                        <label htmlFor="role" className="add-employee-label-heading">Role</label>
                        <select className="department-select-container" id="role" value={role} onChange={this.onChangeRole}>
                            <option value=""></option>
                            <option className="employee-select-option-text" value="Developer">Developer</option>
                            <option className="employee-select-option-text" value="Analyst">Analyst</option>
                            <option className="employee-select-option-text" value="Manager">Manager</option>
                        </select>
                    </div>
                    <div className="add-employee-buttons-container">
                        <button className="add-employee-button">Cancel</button>
                        <button className="add-employee-button employee-submit-button">Submit</button>
                    </div>
                    {isSuccess && <p className="success-text">Employee added successfully</p>}
                    {isEdited && <p className="success-text">Employee details edited successfully</p>}
                    {isError && <p className="failure-text">Please fill all Input fields</p>}
                </form>
            </div>
        )
    }
}

export default EmployeeForm