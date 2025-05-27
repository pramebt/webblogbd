import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProjectEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // รับ project id จาก URL param
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    demo_url: "",
    github_url: "",
  });
  const [image, setImage] = useState(null); // สำหรับรูปใหม่
  const [oldImageUrl, setOldImageUrl] = useState(""); // แสดงรูปเดิม

  // 🔄 โหลดข้อมูลโปรเจกต์เดิม
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setForm({
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            demo_url: data.demo_url,
            github_url: data.github_url,
          });
          setOldImageUrl(data.image_url);
        } else {
          alert("Failed to load project");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Failed to load project");
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));

    if (image) {
      formData.append("image_url", image); // ถ้ามีรูปใหม่
    } else {
      formData.append("old_image_url", oldImageUrl); // ส่งชื่อรูปเดิมไว้ด้วย
    }

    try {
      const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Project updated successfully!");
        navigate("/dashboard");
      } else {
        throw new Error(result.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating project:", err);
      alert("Error updating project");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-10 py-10 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Edit Project</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="text"
        name="subtitle"
        placeholder="Subtitle"
        value={form.subtitle}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        type="url"
        name="demo_url"
        placeholder="Demo URL"
        value={form.demo_url}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input
        type="url"
        name="github_url"
        placeholder="GitHub URL"
        value={form.github_url}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <div>
        <p className="text-gray-600">Current Image:</p>
        {oldImageUrl && <img src={oldImageUrl} alt="Old" className="w-48 mb-2" />}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProjectEdit;
