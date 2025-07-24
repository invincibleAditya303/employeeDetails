import { Link } from "react-router-dom"

import "./index.css"

const EmployeeListItem = props => {
    const {employeeDetails, onClickDelete} = props
    const {id, name, email, department, role} = employeeDetails
    const onClickDeleteButton = () => onClickDelete(id)
    return (
        <li className="employee-list-item-container">
            <h3 className="employee-name">{name}</h3>
            <p className="employee-name">Email: <span className="employee-details">{email}</span></p>
            <p className="employee-name">Department: <span className="employee-details">{department}</span></p>
            <p className="employee-name">Role: <span className="employee-details">{role}</span></p>
            <div className="buttons-container">
                <Link to={`/employeeform/${id}`} target="_blank">
                    <button className="click-button">Edit</button>
                </Link>
                <button className="click-button" onClick={onClickDeleteButton}>Delete</button>
            </div>
        </li>
    )
}
export default EmployeeListItem