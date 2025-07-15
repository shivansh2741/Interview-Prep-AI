
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/InterviewPrep/LandingPage"
import Login from "./pages/Login"
import SignUp from "./pages/Signup"
import InterviewPrep from "./pages/InterviewPrep/components/InterviewPrep"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
        </Routes>
      </Router>
      <Toaster 
      />
    </div>
  )
}

export default App
