import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBlogById } from "../../../../service/blog";

const Post = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    blocks: [{ type: "", data: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlockChange = (index, field, value) => {
    const newBlocks = [...form.blocks];
    newBlocks[index][field] = value;
    setForm((prev) => ({ ...prev, blocks: newBlocks }));
  };

  const addBlock = () => {
    setForm((prev) => ({
      ...prev,
      blocks: [...prev.blocks, { type: "", data: "" }],
    }));
  };

  const removeBlock = (index) => {
    setForm((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title, description, blocks } = form;
      const res = await postBlogById(title, description, blocks);
      console.log(res);
      alert("Post submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Submission error", error);
    }
  };

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

      {/* Blocks */}
      <div className="flex flex-col space-y-4">
        <label className="text-gray-700">Blocks</label>
        {form.blocks.map((block, index) => (
  <div
    key={index}
    className="border rounded p-4 flex flex-col gap-2 bg-gray-50 relative"
  >
    {/* Type ด้านบน */}
    <div>
      <label className="mb-1 text-gray-600 block">Type</label>
      <select
        value={block.type}
        onChange={(e) =>
          handleBlockChange(index, "type", e.target.value)
        }
        className="border rounded p-2 appearance-none focus:outline-none focus:ring w-full"
        required
      >
        <option value="" disabled>
          Choose type
        </option>
        <option value="header">Header</option>
        <option value="paragraph">Paragraph</option>
        <option value="code">Code</option>
      </select>
    </div>
    {/* Data */}
    <div>
      <label className="mb-1 text-gray-600 block">Data</label>
      <textarea
        value={block.data}
        onChange={(e) =>
          handleBlockChange(index, "data", e.target.value)
        }
        className="border rounded p-2 focus:outline-none focus:ring w-full h-20"
        placeholder="Enter block data"
        required
      />
    </div>
    {/* Remove button */}
    <button
      type="button"
      onClick={() => removeBlock(index)}
      className="absolute top-2 right-2 text-red-500 hover:underline text-sm"
    >
      Remove
    </button>
  </div>
))}
        <button
          type="button"
          onClick={addBlock}
          className="self-start px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Block
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Submit Post
      </button>
    </form>
  );
};

export default Post;
