import React, { createContext, useState } from "react";
import { useToasts } from "react-toast-notifications";

export const DriversContext = createContext({
  fetchDrivers: () => [],
  addDriver: () => {},
  updateDriver: () => {},
  deleteDriver: () => {},
  loaded: false,
  loading: false,
  error: null,
  drivers: [],
});

export const DriversProvider= (props) => {
  const [drivers, setDrivers] = useState(() => {
    return JSON.parse(localStorage.getItem('drivers')) || [];
  });
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const { addToast } = useToasts();

  const DRIVERS_ENDPOINT = "https://carsapp2050.herokuapp.com/api/v1/drivers/";

  const fetchDrivers = async () => {
    if (loading || loaded || error) {
      return;
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch(DRIVERS_ENDPOINT);
      if (response.status !== 200) {
        throw response;
      }
      const data = await response.json();
      localStorage.setItem('drivers', JSON.stringify(data));
      setDrivers(data);

    } catch (err) {
      setError(err.message || err.statusText);
    } finally {
      setLoading(false);
      setLoaded(true);
    }
  };

  const addDriver = async (formData) => {
    console.log('about to add', formData);
    try {
      const response = await fetch(DRIVERS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.status !== 201) {
        throw response;
      }
      const savedDriver = await response.json();
      console.log("got data", savedDriver);
      const newDrivers = [...drivers, savedDriver];
      localStorage.setItem('drivers', JSON.stringify(newDrivers));
      setDrivers(newDrivers);
    } catch (err) {
      console.log(err);
      addToast(`Error ${err.message || err.statusText}`, {
        appearance: "error",
      });
    }
  };

  const updateDriver = async (id, updates) => {
    console.log('updating', id, updates);
    let updatedDriver = null;
    try {
      const response = await fetch(`${DRIVERS_ENDPOINT}${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });
      if (response.status !== 200) {
        throw response;
      }
      const index = drivers.findIndex((driver) => driver._id === id);
      console.log(index)

      const oldDriver = drivers[index];
      console.log('oldDriver', oldDriver);
      updatedDriver = {
        ...oldDriver,
        ...updates, 
      };
      console.log('updatedCar', updatedDriver);
      const updatedDrivers = [
        ...drivers.slice(0, index),
        updatedDriver,
        ...drivers.slice(index + 1),
      ];
      localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
      setDrivers(updatedDrivers);
    } catch (err) {
      console.log(err);
      addToast(
        `Error: Failed to update ${updatedDriver.firstname}`,
        {
          appearance: "error",
        }
      );
    }
  };

  const deleteDriver = async (id) => {
    let deletedDriver = null;
    try {
      const response = await fetch(`${DRIVERS_ENDPOINT}${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status !== 204) {
        throw response;
      }
      const index = drivers.findIndex((driver) => driver._id === id);
      deletedDriver = drivers[index];
      const updatedDrivers = [...drivers.slice(0, index), ...drivers.slice(index + 1)];
      localStorage.setItem('drivers', JSON.stringify(updatedDrivers));
      setDrivers(updatedDrivers);
      console.log(`Deleted ${deletedDriver.firstname}`);
    } catch (err) {
      console.log(err);
      addToast(
        `Error: Failed to update ${deletedDriver.firstname}`,
        {
          appearance: "error",
        }
      );
    }
  };

  return (
    <DriversContext.Provider
      value={{
        drivers,
        loading,
        error,
        fetchDrivers,
        addDriver,
        updateDriver,
        deleteDriver,
      }}
    >
      {props.children}
    </DriversContext.Provider>
  );
};
