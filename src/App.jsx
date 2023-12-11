import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux"
import Index from "./views/Index"
import Home from "./views/home";
import Login from "./views/Login";
import store from "./store";
import My from "./views/My";
import People from "./views/people";
import Review from "./views/Review";
import Details from "./views/details";
import Manage from "./views/manage";
import MyFollow from "./views/myFollow";
import AuthorPublic from "./views/AuthorPublic";


function App() {
  console.log("是否开发环境", import.meta.env.MODE === "development")
  console.log("当前环境", import.meta.env.MODE)

  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <Routes >
            <Route path="/" element={<Navigate to="home" />} />
            <Route path="index" element={<Index />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="my" element={<My />} />
            <Route path="people" element={<People />} />
            <Route path="review" element={<Review />} />
            <Route path="details" element={<Details />} />
            <Route path="manage" element={<Manage />} />
            <Route path="myFollow" element={<MyFollow />} />
            <Route path="authorPublic" element={<AuthorPublic />} />
          </Routes>
        </HashRouter>
      </Provider>
    </>
  )
}

export default App
