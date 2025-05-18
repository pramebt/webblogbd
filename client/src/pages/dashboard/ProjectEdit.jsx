import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectById, updateProjectById } from "../../../service/project";

const ProjectEdit = () => {
  const { id } = useParams();
  const projectId = parseInt(id, 10);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image_url: "",
    demo_url: "",
    github_url: "",
    
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProjectById({ id: projectId });
        const data = res.data ?? res;

        setForm({
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
          image_url: data.image_url || "",
          demo_url: data.demo_url || "",
          github_url: data.github_url || "",
          
        });
      } catch (err) {
        console.error("Error fetching project:", err);
        alert("Failed to load project data");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProjectById(projectId, form);
      alert("Project updated successfully");
      navigate("/dashboard/project/manage");
    } catch (error) {
      console.error("Update error", error);
      alert("Failed to update the project");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Title */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Title</label>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring"
          placeholder="Enter title"
          required
        />
      </div>

      {/* Subtitle */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Subtitle</label>
        <input
          name="subtitle"
          type="text"
          value={form.subtitle}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring"
          placeholder="Enter subtitle"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring h-24"
          placeholder="Enter description"
          required
        />
      </div>

      {/* Image URL */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Image URL</label>
        <input
          name="image_url"
          type="url"
          value={form.image_url}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Demo URL */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">Demo URL</label>
        <input
          name="demo_url"
          type="url"
          value={form.demo_url}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring"
          placeholder="https://your-demo-site.com"
        />
      </div>

      {/* GitHub URL */}
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700">GitHub URL</label>
        <input
          name="github_url"
          type="url"
          value={form.github_url}
          onChange={handleChange}
          className="border rounded p-2 focus:outline-none focus:ring"
          placeholder="https://github.com/username/project"
        />
      </div>

      

      {/* Submit */}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Update Project
      </button>
    </form>
  );
};

export default ProjectEdit;
