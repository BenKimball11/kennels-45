import React from "react"
import "./Location.css"
import { Link } from "react-router-dom"

export const LocationCard = ({location}) => {
    return (
    <section className="location">
        <h3 className="location__name">         
        <Link to={`/locations/detail/${location.id}`}>
          { location.name }
        </Link>
        </h3>
        <div className="location__address"> {location.address} </div>
    </section>
)}

/* import React from "react"
import "./Animal.css"
import { Link } from "react-router-dom"


export const AnimalCard = ({ animal }) => {
  return (
    <section className="animal">
      <h3 className="animal__name">
        <Link to={`/animals/detail/${animal.id}`}>
          { animal.name }
        </Link>
      </h3>
      <div className="animal__breed">{ animal.breed }</div>
  </section>
)} */