import React, { useContext, useEffect, useState } from "react";
// useParams grabs parameters of the url to use in the component
import { useHistory, useParams } from "react-router-dom";
import { LocationContext } from "./LocationProvider.js";
import "./Location.css";

export const LocationDetail = () => {
    const { getLocationById, removeLocation } = useContext(LocationContext);

    // This is one location so it is an object, not an array
    const [location, setLocation] = useState({});

    // useParams returns an object based off the key (locationId) for example
    const {locationId} = useParams();

    const history = useHistory();

    const handleRemoving = () => {
      removeLocation(location.id)
      .then(() => history.push("/locations"));
  };

  useEffect(() => {
    getLocationById(locationId)
    .then((response) => setLocation(response));
    }, // eslint-disable-next-line
    []);

  return (
    <section className="location">
      <h3 className="location__name">{location.name}</h3>
      <div className="location__address">Address: {location.address}</div>
      <div className="location__employees">
          <h4 className="location__employees__header">Employees</h4>
          <div className="location__employees__names">
            {location.employees?.map(employee => employee.name).join(", ")}
          </div>
      </div>
      <div className="location__animals">
          <h4 className="location__animals__header">Animals</h4>
          <div className="location__animals__names">
            {location.animals?.map(animal => animal.name).join(", ")}
          </div>
      </div>
      <button onClick={handleRemoving}>Remove Location</button>
      <button onClick={() => {
          history.push(`/locations/edit/${location.id}`)
      }}>Edit</button>
    </section>
  );
};