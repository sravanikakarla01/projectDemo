// import React, { useEffect, useState } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';

// const HolidayList = () => {
//   const [holidays, setHolidays] = useState([]);
//   const [form, setForm] = useState({ date: '', description: '', day: '' });
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchHolidays();
//   }, []);

//   const fetchHolidays = () => {
//     fetch('http://localhost:5000/api/holidays')
//       .then(res => res.json())
//       .then(data => setHolidays(data));
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toISOString().split('T')[0]; // YYYY-MM-DD
//   };

//   const getDayName = (dateStr) => {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { weekday: 'long' });
//   };

//   const handleChange = e => {
//     const { name, value } = e.target;
//     let updated = { ...form, [name]: value };

//     if (name === 'date') {
//       updated.day = getDayName(value);
//     }

//     setForm(updated);
//   };

//   const handleSave = () => {
//     const url = 'http://localhost:5000/api/holidays';
//     fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     })
//       .then(res => res.json())
//       .then(() => {
//         fetchHolidays();
//         setForm({ date: '', description: '', day: '' });
//         setShowModal(false);
//       });
//   };

//   const handleDelete = date => {
//     fetch(`http://localhost:5000/api/holidays/${date}`, {
//       method: 'DELETE',
//     })
//       .then(res => res.json())
//       .then(() => {
//         setHolidays(holidays.filter(h => h.date !== date));
//       });
//   };

//   const handleEdit = holiday => {
//     setForm({ ...holiday });
//     setShowModal(true);
//   };

//   const handleAddNew = () => {
//     setForm({ date: '', description: '', day: '' });
//     setShowModal(true);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="text-primary">Holiday List 2025</h2>
//         <Button variant="success" onClick={handleAddNew}>Add Holiday</Button>
//       </div>

//       <Table striped bordered hover responsive>
//         <thead className="table-dark">
//           <tr>
//             <th>Date</th>
//             <th>Description</th>
//             <th>Day</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {holidays.map(holiday => (
//             <tr key={holiday.date}>
//               <td>{formatDate(holiday.date)}</td>
//               <td>{holiday.description}</td>
//               <td>{holiday.day}</td>
//               <td>
//                 <Button size="sm" variant="warning" onClick={() => handleEdit(holiday)}>Edit</Button>{' '}
//                 <Button size="sm" variant="danger" onClick={() => handleDelete(holiday.date)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal Form */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>{form.date ? 'Edit Holiday' : 'Add Holiday'}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="holidayDate" className="mb-3">
//               <Form.Label>Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="date"
//                 value={form.date}
//                 onChange={handleChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="holidayDescription" className="mb-3">
//               <Form.Label>Festival Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="description"
//                 value={form.description}
//                 onChange={handleChange}
//                 placeholder="Enter holiday/festival name"
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="holidayDay" className="mb-3">
//               <Form.Label>Day</Form.Label>
//               <Form.Control
//                 type="text"
//                 name="day"
//                 value={form.day}
//                 readOnly
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleSave}>Save</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default HolidayList;
import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import './holidayList.css'; // Import custom styles

const HolidayList = () => {
  const [holidays, setHolidays] = useState([]);
  const [form, setForm] = useState({ date: '', description: '', day: '' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = () => {
    fetch('http://localhost:5000/api/holidays')
      .then(res => res.json())
      .then(data => setHolidays(data));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    let updated = { ...form, [name]: value };

    if (name === 'date') {
      updated.day = getDayName(value);
    }

    setForm(updated);
  };

  const handleSave = () => {
    const url = 'http://localhost:5000/api/holidays';
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => res.json())
      .then(() => {
        fetchHolidays();
        setForm({ date: '', description: '', day: '' });
        setShowModal(false);
      });
  };

  const handleDelete = date => {
    fetch(`http://localhost:5000/api/holidays/${date}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        setHolidays(holidays.filter(h => h.date !== date));
      });
  };

  const handleEdit = holiday => {
    setForm({ ...holiday });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setForm({ date: '', description: '', day: '' });
    setShowModal(true);
  };

  return (
    <div className={`container mt-5 ${showModal ? 'blur-background' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Holiday List 2025</h2>
        <Button variant="success" onClick={handleAddNew}>Add Holiday</Button>
      </div>

      <div className="table-container border rounded shadow-sm">
        <Table striped bordered hover responsive className="mb-0">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map(holiday => (
              <tr key={holiday.date}>
                <td>{formatDate(holiday.date)}</td>
                <td>{holiday.description}</td>
                <td>{holiday.day}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(holiday)}>Edit</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(holiday.date)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>{form.date ? 'Edit Holiday' : 'Add Holiday'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="holidayDate" className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="holidayDescription" className="mb-3">
              <Form.Label>Festival Name</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter holiday/festival name"
                required
              />
            </Form.Group>
            <Form.Group controlId="holidayDay" className="mb-3">
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="text"
                name="day"
                value={form.day}
                readOnly
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HolidayList;
