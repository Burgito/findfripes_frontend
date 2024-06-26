import React from 'react'
import ReactDOM from 'react-dom/client'
import FindFripes from './FindFripes.tsx'
import './style/index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.tsx'
import FripeDetails from './pages/FripeDetails.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FindFripes />}>
          <Route index element={<Home />} />
          <Route path="/fripe/:fripeId" element={<FripeDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
