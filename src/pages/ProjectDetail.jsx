import { Overlay } from "../components/Overlay";
import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <div className="project-detail">
      <Overlay
        sliderKey="overlay-right"
        name="overlay-container overlay-container-right"
        data={{ projectID: id }}
      />
    </div>
  );
};

export default ProjectDetail;
