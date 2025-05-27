import React from "react";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 py-8">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-0 relative overflow-hidden flex flex-col">
        

        {/* ปุ่มปิด */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-3xl font-light z-10"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        {/* เนื้อหา */}
        <div className="px-8 pt-8 pb-6 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold mb-1 text-gray-900">{project.title}</h2>
          {project.subtitle && (
            <p className="text-gray-600 mb-4">{project.subtitle}</p>
          )}

          {project.image_url && (
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full rounded-xl mb-5 border border-[#eaaa3c] shadow-sm"
            />
          )}

          <p className="text-gray-800 mb-6 whitespace-pre-line">{project.description}</p>

          {/* ลิงก์ */}
          <div className="flex flex-row justify-center gap-4">
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-[#eaaa3c]/80 hover:bg-[#eaaa3c] px-4 py-2 rounded-3xl text-white font-semibold shadow transition"
              >
                <img 
                  src="/assets/icons/play-icon.svg" 
                  alt="play"
                  className="w-7 h-7" />
                Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-black/80 hover:bg-black px-4 py-2 rounded-3xl text-white font-semibold shadow transition"
              >
                <img
                  src="/assets/icons/github-icon.svg" 
                  alt="GitHub" 
                  className="w-7 h-7" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
