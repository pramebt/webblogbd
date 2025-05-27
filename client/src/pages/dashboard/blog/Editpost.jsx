import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlogById, editBlogById } from '../../../../service/blog'

const Editpost = () => {
  const { id } = useParams()
  const blogId = parseInt(id, 10)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    description: '',
    blocks: [{ type: '', data: '' }]
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getBlogById({ id: blogId })
        const data = res.data ?? res
        setForm({
          title: data.title || '',
          description: data.description || '',
          blocks: Array.isArray(data.blocks) && data.blocks.length
            ? data.blocks
            : [{ type: '', data: '' }]
        })
      } catch (err) {
        console.error('Error fetching blog:', err)
        alert('Failed to load blog data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [blogId])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleBlockChange = (index, field, value) => {
    setForm(prev => ({
      ...prev,
      blocks: prev.blocks.map((blk, i) =>
        i === index ? { ...blk, [field]: value } : blk
      )
    }))
  }
  
  const addBlock = () =>
    setForm(previousForm => {
      const newBlock = { type: '', data: '' }
      return {
        ...previousForm,
        blocks: [...previousForm.blocks, newBlock],
      }
    })

  const removeBlock = (index) =>
    setForm(prevForm => {
      const newBlocks = prevForm.blocks.filter((_, i) => i !== index)
      return { ...prevForm, blocks: newBlocks }
    })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await editBlogById(blogId, form.title, form.description, form.blocks)
      alert('Blog updated successfully')
      navigate('/dashboard')
    } catch (error) {
      console.error('Update error', error)
      alert(`Failed to update the blog: ${error.message}`)
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

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
          <div key={index} className="border rounded-lg p-4 flex flex-col gap-2 bg-gray-50 relative">
            {/* Remove button ขวาบน */}
            <button
              type="button"
              onClick={() => removeBlock(index)}
              className="absolute top-2 right-2 text-red-500 hover:underline text-sm"
            >
              Remove
            </button>
            {/* Type dropdown ด้านบน */}
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
                <option value="image">Image</option>
                <option value="code">Code</option>
              </select>
            </div>
            {/* Data textarea */}
            <div>
              <label className="mb-1 text-gray-600 block">Data</label>
              <textarea
                value={block.data}
                onChange={e => handleBlockChange(index, 'data', e.target.value)}
                className="border rounded p-2 focus:outline-none focus:ring w-full h-20"
                placeholder="Enter block data"
                required
              />
            </div>
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
        Update Post
      </button>
    </form>
  )
}

export default Editpost;