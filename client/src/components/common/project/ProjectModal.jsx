import React from "react";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-10 py-10">
      <div className="bg-white max-w-lg w-full rounded-xl shadow-lg p-6 relative">
        {/* ปุ่มปิด */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
        <p className="text-gray-600 mb-4">{project.subtitle}</p>
        {project.image_url && (
          <img
            src={project.image_url}
            alt="project"
            className="w-full rounded-lg mb-4"
          />
        )}
        <p className="text-gray-800 mb-4">{project.description}</p>

        {/* ลิงก์ */}
        <div className="flex flex-row justify-center gap-5">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-row items-center justify-center bg-blue-400 gap-2 px-2 py-1 rounded-4xl text-white font-semibold"
            >
              <img 
                src="/assets/icons/play-icon.svg" 
                alt="play"
                className="w-10" />
              Demo
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="flex flex-row items-center justify-center bg-black gap-2 px-2 py-1 rounded-4xl text-white font-semibold"
            >
              <img
                src="/assets/icons/github-icon.svg" 
                alt="GitHub" 
                className="w-10" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
