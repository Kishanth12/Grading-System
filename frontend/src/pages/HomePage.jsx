import { Link } from "react-router-dom"
import NavBar from "../components/NavBar"
const HomePage = () => {
  return (
    <div>
      <div>
        <NavBar/>
      </div>
    <div>
        Welcome
    </div>
    <div>
    <Link to= '/login'><h1>Login</h1></Link> 
    </div>
    </div>
  )
}

export default HomePage