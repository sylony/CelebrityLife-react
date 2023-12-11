import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { $AXIOS } from '../ajax';

function Login() {
    const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate();
    // const count = useSelector(state => state.count);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();


    // 设置初始状态
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        userType: '1', 
        introduction: '',
        phone: ''
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
        console.log(type)
        event.preventDefault();
        // 在这里可以进行进一步的处理，例如发送到服务器
        if (type === "login") {
            const res = await $AXIOS.post("/api/user/login", {
                email: formData.email,
                password: formData.password
            })

            res.data.user.token = res.data.token
            dispatch({
                type: 'setUser', payload: {
                    user: res.data.user
                }
            })

            navigate("/home")

            return
        }

        const res = await $AXIOS.post("/api/user/sign_up", {
            username: formData.username,
            password: formData.password,
            introduce: formData.introduction,
            email: formData.email,
            type: formData.userType,
            phone: formData.phone,
        })

        if (res.data.code === 200) {
            setIsLogin(true)
        }


        // sign up
    };

    return (
        <div className="">
            {/* <div>
                <p>Count: {count}</p>
                <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
                <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
            </div> */}

            <header className='flex items-center px-2 h-20'>
                <div onClick={_ => {
                    navigate("/home");
                }}
                    className='w-8 h-8 flex items-center justify-center transition-all hover:shadow rounded-lg mr-4 cursor-pointer'>
                    <FaArrowLeft className="text-2xl p-1" />
                </div>
                <h2 className="text-xl mb-0">
                    Login or Sign up
                </h2>
            </header>
            <main>
                <div className="flex justify-center">
                    <ButtonGroup aria-label="Basic example">
                        <Button variant={isLogin ? 'primary' : 'secondary'} onClick={_ => { setIsLogin(true) }}>Login</Button>
                        <Button variant={!isLogin ? 'primary' : 'secondary'} onClick={_ => { setIsLogin(false) }}>Sign up</Button>
                    </ButtonGroup>
                </div>

                <div className="w-9/12 mx-auto">

                    {
                        isLogin
                            ?
                            <Form onSubmit={_ => handleSubmit("login", _)}>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="name@example.com"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Input..."
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <div>
                                    <Button variant="primary" type='submit'>Login</Button>
                                </div>

                            </Form>
                            :
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

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
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
                                        type="email"
                                        placeholder="name@example.com"
                                        name="email"
                                        value={formData.email}
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

                                <Form.Group className="mb-3" controlId="formUserType">
                                    <Form.Label>User type</Form.Label>
                                    <Form.Select
                                        name="userType"
                                        value={formData.userType}
                                        onChange={handleChange}
                                        aria-label="Default select example"
                                    >
                                        <option value="1">Regular members</option>
                                        <option value="2">Internet celebrity</option>
                                        <option value="3">Administrators</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formIntroduction">
                                    <Form.Label>Example introduce</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="introduction"
                                        value={formData.introduction}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                <Button variant="primary" type='submit'>Sign up</Button>
                            </Form>
                    }


                </div>
            </main>
        </div>
    )
}

export default Login
