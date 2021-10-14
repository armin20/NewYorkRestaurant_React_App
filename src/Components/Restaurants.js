import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";
import { Card, Table, Pagination } from "react-bootstrap";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const perPage = 10;
  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    let ApiUrl = `https://hidden-gorge-64232.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;
    let query = queryString.parse(location.search).borough;

    if (query !== undefined) {
      ApiUrl += `&borough=${query}`;
    }

    fetch(ApiUrl)
      .then((res) => res.json())
      .then((restaurants) => {
        setRestaurants(restaurants);
      });
  }, [page, location]);

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const nextPage = () => {
    setPage(page + 1);
  };

  if (restaurants.length > 0 && restaurants !== null) {
    return (
      <>
        <Card style={{ backgroundColor: "#E8EEF2" }}>
          <Card.Body>
            <Card.Title>Restaurant List</Card.Title>
            <Card.Text>
              Full list of restaurants, Optionally sorted by borough
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Borough</th>
              <th>Cuisine</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <tr
                key={restaurant._id}
                onClick={() => {
                  history.push(`/Restaurant/${restaurant._id}`);
                }}
              >
                <td>{restaurant.name}</td>
                <td>
                  {restaurant.address.building} {restaurant.address.street}
                </td>
                <td>{restaurant.borough}</td>
                <td>{restaurant.cuisine}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev onClick={previousPage}></Pagination.Prev>
          <Pagination.Item>{page}</Pagination.Item>
          <Pagination.Next onClick={nextPage}></Pagination.Next>
        </Pagination>
      </>
    );
  } else if (restaurants === null) {
    return (
      <Card>
        <Card.Header>Restaurant List</Card.Header>
        <Card.Body>Loading Restaurants...</Card.Body>
      </Card>
    );
  } else {
    return (
      <Card>
        <Card.Header>Restaurant List</Card.Header>
        <Card.Body>No Restaurants Found</Card.Body>
      </Card>
    );
  }
}

export default Restaurants;
