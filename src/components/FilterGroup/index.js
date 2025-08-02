import "./index.css"

const FilterGroup = props => {
    const {isFilterActive, firstNameFilter, departmentFilter, roleFilter, onChangeFirstName, onChangeDepartment, onChangeRole, onSubmitFilterForm, onClickReset} = props

    const onApplyFilter = event => onSubmitFilterForm(event)
    

    const onClickResetButton = () => onClickReset()

    const onChangeFirstNameFilter = event => onChangeFirstName(event.target.value)

    const onChangeDepartmentFilter = event => onChangeDepartment(event.target.value)

    const onChangeRoleFilter = event => onChangeRole(event.target.value)

    const displayFilterGroup = isFilterActive ? "" : "hide-filter"

    return (
        <div className={`filter-group-bg-container ${displayFilterGroup}`}>
            <form className="filter-group-container"  onSubmit={onApplyFilter}>
                <p className="filter-employees-heading">Filter Employees</p>
                <div className="filter-input-container">
                    <label className="filter-type-label" htmlFor="first name">First Name: </label>
                    <input type="search" className="filter-input-text" value={firstNameFilter} id="first name" onChange={onChangeFirstNameFilter} />
                </div>
                <div className="filter-input-container">
                    <label className="filter-type-label" htmlFor="department">Department: </label>
                    <input type="search" className="filter-input-text" value={departmentFilter} id="department" onChange={onChangeDepartmentFilter} />
                </div>
                <div className="filter-input-container">
                    <label className="filter-type-label" htmlFor="role">Role: </label>
                    <input type="search" className="filter-input-text" value={roleFilter} id="role" onChange={onChangeRoleFilter} />
                </div>
                <div className="filter-buttons-container">
                    <button type="submit" className="apply-button">Apply</button>
                    <button type="button" className="apply-button" onClick={onClickResetButton}>Reset</button>
                </div>
            </form>
        </div>
    )
}

export default FilterGroup