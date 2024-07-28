import { useState } from 'react'
import { useForm } from "react-hook-form"
import {  useNavigate } from 'react-router-dom';
import './Home.css'
import Navbar from './Navbar'
function Home() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm()

    const navigate = useNavigate()

    const delay = (d) => {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve()
            }, d * 1000);
        })
    }
    const onSubmit = async (data) => {
        await delay(2)
        //if username does not contains a number we throw error
        if (!data.uname.match(/\d/)) {
            setError('uname', {
                type: 'custom',
                message: '*Username must contain a number',
            })
            return
        }
        let r = await fetch("http://localhost:3000/", { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
        let res = await r.text()
        console.log(data, res)
        navigate('/final')
    }
    return (
        <>
            <div className='main w-[60vw] h-[90vh] bg-red-400 m-auto mt-[5vh] rounded-xl relative' >
                <>{isSubmitting && <div className="loader"></div>}</>
                <Navbar />
                <form action="" onSubmit={handleSubmit(onSubmit)} >
                    <div className="names  w-[98%] mx-auto my-10 relative">
                        <div className='border w-[100px]  h-[120px] float-right mx-10  p-1 bg-black'><img src="https://stvincentdepaulbend.org/wp-content/uploads/2016/08/dummy-prod-1.jpg" className='w-[100%] h-[100%]' alt="" /></div>
                        <div className="flex flex-col gap-5">
                            <div className='flex'>
                                <label htmlFor="fname" className='underline text-[20px] font-bold m-2'>Name : </label>
                                <div className="flex justify-start items-center l-small" >
                                    <input type="text" id='fname' {...register("fname", { required: { value: true, message: "*Name is required" } })} placeholder='Enter your first name' className='bg-slate-300 bg-opacity-50 px-3 focus:border-none focus:outline-red-600 py-1 text-black font-bold rounded-xl placeholder:text-white m-2' autoComplete='off' />
                                    {errors.fname && <span className='text-black errorname m-2' >{errors.fname.message}</span>}
                                </div>
                            </div>
                            <div className='flex'>

                                <label htmlFor="uname" className='underline text-[20px] font-bold m-2'>Username : </label>
                                <div className='flex justify-start items-center l-small'>
                                    <input type="text" id='fname' {...register("uname", { required: { value: true, message: "*Username is required" } })} placeholder='username' className='bg-slate-300 bg-opacity-50 px-3 focus:border-none focus:outline-red-600 py-1 text-black font-bold rounded-xl placeholder:text-white m-2' autoComplete='off' />
                                    {errors.uname && <span className='text-black errorname m-2' >{errors.uname.message}</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center my-6 absolute bottom-0 left-[45%]">
                        
                        <button className="bg-red-500 transition-all duration-200 hover:scale-125 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" disabled={isSubmitting} type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Home
