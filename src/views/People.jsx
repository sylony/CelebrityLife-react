import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { $AXIOS } from '../ajax';
import Table from 'react-bootstrap/Table';
import { FaCircleUser } from "react-icons/fa6";

function People() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id'); // 获取"id"查询参数

    if(!id){
        navigate("/home")
    }

    const [userInfo, setUserInfo] = useState({
        username: '',
        email: '',
        type: '', 
        introduce: ''
    })

    useEffect(() => {
        const get_user_base_info = async () => {
            const res = await $AXIOS.get(`/api/share/get_user_base_info?id=${id}`)
            if (res.data.code === 200) {
                setUserInfo(res.data.data)
            }
        }
        get_user_base_info()
    }, [])



    return (
        <div>
            <header className='flex items-center px-2 h-20 justify-between'>
                <div className='flex'>
                    <div onClick={_ => {
                        navigate("/home");
                    }}
                        className='w-8 h-8 flex items-center justify-center transition-all hover:shadow rounded-lg mr-4 cursor-pointer'>
                        <FaArrowLeft className="text-2xl p-1" />
                    </div>

                    <h2 className="text-xl mb-0">
                        User information
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
            <main>
                <div className="w-9/12 mx-auto">

                    <Form >
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                disabled
                                type="text"
                                placeholder="Input..."
                                name="username"
                                value={userInfo.username}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                disabled
                                type="email"
                                placeholder="name@example.com"
                                name="email"
                                value={userInfo.email}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUserType">
                            <Form.Label>User type</Form.Label>
                            <Form.Select
                                disabled
                                name="userType"
                                value={userInfo.type}
                                aria-label="Default select example"
                            >
                                <option value="1">Member</option>
                                <option value="2">Celebrity</option>
                                <option value="3">Admin</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formIntroduction">
                            <Form.Label>Example introduce</Form.Label>
                            <Form.Control
                                disabled
                                as="textarea"
                                rows={3}
                                name="introduce"
                                value={userInfo.introduce}
                            />
                        </Form.Group>

                    </Form>
                </div>
            </main>
        </div>
    )
}

export default People
