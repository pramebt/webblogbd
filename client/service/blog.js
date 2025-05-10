import { fetcher } from "./api";
export const blogs = async () => 
    fetcher('/blogs',{
        method: 'GET'
    })

export const getBlogById = async ({id}) => 
    fetcher(`/blogs/${id}`,{
        method: 'GET'
        
    })

export const postBlogById = async (title,description,blocks) => 
    fetcher('/blogs',{
        method: 'POST',
        body: JSON.stringify({ title,description,blocks })
    })

// เพิ่มฟังก์ชัน Edit Blog
export const editBlogById = async (id, title, description, blocks) =>
    fetcher(`/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, blocks })
    });

// เพิ่มฟังก์ชัน Delete Blog
export const deleteBlogById = async (id) =>
    fetcher(`/blogs/${id}`, {
        method: 'DELETE'
    });