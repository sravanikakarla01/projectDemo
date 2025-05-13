import React from "react";
import SyllabusCard from "./SyllabusCard";

const syllabusData = [
  {
    className: "Class 1",
    description: "Introduction to alphabets, numbers, colors, animals, and basic moral stories.",
    image: "/images/class1.jpg",
  },
  {
    className: "Class 2",
    description: "Basic sentence formation, simple addition/subtraction, and fun science facts.",
    image: "/images/class2.jpg",
  },
  {
    className: "Class 3",
    description: "Grammar basics, multiplication tables, plant and animal life, festivals of India.",
    image: "/images/class3.jpg",
  },
  {
    className: "Class 4",
    description: "Paragraph writing, division, environmental awareness, and state-wise culture.",
    image: "/images/class4.jpg",
  },
  {
    className: "Class 5",
    description: "Essay writing, fractions, water cycle, India's freedom struggle.",
    image: "/images/class5.jpg",
  },
  {
    className: "Class 6",
    description: "English comprehension, decimals, ancient civilizations, solar system.",
    image: "/images/class6.jpg",
  },
  {
    className: "Class 7",
    description: "Tenses, basic algebra, geography of India, human body systems.",
    image: "/images/class7.jpg",
  },
  {
    className: "Class 8",
    description: "Essay writing, linear equations, history of Indian constitution, force and motion.",
    image: "/images/class8.jpg",
  },
  {
    className: "Class 9",
    description: "Advanced grammar, geometry, democracy, Newton’s laws, atoms & molecules.",
    image: "/images/class9.jpg",
  },
  {
    className: "Class 10",
    description: "Board exam prep: Literature, Trigonometry, Modern History, Physics, and Chemistry.",
    image: "/images/class10.jpg",
  },
];

const SyllabusList = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 fw-bold text-dark">📘 Student Syllabus (Class 1 to 10)</h2>
      <div className="row">
        {syllabusData.map((item, index) => (
          <SyllabusCard
            key={index}
            className={item.className}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default SyllabusList;
