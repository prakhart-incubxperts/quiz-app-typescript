
import './App.css';
import { DashBoard } from './Pages/dashboard';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import { UserRegistration } from './Pages/userRegistration';
import { QuestionPage } from './Pages/questionPage';
import { Navbar } from './Pages/navbar';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<DashBoard />}></Route>
          <Route path="/user" element={<UserRegistration />}></Route>
          <Route path="/test" element={<QuestionPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
