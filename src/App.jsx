import {Route, Routes} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import About from "./pages/About.jsx";
function App() {
    return (
        <>
            <Navbar>
                <div className={"container"}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </Navbar>
        </>
    )
}

export default App
