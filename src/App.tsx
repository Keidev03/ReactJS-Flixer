import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import { PublicRoutes } from "./routes/routes"
import MainLayout from "./layouts/MainLayout/MainLayout"

function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
          {PublicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout: React.ComponentType<any> = MainLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  )
}

export default App
