import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams } from "react-router-dom";
import { EmployeeContext } from "./EmployeeProvider.js";
import "./Employee.css";

export const EmployeeDetail = () => {
    const { getEmployeeById, fireEmployee } = useContext(EmployeeContext);

    const [employee, setEmployee] = useState({});

    const {employeeId} = useParams();
    
    const history = useHistory();

    const handleFiring = () => {
      fireEmployee(employee.id)
      .then(() => history.push("/employees"));
  };

  useEffect(() => {
    getEmployeeById(employeeId)
    .then((response) => setEmployee(response));
    }, 
    []);

  return (
    <section className="employee">
      <h3 className="employee__name">{employee.name}</h3>
      <div className="employee__location">
        <div className="employee__location__name">Location: {employee.location?.name}</div>
        <div className="employee__location__address">Address: {employee.location?.address}</div>
      </div>
      <button onClick={handleFiring}>Fire Employee</button>
      <button onClick={() => {
          history.push(`/employees/edit/${employee.id}`)
      }}>Edit</button>
    </section>
  );
};