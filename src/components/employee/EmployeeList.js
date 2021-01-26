/* import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./Employee"
import "./Employee.css"

export const EmployeeList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("EmployeeList: useEffect - getEmployees")
    getEmployees()

  }, [])


  return (
    <div className="employees">
      {console.log("EmployeeList: Render", employees)}
      {
        employees.map(employee => {
          return <EmployeeCard key={employee.id} employee={employee} />
        })
      }
    </div>
  )
} */

/* import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { EmployeeCard } from "./EmployeeCard"
import "./Employee.css"
import { useHistory } from "react-router-dom"

export const EmployeeList = () => {
    const { employees, getEmployees } = useContext(EmployeeContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const history = useHistory()

    useEffect(() => {
        console.log("employeeList: Initial render before data")
        getLocations()
        .then(getCustomers)
        .then(getEmployees)
    }, [])

    

 
      return(
        <div className="Employees">
          <h2>Employees</h2>
		      <button onClick={() => {history.push("/employees/create")}}>
            Add Employee
          </button>
        
        {
        employees.map(employee => {
              const owner = customers.find(c => c.id === employee.customerId)
              const location = locations.find(l => l.id === employee.locationId)

        
              return <EmployeeCard key={employee.id}
                location={location}
                customer={owner}
                employee={employee} />
        })
          }
        </div>
    )
} */

import React, { useContext, useEffect } from "react"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./EmployeeCard"
import "./Employee.css"
import { useHistory } from "react-router-dom"
import { LocationContext } from "../location/LocationProvider"

export const EmployeeList = () => {
  // This state changes when `getAnimals()` is invoked below
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  //useEffect - reach out to the world for something
  useEffect(() => {
    console.log("EmployeeList: useEffect - getemployees")
    getLocations()
    .then(getEmployees)

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const history = useHistory()

  return (
        <>
            <h2>Employees</h2>
                <button onClick={() => {history.push("/employees/create")}}>
                    Add Employee
                </button> 
            <div className="employees">
            {console.log(locations)}
            {
                employees.map(employee => {
                    const clinic = locations.find(l => l.id === employee.locationId)

                    return <EmployeeCard key={employee.id}        
                                location={clinic}
                                employee={employee} />
                })
            }
            </div>
        </>
  )
}