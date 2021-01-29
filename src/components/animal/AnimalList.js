import React, { useContext, useEffect } from "react"
import { AnimalContext } from "./AnimalProvider"
import { LocationContext } from "../location/LocationProvider"
import { CustomerContext } from "../customer/CustomerProvider"
import { AnimalCard } from "./AnimalCard"
import "./Animal.css"
import { useHistory } from "react-router-dom"

export const AnimalList = () => {
    const { animals, getAnimals } = useContext(AnimalContext)
    const { locations, getLocations } = useContext(LocationContext)
    const { customers, getCustomers } = useContext(CustomerContext)
    const history = useHistory()

    useEffect(() => {
        console.log("AnimalList: Initial render before data")
        getLocations()
        .then(getCustomers)
        .then(getAnimals)
    }, [])

    

 
      return(
        <div className="animals">
          <h2>Animals</h2>
		      <button onClick={() => {history.push("/animals/create")}}>
            Add Animal
          </button>
        
        {
        animals.map(animal => {
              const owner = customers.find(c => c.id === animal.customerId)
              const location = locations.find(l => l.id === animal.locationId)

        
              return <AnimalCard key={animal.id}
                location={location}
                customer={owner}
                animal={animal} />
        })
          }
        </div>
    )
}


/* Users can login or register a new account
Users can have the option to go through previous logs 
The user would first be able to select the date of the workout
Users would be able to add a title 
The user could then journal in a text area about whatever they would like to concerning the workout
Users could then have the option to record any weights being used to allow users to go back and see how they have improved/not improved
The user would be able to have the option to select a number of preset moods so users could go back and see how they have progressed
Users would have the option to store all entries in a database 
 */