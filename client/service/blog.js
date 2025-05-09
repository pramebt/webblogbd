import { fetcher } from "./api";
export const blogs = async () => 
    fetcher('/blogs',{
        method: 'GET'
    })

export const getBlogById = async ({id}) => 
    fetcher(`/blogs/${id}`,{
        method: 'GET'
        
    })