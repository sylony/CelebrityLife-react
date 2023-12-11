import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { $AXIOS } from '../ajax';

function My() {
    const [isLogin, setIsLogin] = useState(0)
    const navigate = useNavigate();
    // const count = useSelector(state => state.count);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();


    // 设置初始状态
    const [formData, setFormData] = useState({
        username: user.username,
        password: user.password,
        email: user.email,
        userType: user.type,
        introduce: user.introduce,
        phone: user.phone,
    });

    // 处理输入字段变化的函数
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // 处理表单提交的函数
    const handleSubmit = async (type, event) => {
        event.preventDefault();
        // 在这里可以进行进一步的处理，例如发送到服务器
        const res = await $AXIOS.post("/api/user/update", {
            username: formData.username,
            introduce: formData.introduce,
            id: user.id,
            phone: formData.phone
        })

        if (res.data.code === 200) {
            dispatch({
                type: 'setUser', payload: {
                    user: {
                        username: formData.username,
                        introduce: formData.introduce,
                    }
                }
            })
        }
        // sign up
    };

    return (
        <div className="">

            <header className='flex items-center px-2 h-20'>
                <div onClick={_ => {
                    navigate("/home");
                }}
                    className='w-8 h-8 flex items-center justify-center transition-all hover:shadow rounded-lg mr-4 cursor-pointer'>
                    <FaArrowLeft className="text-2xl p-1" />
                </div>
                <h2 className="text-xl mb-0">
                    My
                </h2>
            </header>
            <main>


                <div className="w-9/12 mx-auto">

                    <Form onSubmit={_ => handleSubmit("signup", _)}>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Input..."
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="phone"
                                placeholder="Input phone number..."
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                disabled
                                type="password"
                                placeholder="Input..."
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                disabled
                                type="email"
                                placeholder="name@example.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formUserType">
                            <Form.Label>User type</Form.Label>
                            <Form.Select
                                disabled
                                name="userType"
                                value={formData.userType}
                                onChange={handleChange}
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
                                as="textarea"
                                rows={3}
                                name="introduce"
                                value={formData.introduce}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <div>
                            <Button variant="primary" type='submit'>Modify my data</Button>
                            <Button onClick={_ => {
                                dispatch({
                                    type: 'setUser', payload: {
                                        isExitLogin: true
                                    }
                                })

                                navigate("/home")
                            }}
                                variant="danger" className='ml-3'>Exit out login</Button>
                        </div>
                    </Form>


                </div>
            </main>
        </div>
    )
}

export default My
