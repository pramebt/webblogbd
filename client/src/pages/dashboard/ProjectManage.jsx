import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../../service/project';
import { useNavigate } from 'react-router-dom';
import CardprojectManage from '../../components/common/CardprojectManage';

const ProjectManage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllProjects();
        setData(res || []);
      } catch (error) {
        console.error("Show project failed: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="px-10 w-full h-screen flex justify-center">
      <div className="h-fit grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-[20px] overflow-hidden shadow hover:shadow-lg transition-all duration-200"
            onClick={() => navigate('/project')}
          >
            <CardprojectManage item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManage;
