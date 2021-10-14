import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState, useEffect } from "react";
import { Card, CardDeck, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";

function Restaurant() {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let ApiUrl = `https://hidden-gorge-64232.herokuapp.com/api/restaurants/${id}`;

    fetch(ApiUrl)
      .then((data) => data.json())
      .then((result) => {
        setLoading(false);

        if (result.hasOwnProperty("_id")) {
          //hasOwnProperty checks if the object that we have like in here result from fetching the api has the property of id,
          //then it goes ot next line. Otherwise, it sets the setRestaurant(null)

          setRestaurant(result);
        } else {
          setRestaurant(null);
        }
      });
  }, [id]);

  if (loading === true) {
    return (
      <Card>
        <Card.Header>Restaurant List</Card.Header>
        <Card.Body>Loading Restaurants...</Card.Body>
        <Spinner animation="border" role="status" />{" "}
        {/*spinner that shows a loading circle. It first shows it, then when the data is rendered successfully, and loading is set to false, then it will be disappeared.  */}
      </Card>
    );
  } else {
    if (restaurant) {
      const { coord } = restaurant.address;

      return (
        <>
          <Card style={{ backgroundColor: "#F5F5F5" }}>
            <Card.Body>
              <Card.Title>{restaurant.name}</Card.Title>
              <Card.Text>
                {restaurant.address.building} {restaurant.address.street}
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <MapContainer
            style={{ height: "400px" }}
            center={[coord[1], coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[coord[1], coord[0]]}></Marker>
          </MapContainer>

          <h4>Ratings</h4>
          <br />
          <CardDeck>
            {restaurant.grades.map((result, index) => (
              <Card key={index}>
                <Card.Header>Grades: {result.grade}</Card.Header>
                <Card.Body>
                  Completed: {new Date(result.date).toLocaleDateString()}
                </Card.Body>
              </Card>
            ))}
          </CardDeck>
          <br />
        </>
      );
    } else {
      return (
        <>
          <Card inverse style={{ backgroundColor: "#F5F5F5" }}>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                Unable to find Restaurant with id: {id}
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </>
      );
    }
  }
}
export default Restaurant;
