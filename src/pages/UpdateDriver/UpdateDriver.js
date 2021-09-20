import React, { useContext } from "react";
import { useParams, useHistory} from "react-router-dom";
import { useToasts } from 'react-toast-notifications';
import DriverForm from "./../../components/DriverForm/DriverForm";
import { DriversContext } from "./../../contexts/DriversContext";
import ErrorBoundary from "./../../components/ErrorBoundary/ErrorBoundary";
import MainLayout from "../../layouts/MainLayout";

import "./UpdateDriver.css";

function UpdateDriver() {
  let { id } = useParams();
  let history = useHistory();
  const { drivers } = useContext(DriversContext);
  const { addToast } = useToasts();
  const driverToBeUpdated = drivers.find(({ _id }) => _id === id);

  if (!driverToBeUpdated) {
    addToast(`Error: cannot find car with id ${id}. Redirecting...`, {
      appearance: "error",
    });
    history.push("/");
    return null;
  }

  return (
    <MainLayout>
      <h1>Update Driver</h1>
      <ErrorBoundary>
        <DriverForm driver={driverToBeUpdated} />
      </ErrorBoundary>
    </MainLayout>
  );
}

export default UpdateDriver;
