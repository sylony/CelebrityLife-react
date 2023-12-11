import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { FaArrowLeft, FaCircleUser } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { Button, Table, Modal } from 'react-bootstrap';
import { $AXIOS } from '../ajax';


function Manage() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    if (user?.type !== '1') {
        navigate("/home")
    }


    const [users, setUsers] = useState([])

    const getUser = async () => {
        const res = await $AXIOS.get("/api/user/get_follow")
        if (res.data.code === 200) {
            setUsers(res.data.data)
            console.log(res.data.data)
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    const [show, setShow] = useState(false);
    const [selectUser, setSelectUser] = useState({ username: "", id: "" });
    const handleClose = async () => {
        await $AXIOS.post("/api/user/follow", {
            followId: selectUser.id,
            isUnFollow: true
        })
        getUser()
        setShow(false)
    };
    const handleShow = () => setShow(true);



    return (
        <>
            <header className='flex items-center px-2 h-20 justify-between'>
                <div className='flex'>
                    <div onClick={_ => {
                        navigate("/home");
                    }}
                        className='w-8 h-8 flex items-center justify-center transition-all hover:shadow rounded-lg mr-4 cursor-pointer'>
                        <FaArrowLeft className="text-2xl p-1" />
                    </div>

                    <h2 className="text-xl mb-0">
                        My follow list
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
                <div className='w-11/12 mx-auto'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Username</th>
                                <th>User of type</th>
                                <th>Email</th>
                                <th>Introduce</th>
                                <th>Integral</th>
                                <th>Congrol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, index) => (
                                    <tr key={index}>

                                        <td className='w-20'>{item.id}</td>

                                        <td>{item.username}</td>

                                        <td className='font-bold'>
                                            {
                                                item.type === '1' ?
                                                    <p className='text-cyan-700'>Regular members</p>
                                                    : item.type === '2' ?
                                                        <p className='text-blue-700'>Internet celebrity</p>
                                                        :
                                                        <p className='text-pink-700'>Administrators</p>

                                            }
                                        </td>

                                        <td>{item.email}</td>

                                        <th>{item.introduce}</th>

                                        <th>{item.Integral}</th>

                                        <td className='w-72'>
                                            <div className='flex gap-x-2 justify-center'>
                                                <Button variant="danger" onClick={_ => { setSelectUser({ id: item.id, username: item.username }); handleShow() }}>Unfollow</Button>
                                                <Button variant="primary" onClick={_=>{ navigate(`/authorPublic?author_id=${item.id}`)  }}>View his posts</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </main>

            <Modal show={show} onHide={_ => { setShow(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to cancel the following? ({selectUser.username})
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={_ => { setShow(false) }}>
                        No
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        I&apos;m sure
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Manage
