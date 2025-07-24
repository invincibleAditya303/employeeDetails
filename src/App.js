import { BrowserRouter, Switch, Route } from "react-router-dom";
import {v4 as uuidv4} from "uuid";

import Dashboard from "./components/Dashboard";
import EmployeeForm from "./components/EmployeeForm";

const employeesList = [
    {
        id: uuidv4(),
        name: "Alice Smith",
        email: "alice@example.com",
        department: "HR",
        role: "Developer"
    },
    {
        id:uuidv4(),
        name: "Bob Jhonson",
        email: "bob@example.com",
        department: "IT",
        role: "Manager"
    },
    {
        id: uuidv4(),
        name: "Charlie Lee",
        email: "charlie@example.com",
        department: "Finance",
        role: "Analyst"
    }
]
console.log(employeesList)

if (!localStorage.getItem("Employees List")) {
  localStorage.setItem("Employees List", JSON.stringify(employeesList))
}

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/employeeform" component={EmployeeForm} />
      <Route exact path="/employeeform/:id" component={EmployeeForm} />
    </Switch>
  </BrowserRouter>
)

export default App;