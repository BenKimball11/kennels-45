import React, { useState, createContext } from "react"

// The context is imported and used by individual components that need data
// createContext() makes an object with properties
export const LocationContext = createContext();

// This component establishes what data can be used.
export const LocationProvider = (props) => {
    const [locations, setLocations] = useState([])

    const getLocations = () => {
        return fetch("http://localhost:8088/locations?_embed=employees&_embed=animals")
        .then(res => res.json())
        .then(setLocations);
    };

    const getLocationById = (id) => {
        return fetch(`http://localhost:8088/locations/${id}?_embed=employees&_embed=animals`)
            .then(res => res.json());
    };

    const addLocation = locationObj => {
        return fetch("http://localhost:8088/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(locationObj)
        })
        .then(getLocations);
    };

    const updateLocation = location => {
        return fetch(`http://localhost:8088/locations/${location.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(location)
        })
          .then(getLocations);
      };

    const removeLocation = locationId => {
        return fetch(`http://localhost:8088/locations/${locationId}`, {
            method: "DELETE"
        })
        .then(getLocations);
    };

    // Subcomponent that renders a subset of itself called a Provider
    // Provider = Interface that other components can use in order to gain access
    // to what the provider holds.
    return (
        <LocationContext.Provider value={{locations, getLocations, getLocationById, addLocation, updateLocation, removeLocation}}>
            {props.children}
        </LocationContext.Provider>
    );
};