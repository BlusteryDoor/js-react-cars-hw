import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "./DriverList.css";
import { DriversContext } from "./../../contexts/DriversContext";

function DriverList() {
  const {
    fetchDriver,
    deleteDriver,
    loading,
    error,
    cars,
  } = useContext(DriversContext);

  useEffect(() => {
    fetchDriver();
  }, [fetchDriver]);

  return (
    <section className="driver-list-section">
      <div className="container">
        <h1 className="section-heading">Driver List</h1>
        {/* <Loading show={loading} /> */}
        {loading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
        {cars?.length ? (
          <ul className="driver-list">
            {cars.map(({ _id, firstname, lastname, age, email }) => (
              <li key={_id} className="driver-list-item">
                <Link to={`/cars/update/${_id}`} className="update-link">Update</Link>
                <button onClick={() => deleteDriver(_id)} className="delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        ) : <p>No drivers to display</p>}
      </div>
    </section>
  );
}

export default DriverList;
