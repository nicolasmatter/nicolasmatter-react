import React, { useEffect, useState } from "react";

import { ProjectDetails } from "../components/ProjectDetails";
import client from "../client";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const PARAMS = `*[_type=="projects" && projectID == "${id}"][0]`;
      try {
        const response = await client.fetch(PARAMS);
        setProjectData(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, [id]);

  return (
    <div className="project-detail">
      <ProjectDetails data={projectData} />
    </div>
  );
};

export default ProjectDetail;
