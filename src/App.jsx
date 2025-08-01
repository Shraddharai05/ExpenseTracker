import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from './RegistrationForm'
import ExpenseTracker from './ExpenseTracker/ExpenseTracker'
import PrivateRoute from './PrivateRoute';
import LoginForm from "./LoginForm"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='/registrationform' element={<RegistrationForm />}></Route>
          <Route path='/expenseTracker' element={<PrivateRoute><ExpenseTracker /></PrivateRoute>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
