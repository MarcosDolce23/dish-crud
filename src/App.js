// Import React
import React, { useState } from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col }
  from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import {
  Routes,
  Route, Link, useLocation
} from "react-router-dom";

// Import other React Component
import DoLogin from
  "./Components/do-login.component";
import CreateDish from
  "./Components/create-dish.component";
import EditDish from
  "./Components/edit-dish.component";
import DishList from
  "./Components/dish-list.component";
import CreateIngredient from
  "./Components/create-ingredient.component";
import IngredientList from
  "./Components/ingredient-list.component";
import EditIngredient from
  "./Components/edit-ingredient.component";
import CreateCategory from
  "./Components/create-category.component";
import CategoryList from
  "./Components/category-list.component";
import EditCategory from
  "./Components/edit-category.component";

// App Component
const App = () => {
  const location = useLocation();

  return (
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={location.pathname === "/" ? "/" : "/dish-list"}
                  className="nav-link">
                  Dish CRUD
                </Link>
              </Navbar.Brand>

              {location.pathname === "/" ? (
                null
              ) : (
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

                  <Nav>
                    <Link to={"/create-ingredient"}
                      className="nav-link">
                      Create Ingredient
                    </Link>
                  </Nav>

                  <Nav>
                    <Link to={"/ingredient-list"}
                      className="nav-link">
                      Ingredient List
                    </Link>
                  </Nav>

                  <Nav>
                    <Link to={"/create-category"}
                      className="nav-link">
                      Create Category
                    </Link>
                  </Nav>

                  <Nav>
                    <Link to={"/category-list"}
                      className="nav-link">
                      Category List
                    </Link>
                  </Nav>

                </Nav>
              )}

            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Routes>
                  <Route exact path="/"
                    element={<DoLogin />} />
                  <Route path="/create-dish"
                    element={<CreateDish />} />
                  <Route path="/edit-dish/:id"
                    element={<EditDish />} />
                  <Route path="/dish-list"
                    element={<DishList />} />
                  <Route path="/create-ingredient"
                    element={<CreateIngredient />} />
                  <Route path="/ingredient-list"
                    element={<IngredientList />} />
                  <Route path="/edit-ingredient/:id"
                    element={<EditIngredient />} />
                  <Route path="/create-category"
                    element={<CreateCategory />} />
                  <Route path="/category-list"
                    element={<CategoryList />} />
                  <Route path="/edit-category/:id"
                    element={<EditCategory />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
  );
};

export default App;