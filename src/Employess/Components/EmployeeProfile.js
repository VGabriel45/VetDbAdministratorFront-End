import React, { useEffect, useState } from "react";
import axios from "axios";
import authHeader from "../../Services/auth-header";
import { useHistory, userHistory } from "react-router-dom";

import { Link } from "react-router-dom";

export default function EmployeeProfile(props) {
  const [employee, setEmployee] = useState({});
  const history = useHistory();

  const {
    match: { params },
  } = props;
  const employeeId = params.employeeId;

  async function getEmployee() {
    await axios
      .get(`http://localhost:8080/employees/${employeeId}`, {
        headers: authHeader(),
      })
      .then((res) => setEmployee(res.data));
  }

  async function deleteEmployee() {
    await axios.delete(
      `http://localhost:8080/employees/${employeeId}`,
      { headers: authHeader() },
      {
        data: { employee },
      }
    );
    history.push("/dash");
  }

  async function updateEmployee() {
    await axios.put(
      `http://localhost:8080/employees/${employeeId}`,
      {
        employee,
      },
      { headers: authHeader() }
    );
  }

  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div>
      First name: {employee.firstName}
      <br />
      Last name : {employee.lastName}
      <br />
      Gender : {employee.gender}
      <br />
      Address: {employee.address}
      <br />
      Phone number: {employee.phoneNumber}
      <br />
      Contract started on: {employee.contractStartingDate}
      <br />
      Contract ends on: {employee.contractEndingDate}
      <br />
      Currently working as an {employee.role}
      <br />
      Current salary: {employee.salary}$
      <br />
      <button className="btn btn-danger" onClick={deleteEmployee}>
        Delete
      </button>
      <button className="btn btn-warning" onClick={updateEmployee}>
        Edit
      </button>
    </div>
  );
}
