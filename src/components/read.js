import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Table } from "semantic-ui-react";
import axios from "axios";

export default function Read() {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://64d63b08754d3e0f1361cda6.mockapi.io/fakedata`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);
  const setData = (data) => {
    let { id, firstName, lastName, checkbox } = data;
    localStorage.setItem("ID", id);
    localStorage.setItem("First Name", firstName);
    localStorage.setItem("Last Name", lastName);
    localStorage.setItem("Checkbox Value", checkbox);
  };
  const onDelete = (id) => {
    axios
      .delete(`https://64d63b08754d3e0f1361cda6.mockapi.io/fakedata/${id}`)
      .then(() => {
        getData();
      });
  };
  const getData = () => {
    axios
      .get(`https://64d63b08754d3e0f1361cda6.mockapi.io/fakedata`)
      .then((getData) => {
        setAPIData(getData.data);
      });
  };
  return (
    <div>
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Checked</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {APIData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell>
                  {data.checkbox ? "Checked" : "Unchecked"}
                </Table.Cell>
                <Table.Cell>
                  <Link to="https://emp-records.vercel.app/update">
                    <Button onClick={() => setData(data)}>Update</Button>
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Button onClick={() => onDelete(data.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}
