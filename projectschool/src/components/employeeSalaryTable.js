import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Spinner } from "react-bootstrap";

const EmployeeSalaryTable = () => {
  const [salaries, setSalaries] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    basicSalary: "",
    hra: 0,
    travel: 0,
    telephone: 0,
    pf: 0,
    total: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // NEW

  const fetchSalaries = async () => {
    try {
      const token = localStorage.getItem("token"); // Move inside to ensure it's available
      const res = await fetch("/api/employeesalary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setSalaries(data.data);
      } else {
        alert("Error fetching data: " + data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false); // End loading regardless of result
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  const calculateFields = (basic) => {
    const basicSalary = parseFloat(basic) || 0;
    const hra = basicSalary * 0.2;
    const travel = basicSalary * 0.1;
    const telephone = basicSalary * 0.05;
    const pf = basicSalary * 0.12;
    const total = basicSalary + hra + travel + telephone - pf;
    return { hra, travel, telephone, pf, total };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (name === "basicSalary") {
      updatedData = { ...updatedData, ...calculateFields(value) };
    }

    setFormData(updatedData);
  };

  const handleSubmit = async () => {
    const { id, name, basicSalary } = formData;

    if (!name || !basicSalary) {
      alert("Please enter employee name and basic salary");
      return;
    }

    const method = id ? "PUT" : "POST";
    const url = id
      ? `/api/employeesalary/${id}`
      : `/api/employeesalary`;

    const calc = calculateFields(basicSalary);

    const payload = {
      ...formData,
      ...calc,
      basicSalary: parseFloat(basicSalary),
    };

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        fetchSalaries();
        setShowModal(false);
        setFormData({
          id: null,
          name: "",
          basicSalary: "",
          hra: 0,
          travel: 0,
          telephone: 0,
          pf: 0,
          total: 0,
        });
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.error("Save failed:", err);
      alert("An error occurred while saving.");
    }
  };

  const handleEdit = (salary) => {
    setFormData(salary);
    setShowModal(true);
  };

  const handleAdd = () => {
    setFormData({
      id: null,
      name: "",
      basicSalary: "",
      hra: 0,
      travel: 0,
      telephone: 0,
      pf: 0,
      total: 0,
    });
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee Salary Management</h2>
      <Button variant="primary" onClick={handleAdd}>
        Add Employee Salary
      </Button>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Basic</th>
              <th>HRA</th>
              <th>Travel</th>
              <th>Telephone</th>
              <th>PF</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.name}</td>
                <td>{emp.basicSalary}</td>
                <td>{emp.hra}</td>
                <td>{emp.travel}</td>
                <td>{emp.telephone}</td>
                <td>{emp.pf}</td>
                <td>{emp.total}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(emp)}>
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Salary" : "Add Salary"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={formData.id !== null}
              />
            </Form.Group>
            <Form.Group controlId="formBasicSalary" className="mb-3">
              <Form.Label>Basic Salary</Form.Label>
              <Form.Control
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Text>HRA: {formData.hra}</Form.Text><br />
            <Form.Text>Travel: {formData.travel}</Form.Text><br />
            <Form.Text>Telephone: {formData.telephone}</Form.Text><br />
            <Form.Text>PF: {formData.pf}</Form.Text><br />
            <Form.Text>Total: {formData.total}</Form.Text>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeeSalaryTable;

