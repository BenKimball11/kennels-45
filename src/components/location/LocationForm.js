import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { LocationContext } from "./LocationProvider";
import "./Location.css";


export const LocationForm = () => {
    const { addLocation, getLocationById, updateLocation } = useContext(LocationContext);

    // For edit, hold on to state of location in this view
    // You need an initial state for it to allow you to edit it
    const [location, setLocation] = useState({
      name: "",
      address: ""
    });

    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {locationId} = useParams();
    
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
      //When changing a state object or array,
      //always create a copy make changes, and then set state.
      const newLocation = { ...location };

      //location is an object with properties.
      //set the property to the new value
      newLocation[event.target.name] = event.target.value;
      
      //update state
      setLocation(newLocation);
    };

    const handleSaveLocation = () => {
      if (parseInt(location.name || location.address) === "") {
          window.alert("Please fill out the name and address fields")
      } else {
        //disable the button - no extra clicks
        setIsLoading(true);
        if (locationId){
          //PUT - update
          updateLocation({
              id: location.id,
              name: location.name,
              address: location.address
          })
          .then(() => history.push(`/locations/detail/${location.id}`))
        }else {
          //POST - add
          addLocation({
              name: location.name,
              address: location.address
          })
          .then(() => history.push("/locations"))
        };
      };
    };

    // Get locations. If locationId is in the URL, getLocationById
    useEffect(() => {
        if (locationId){
          getLocationById(locationId)
          .then(location => {
              setLocation(location);
              setIsLoading(false);
          })
        } else {
          setIsLoading(false);
        }
    }, // eslint-disable-next-line
    []);

    //since state controlls this component, we no longer need
    //useRef(null) or ref

    return (
      <form className="locationForm">
        <h2 className="locationForm__title">{locationId ? <>Edit Location</> : <>New Location</>}</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="locationName">Location name: </label>
            <input type="text" id="locationName" name="name" required autoFocus className="form-control"
            placeholder="Location name"
            onChange={handleControlledInputChange}
            defaultValue={location.name}/>
          </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="locationAddress">Location Address: </label>
                <input type="text" id="locationAddress" name="address" required className="form-control"
                placeholder="Location address"
                onChange={handleControlledInputChange}
                defaultValue={location.address} />
            </div>
        </fieldset>
        <button className="btn btn-primary"
          disabled={isLoading}
          onClick={event => {
            event.preventDefault(); // Prevent browser from submitting the form and refreshing the page
            handleSaveLocation();
          }}>
        {locationId ? <>Save Location</> : <>Add Location</>}</button>
      </form>
    );
};