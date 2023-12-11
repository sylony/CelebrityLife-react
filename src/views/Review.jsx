import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom"
import { FaArrowLeft, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useSelector, useDispatch } from 'react-redux';
import { $AXIOS } from '../ajax';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import { FaCircleUser } from "react-icons/fa6";
import Modal from 'react-bootstrap/Modal';

function Review() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    if(user?.type !== '3'){
        navigate("/home")
    }

    const [show, setShow] = useState(false);
    const [content, setContent] = useState("");

    const [shares, setShares] = useState([])

    const getShare = () => {
        console.log("getShare is called");
        $AXIOS.get("/api/share/get_review").then(res => {
            if (res.data.code === 200) {
                setShares(res.data.data)
            }
        });
    };
    useEffect(() => {
        getShare();
    }, []);

    const handlerReview = async (id, type) => {
        const res = await $AXIOS.post("/api/share/review", { id, type })


        getShare();
    }


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
                        Review shares
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
                                <th>share_user</th>
                                <th>Cover</th>
                                <th>Title</th>
                                <th>Content</th>
                                <th>link</th>
                                <th>
                                    <div className='flex items-center'>
                                        frontal <FaRegThumbsUp className='ml-2' />
                                    </div>
                                </th>
                                <th>
                                    <div className='flex items-center'>
                                        negative  <FaRegThumbsDown className='ml-2' />
                                    </div>
                                </th>
                                <th>Create time</th>
                                <th>Status</th>
                                <th>Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                shares.map((item, index) => (
                                    <tr key={index}>
                                        <td className='w-20'>{item.user_name}</td>
                                        <td className='w-20'>
                                            <Image className='w-20 h-20 object-cover' src={item.cover} rounded />
                                        </td>
                                        <td>{item.title}</td>
                                        <td className='w-52'>
                                            <p onClick={_ => {
                                                setContent(item.content)
                                                setShow(true)
                                            }}
                                                className='w-40 h-20 truncate cursor-pointer hover:text-rose-400'>{item.content}</p>
                                        </td>
                                        <td>{item.link}</td>
                                        <td className='w-12'>{item.frontal}</td>
                                        <td className='w-12'>{item.negative}</td>
                                        <td className='w-52'>{item.create_time}</td>
                                        <td className='w-28'>
                                            <div>
                                                <Button variant={item.status === "1" ? 'success' : 'secondary'} disabled>{item.status === "1" ? 'Pass' : 'Disabled'}</Button>
                                            </div>
                                        </td>
                                        <td className='w-44'>
                                            <div className='flex gap-x-2 justify-center'>
                                                <Button variant="success" disabled={item.status === '0' ? false : true} onClick={_ => { handlerReview(item.id, '1') }}>Pass</Button>
                                                <Button variant="secondary" disabled={item.status === '0' ? true : false} onClick={_ => { handlerReview(item.id, '0') }}>Disabled</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </main>


            <Modal
                size="xl"
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Full content
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='w-full h-full overflow-auto text-base'>
                        {content}
                    </div>
                </Modal.Body>
            </Modal>

        </div>
    )
}

export default Review
