import React, { useState } from "react";

const ProjectPost = () => {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    demo_url: "",
    github_url: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("subtitle", form.subtitle);
    formData.append("description", form.description);
    formData.append("demo_url", form.demo_url);
    formData.append("github_url", form.github_url);
    formData.append("image_url", image); 

    try {
      const res = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ถ้ามี token
        },
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        alert("Project created successfully!");
        
        console.log(result);
      } else {
        throw new Error(result.message || "Failed to create project");
      }
    } catch (err) {
      console.error("Error submitting:", err);
      alert("Error submitting project");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-10 py-10 max-w-xl mx-auto space-y-4">
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
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full border p-2 rounded"
        required
      />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit Project
      </button>
    </form>
  );
};

export default ProjectPost;
