const API_BASE = import.meta.env.VITE_API_URL;

export const fetcher = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    const res = await fetch(`${API_BASE}/api${url}`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : undefined,
            ...options.headers,
        },
        ...options,
    });
    
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }
    return data;
}