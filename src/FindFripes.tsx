import './style/FindFripes.scss'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function FindFripes() {
  return (
    <div className="ff-container">
      <Header />
      <div className="ff-content">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default FindFripes
