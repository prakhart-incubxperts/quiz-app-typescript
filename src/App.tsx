
import { Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import { UserRegistration } from './Pages/userRegistration';
import { QuestionPage } from './Pages/questionPage';
import { Navbar } from './Pages/navbar';
import { UpperSection } from './Pages/uppersection';
import './App.css';
import { DashBoard } from './Pages/dashboard';

function App() {
  //const[role,setRole]=useState<string>('');

  return (
    <div className="App">
      <Navbar/>
      <UpperSection/>
      <Router>
        <Routes>
        <Route path="*" element={<DashBoard />}></Route>
          <Route path="/" element={<DashBoard />}></Route>
          <Route path="/user" element={<UserRegistration />}></Route>
          <Route path="/test" element={<QuestionPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
