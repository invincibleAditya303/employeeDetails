import "./index.css"

const EmployeeListItem = props => {
    const {employeeDetails} = props
    const {name, email, department, role} = employeeDetails
    return (
        <li className="employee-list-item-container">
            <h3 className="employee-name">{name}</h3>
            <p className="employee-name">Email:<span className="employee-details">{email}</span></p>
            <p className="employee-name">Department:<span className="employee-details">{department}</span></p>
            <p className="employee-name">Role:<span className="employee-details">{role}</span></p>
            <div className="buttons-container">
                <button className="click-button">Edit</button>
                <button className="click-button">Delete</button>
            </div>
        </li>
    )
}
export default EmployeeListItem