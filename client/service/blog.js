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

