import { fetcher } from "./api";

export const login = async (email, password) => 
    fetcher('/login',{
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
