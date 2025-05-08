import React,{useState} from 'react'
import { login } from '../../service/auth'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({email:'', password:''})
    const [loading, setLoading] = useState(false)

    const handleChange = (e) =>{
        setForm({...form, 
            [e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        setLoading(true)

        try{
            const {email, password} = form;
            let res;

            res = await login(email, password);
            console.log(res)
            if(res?.token){
                localStorage.setItem('token', res.token)
                alert('Login successful');
                navigate('/dashboard');  
            }else{
                alert('Login failed: token not found')
            }
        }catch(error){
            alert("error message")
        }
        finally{
           setLoading(false)
        }
    }

  return (
    <div className="mt-20 w-full h-screen flex justify-center items-center ">
        <div className='bg-black w-full h-screen flex justify-center items-center p-10'>
            
            <img src="/assets/images/login-bg2.png" 
            alt="loginbg2" 
            className="hidden lg:flex justify-center items-center"/>
            <div className='absolute bg-[#5882C1]/80 w-[300px] h-[500px] md:w-[400px] md:h-[500px] rounded-4xl z-0'>
                
                <div className='pt-2 flex justify-center'>
                <img src="/assets/images/logobd.svg" alt="logobd" className='w-40 ' />
                
                </div>
                <div className='px-5 md:px-10'>
                    <h1 className='text-white text-[24px] font-bold justify-center md:justify-self-start'>Login</h1>
                    
                    <h2 className='text-white mt-5 mb-2'>Email</h2>
                    <input 
                    placeholder='username@gmail.com' 
                    type="email" 
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    className='bg-white w-65 md:w-80 h-10 rounded-md px-4'/>

                    <h2 className='text-white mt-5 mb-2'>Password</h2>
                    <input 
                    placeholder='password'
                    type="password" 
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                    className='bg-white w-65 md:w-80 h-10 rounded-md px-4'/>

                </div>
                <div className='flex justify-center  mt-10 '>
                    <button onClick={handleSubmit} className='bg-[#003465] text-white w-65 md:w-80 h-10 rounded-md cursor-pointer '>Sign in</button>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Login