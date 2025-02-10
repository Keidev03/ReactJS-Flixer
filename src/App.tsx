import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { PublicRoutes } from "./routes/routes"
import MainLayout from "./layouts/MainLayout/MainLayout"
import { CarouselTranslateX } from "./CarouselTranslateX"

function App() {

  return (
    <CarouselTranslateX>
        <div>1</div>
        <div>2</div>
        <div>3</div>
    </CarouselTranslateX>
  )
}

export default App
