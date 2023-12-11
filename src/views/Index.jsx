// import { useState } from 'react'
import { useNavigate } from "react-router-dom"

import { Button } from 'react-bootstrap';

import './css/index.css'

function Index() {
  // const [count, setCount] = useState(0)
  
  const navigate = useNavigate();

  return (
    <div className="text-center flex justify-center items-center flex-col h-full w-full absolute">
      <header>
        <h1>
          Welcome
        </h1>
        <h2>
          Share your favorite items!
        </h2>
        <h2>
          and also browse the items shared by others!
        </h2>
      </header>
      <Button  variant="primary" onClick={_=>{ navigate("/home") }}>
        I understand (Entering the website)
      </Button>
    </div>
  )
}

export default Index
