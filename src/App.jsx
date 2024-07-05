import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Banana from './pages/Banana.jsx';
import About from './pages/About.jsx';

function App() {
    return (
        <>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/banana" element={<Banana />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
