import "./App.css";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import About from "./Components/About";
import Restaurant from "./Components/Restaurant";
import Restaurants from "./Components/Restaurants";
import NotFound from "./Components/NotFound";

import { BiSearch } from "react-icons/bi"; /*these two lines below are added for search and restaurant icons, they also added to dependencies. */
import { MdRestaurant } from "react-icons/md";

function App() {
  let [searchString, setSearchString] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/restaurants?borough=${searchString}`);

    setSearchString("");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <LinkContainer to="/">
          <Navbar.Brand>
            <MdRestaurant /> New York Restaurants
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/restaurants">
              <Nav.Link>Full List</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Form onSubmit={handleSubmit} inline>
            <FormControl
              type="text"
              placeholder="Borough"
              className="mr-sm-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              <BiSearch />
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <br />

      <Container>
        <Row>
          <Col md={12}>
            <Switch>
              <Route path="/Restaurants">
                <Restaurants />
              </Route>
              <Route exact path="/Restaurant/:id">
                <Restaurant />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/">
                <Redirect to="/Restaurants" />
              </Route>
              <Route>
                <NotFound />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
