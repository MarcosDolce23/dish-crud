// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
  from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import {
  BrowserRouter as Router, Routes,
  Route, Link
} from "react-router-dom";

// Import other React Component
import CreateDish from
  "./Components/create-dish.component";
import EditDish from
  "./Components/edit-dish.component";
import DishList from
  "./Components/dish-list.component";

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-dish"}
                  className="nav-link">
                  React MERN Stack App
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-dish"}
                    className="nav-link">
                    Create Dish
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/dish-list"}
                    className="nav-link">
                    Dish List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/"
                    element={<CreateDish />} />
                  <Route path="/create-dish"
                    element={<CreateDish />} />
                  <Route path="/edit-dish/:id"
                    element={<EditDish />} />
                  <Route path="/dish-list"
                    element={<DishList />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;