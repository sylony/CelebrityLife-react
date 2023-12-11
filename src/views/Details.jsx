import { useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from 'react-bootstrap';
import { FaArrowLeft, FaCircleUser, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import './css/index.css'
import { $AXIOS } from '../ajax';

function Details() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const detailsInfo = useSelector(state => state.detailsInfo);

    if(!detailsInfo.share_id){
        navigate("/home")
    }


    const handlerToUrl = (url) =>  window.open(url)

    return (
        <div className="">
            <header className='flex items-center px-2 h-12 justify-between'>
                <div className='flex'>
                    <div onClick={_ => {
                        navigate("/home");
                    }}
                        className='w-8 h-8 flex items-center justify-center transition-all hover:shadow rounded-lg mr-4 cursor-pointer'>
                        <FaArrowLeft className="text-2xl p-1" />
                    </div>

                    <h2 className="text-xl mb-0">
                        Share details
                    </h2>
                </div>


                <div onClick={_ => {
                    if (user.token) {
                        navigate("/my")
                        return
                    }
                    navigate("/login")
                }}
                    className='flex items-center cursor-pointer hover:shadow-md pl-3 pr-3 py-1 rounded-lg transition-all'>
                    <p
                        className='mb-0 text-lg'>
                        {
                            user.username
                                ?
                                user.username
                                : "Login or Sign up"
                        }
                    </p>
                    <FaCircleUser className='ml-3 text-2xl' />
                </div>

            </header>
            <main className='w-9/12 mx-auto flex flex-col items-center'>

                <div
                    onClick={_ => {
                        navigate(`/people?id=${detailsInfo.share_id}`)
                    }}
                    className='mt-1 text-xs text-slate-400  cursor-pointer hover:text-blue-700 mb-2'>
                    Publisher: {detailsInfo.user_name}
                </div>

                <div>
                    <img src={detailsInfo.cover} style={{ width: "18rem" }} className="w-72 h-72 rounded-md overflow-hidden  object-cover" />
                </div>

                <div className='flex gap-x-10 mt-3 justify-center'>
                    <div
                        className=' cursor-not-allowed '>
                        <FaRegThumbsDown className='text-2xl' />
                        <p className='text-center mb-0'>{detailsInfo.negative}</p>
                    </div>
                    <div
                        className=' cursor-not-allowed '>
                        <FaRegThumbsUp className='text-2xl' />
                        <p className='text-center mb-0'>{detailsInfo.frontal}</p>
                    </div>
                </div>


                <div className='my-4 text-3xl font-bold'>
                    <p>{detailsInfo.title}</p>
                </div>



                <div className='mb-4 text-xl'>
                    <div>
                        {detailsInfo.content}
                    </div>
                </div>


                <Button onClick={() => { handlerToUrl(detailsInfo.link) }}
                    variant="success" className='mb-2'>Link to Share</Button>

                <div className='my-10 '>
                    <span className=''>Release time:</span> <span className='text-xl font-bold'> {detailsInfo.create_time}</span>
                </div>

            </main>
        </div>
    )
}

export default Details
