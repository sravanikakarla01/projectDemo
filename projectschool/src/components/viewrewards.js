import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const rewardsData = [
  {
    image: "/class5.jpg",
    title: "Cricket Championship",
    description: "Our Class 5 students won the Inter-School Cricket Tournament and secured 1st prize at the national level.",
  },
  {
    image: "/class6.jpg",
    title: "Kabaddi Tournament",
    description: "Our school team dominated the Kabaddi regional league and achieved 1st place in the inter-district games.",
  },
  {
    image: "/class7.jpg",
    title: "Tennis Match Winner",
    description: "Students performed excellently in the Tennis Championship and secured international 1st place.",
  },
  {
    image: "/class8.jpeg",
    title: "Hockey Tournament",
    description: "Isha School's hockey team earned 2nd prize in the state-level Hockey tournament.",
  },
  {
    image: "/class9.jpg",
    title: "Badminton Victory",
    description: "The school team ranked 1st in the International School Badminton League.",
  },
];

const ViewRewards = () => {
  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">🏆 Students' Prize Distribution Highlights</h2>
      <div className="row">
        {rewardsData.map((reward, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card shadow-sm h-100">
              <img src={reward.image} className="card-img-top" alt={reward.title} />
              <div className="card-body">
                <h5 className="card-title">{reward.title}</h5>
                <p className="card-text">{reward.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRewards;

