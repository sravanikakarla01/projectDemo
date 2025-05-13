
import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap"; // React-Bootstrap
import { classDetails } from './classdata'; // Importing class data from the external file
// import "./Home.css"; // Assuming you have a stylesheet for custom styles

const ClassDetails = () => {
    const [selectedClass, setSelectedClass] = useState(null); // State for selected class details

    const handleClassClick = (classId) => {
        // Find the class details based on the ID clicked
        const classInfo = classDetails.find((classItem) => classItem.id === classId);
        setSelectedClass(classInfo); // Set the selected class to display its details
    };

    return (
        <div>
            <div className="class-details-container">
                {/* Class Selection Section */}
                <section className="class-selection-section">
                    <div className="section-header">
                        <h3>Select Class</h3>
                        <Button variant="link">View all</Button>
                    </div>
                    <div className="class-selection-grid">
                        {classDetails.map((classInfo) => (
                            <div
                                key={classInfo.id}
                                className="class-card"
                                onClick={() => handleClassClick(classInfo.id)}
                            >
                                <h6>{classInfo.className}</h6>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Class Details Section */}
                {selectedClass && (
                    <section className="class-details">
                        <h3>{selectedClass.className} - Class Details</h3>
                        <Row>
                            <Col md={6}>
                                <h5>Teacher: {selectedClass.teacher}</h5>
                                <h5>Contact: {selectedClass.contact}</h5>
                                <h5>Class Timings: {selectedClass.timings}</h5>
                            </Col>
                            <Col md={6}>
                                <h5>Students:</h5>
                                <ul>
                                    {selectedClass.students.map((student, index) => (
                                        <li key={index}>{student}</li>
                                    ))}
                                </ul>
                            </Col>
                        </Row>
                        {/* Timetable */}
                        <h5>Timetable:</h5>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Time</th>
                                    <th>Subject</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedClass.timetable.map((timetableItem, index) => (
                                    <tr key={index}>
                                        <td>{timetableItem.time}</td>
                                        <td>{timetableItem.subject}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ClassDetails;
