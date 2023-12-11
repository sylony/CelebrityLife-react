import { useState, useRef, useEffect } from 'react'
import { useNavigate } from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { FaCircleUser, FaRegThumbsUp, FaRegThumbsDown, FaRegPenToSquare, FaClipboardList, FaAlignJustify, FaUsers, FaRegFontAwesome, FaSearchengin, FaXmark, FaHeart } from "react-icons/fa6";

import { useSelector, useDispatch } from 'react-redux';

import Image from 'react-bootstrap/Image';
import axios from "axios"
import { $AXIOS } from '../ajax';
import { message } from 'antd';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isRelease, setIsRelease] = useState(false)

    const user = useSelector(state => state.user);

    const handlerToUrl = (url) => window.open(url)

    //!~
    const [formData, setFormData] = useState({
        title: '',
        link: '',
        content: '',
        cover: '',
    });


    const fileInput = useRef(null);
    // const [selectedFile, setSelectedFile] = useState(null);

    // 获取分享列表
    const [Shares, setShares] = useState([])

    const getShare = () => {
        console.log("getShare is called");
        $AXIOS.get("/api/share/get").then(res => {
            console.log(res);
            if (res.data.code === 200) {
                setShares(res.data.data)
            }
        });
    };
    useEffect(() => {
        getShare();
    }, []);
    //~!

    // !~ 评价接口


    const handlerEvaluate = (type, id) => {
        $AXIOS.post("/api/share/evaluate", {
            id,
            type
        }).then(res => {
            if (res.data.code === 200) {
                getShare()
            }
        })
    }
    // ~!

    const [isCollect, setIsCollect] = useState(false)
    const [Collect, setCollect] = useState([])
    const [searchTitle, setSearchTitle] = useState([])

    const handlerSearchTitle = async () => {
        const res = await $AXIOS.get(`/api/share/search?title=${searchTitle}`)
        if (res.data.code === 200) {
            setShares(res.data.data)
        }
    }

    const handlerFollow = async (followId) => {
        await $AXIOS.post("/api/user/follow", { followId })
    }

    return (
        <>
            <header className='flex items-center px-2 md:px-4 h-16 shadow-md justify-center md:justify-between'>
                <h2
                    onClick={_ => {
                        navigate("/index")
                    }}
                    className='hidden md:flex items-center cursor-pointer hover:shadow-md p-2 rounded-lg transition-all'>
                    <div className='hidden md:flex items-center'>
                        home

                        <div className='ml-2'>
                            <FaRegFontAwesome className='text-lg' />
                        </div>
                    </div>
                </h2>

                <div className='flex items-center justify-between'>

                    <div className='mr-2 md:mr-8'>
                        <InputGroup className="" size="sm">
                            <Form.Control
                                placeholder="Search Title..."
                                aria-label="Search Title..."
                                aria-describedby="basic-addon2"
                                value={searchTitle}
                                onChange={e => {
                                    if (e.target.value === '') {
                                        getShare()
                                    }
                                    setSearchTitle(e.target.value)
                                }}
                            />
                            <Button onClick={_ => { setSearchTitle(''); getShare() }} variant="outline-secondary">
                                <FaXmark />
                            </Button>
                            <Button onClick={_ => { handlerSearchTitle() }}
                                variant="outline-secondary" id="button-addon2">
                                <FaSearchengin />
                            </Button>
                        </InputGroup>
                    </div>

                    <div onClick={_ => {
                        if (user.type === '3') {
                            navigate("/manage")
                            return
                        }
                        message.warning("This page can only be accessed by administrators")
                    }}
                        className='mr-2 cursor-pointer hover:shadow-md p-2 rounded-lg transition-all'>
                        <FaUsers />
                    </div>

                    <div onClick={_ => {
                        if (user.type === '3') {
                            navigate("/review")
                            return
                        }
                        message.warning("This page can only be accessed by administrators")
                    }}
                        className='mr-2 cursor-pointer hover:shadow-md p-2 rounded-lg transition-all'>
                        <FaAlignJustify />
                    </div>

                    <div onClick={_ => {
                        if (user.type === '2') {
                            setIsRelease(true)
                            return
                        }
                        message.warning("This page can only be accessed by internet celebrity")
                    }}
                        className='mr-2 cursor-pointer hover:shadow-md p-2 rounded-lg transition-all'>
                        <FaRegPenToSquare />
                    </div>

                    <div onClick={_ => {
                        if (user.type === '1') {
                            navigate("/myFollow")
                            return
                        }
                        message.warning("This page can only be accessed by regular members")
                    }}
                        className='mr-2 cursor-pointer hover:shadow-md p-2 rounded-lg transition-all'>
                        <FaHeart />
                    </div>

                    <div onClick={async _ => {
                        const res = await $AXIOS.get("/api/share/evaluation_records")
                        if (res.data.code === 200) {
                            console.log("res", res)
                            setCollect(res.data.data)
                            setIsCollect(true)
                        }
                    }}
                        className='mr-0 md:mr-4 cursor-pointer hover:shadow-md p-2 rounded-lg transition-all'>
                        <FaClipboardList />
                    </div>

                    <div onClick={_ => {
                        if (user.token) {
                            navigate("/my")
                            return
                        }
                        navigate("/login")
                    }}
                        className='flex items-center cursor-pointer hover:shadow-md pl-0 md:pl-3 pr-0 md:pr-3 py-1 rounded-lg transition-all'>
                        <p
                            className='mb-0 text-lg hidden md:flex'>
                            {
                                user.username
                                    ?
                                    user.username
                                    : "Login or Sign up"
                            }
                        </p>
                        <FaCircleUser className='ml-3 text-2xl' />
                    </div>
                </div>
            </header>

            <main className='p-4 flex flex-wrap gap-x-10 gap-y-10 justify-center'>

                {

                    Shares.map((item, index) => (
                        <Card key={index} className=' shadow-md transition-all transform hover:-translate-y-1' style={{ padding: "10px", width: "24rem" }}>
                            <Card.Img variant="top" src={item.cover} className="h-72 object-cover" />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text className='h-4 overflow-auto mb-0'>
                                    {/* {item.content} */}
                                </Card.Text>
                                <div className=''>
                                    <Button
                                        onClick={_ => {
                                            dispatch({
                                                type: 'setDetailsInfo', payload: {
                                                    detailsInfo: item
                                                }
                                            })
                                            navigate("/details")
                                        }}
                                        variant="primary" className='w-full'>Details</Button>
                                    <Button onClick={() => { handlerToUrl(item.link) }}
                                        variant="success" className='mt-2 w-full'>Link to Share</Button>
                                </div>
                                <div className='flex gap-x-10 mt-3 justify-center'>
                                    <div onClick={_ => {
                                        handlerEvaluate("0", item.id)
                                    }}
                                        className='cursor-pointer hover:scale-110 hover:text-red-600 transform transition-all'>
                                        <FaRegThumbsDown className='text-2xl' />
                                        <p className='text-center mb-0'>{item.negative}</p>
                                    </div>
                                    <div onClick={_ => {
                                        handlerEvaluate("1", item.id)
                                    }}
                                        className='cursor-pointer hover:scale-110 hover:text-red-600 transform transition-all'>
                                        <FaRegThumbsUp className='text-2xl' />
                                        <p className='text-center mb-0'>{item.frontal}</p>
                                    </div>
                                </div>
                                <div
                                    className='mt-1 flex text-xs items-center justify-between text-slate-400  cursor-pointer hover:text-blue-700'>
                                    <p onClick={_ => { navigate(`/people?id=${item.share_id}`) }} className="mb-0">Publisher: {item.user_name}</p>
                                    <Button onClick={_ => {
                                        handlerFollow(item.share_id)
                                    }}
                                        size="sm" variant="outline-primary">Follow the author</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }


            </main>

            {/* Release share */}
            <Modal show={isRelease} onHide={_ => { setIsRelease(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>Release share</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Cover</Form.Label>
                            <div className='flex gap-x-4 mb-2'>
                                <Button variant="primary"
                                    onClick={() => fileInput.current.click()}
                                >Upload</Button>
                                <Button onClick={_ => setFormData({ ...formData, cover: "" })}
                                    variant="info">Clear</Button>
                            </div>
                            <Image className='h-40 object-cover border border-solid mx-auto' src={formData.cover} rounded />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="email" placeholder="Input title..."
                                name="title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>link</Form.Label>
                            <Form.Control type="link" placeholder="Input link..."
                                value={formData.link}
                                onChange={e => setFormData({ ...formData, link: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Details</Form.Label>
                            <Form.Control as="textarea" placeholder="Input textarea..." rows={3} value={formData.content}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={_ => { setIsRelease(false) }} >
                        Close
                    </Button>
                    <Button variant="primary" onClick={async _ => {
                        $AXIOS.post("/api/share/add", formData)

                        setIsRelease(false)
                    }}>
                        Release
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* isCollect */}
            <Modal show={isCollect} size="lg" aria-labelledby="example-modal-sizes-title-lg" onHide={_ => { setIsCollect(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>My evaluate</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='h-96 overflow-auto flex flex-wrap gap-8 justify-center'>
                        {
                            Collect.map((item, index) => (
                                <div key={index}>
                                    <Card className=' shadow-md' style={{ padding: "10px", width: "18rem" }}>
                                        <Card.Img variant="top" src={item.item.cover} className="h-72 object-cover" />
                                        <Card.Body>
                                            <Card.Title>{item.item.title}</Card.Title>
                                            <Card.Text className=' truncate '>
                                                {item.item.content}
                                            </Card.Text>
                                            <div className=''>
                                                <Button variant="primary" className='w-full'>Star</Button>
                                                <Button onClick={() => { handlerToUrl(item.item.link) }}
                                                    variant="success" className='mt-2 w-full'>Link to Share</Button>
                                            </div>
                                            <div className='flex gap-x-10 mt-3 justify-center'>
                                                <div onClick={_ => {
                                                    handlerEvaluate("0", item.item.id)
                                                }}
                                                    className='cursor-pointer hover:scale-110 hover:text-red-600 transform transition-all'>
                                                    <FaRegThumbsDown className='text-2xl' />
                                                    <p className='text-center mb-0'>{item.item.negative}</p>
                                                </div>
                                                <div onClick={_ => {
                                                    handlerEvaluate("1", item.item.id)
                                                }}
                                                    className='cursor-pointer hover:scale-110 hover:text-red-600 transform transition-all'>
                                                    <FaRegThumbsUp className='text-2xl' />
                                                    <p className='text-center mb-0'>{item.item.frontal}</p>
                                                </div>
                                            </div>
                                            <div
                                                onClick={_ => navigate(`/people?id=${item.item.user_id}`)}
                                                className='mt-1 text-xs text-slate-400  cursor-pointer hover:text-blue-700'>
                                                Publisher: {item.item.user_name}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                    <div
                                        className='text-xs mt-1 pl-2'>
                                        Star time: {item.create_time}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={_ => { setIsCollect(false) }} >
                        Close
                    </Button>
                    <Button variant="primary" onClick={_ => {
                        setIsCollect(false)
                    }}>
                        Release
                    </Button>
                </Modal.Footer>
            </Modal>

            <input
                style={{ display: 'none' }}
                className='absolute -left-44 -top-44 z-0'
                type="file"
                ref={fileInput}
                onChange={e => {
                    // setSelectedFile(e.target.files[0]);
                    // 你也可以在这里调用其他的回调函数

                    const formDataFile = new FormData();
                    formDataFile.append('image', e.target.files[0]);

                    axios.post("https://tucdn.wpon.cn/api/upload", formDataFile, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then(response => {
                            console.log(response.data.data.url)
                            setFormData({ ...formData, cover: response.data.data.url })
                        })
                        .catch(error => {
                            // 处理错误
                            console.error('Error uploading the file', error);
                        });

                }}
            />


        </>
    )
}

export default Home
