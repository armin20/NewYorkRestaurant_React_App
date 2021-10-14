import { Card, Button } from "react-bootstrap";
function About() {
  return (
    <Card style={{ backgroundColor: "#F5F5F5" }}>
      <Card.Body>
        <Card.Title>About</Card.Title>
        <Card.Text className="font-weight-bold">Hi, I am Armin. :)</Card.Text>
        <Card.Text className="font-weight-medium">
          I am currently learning Front-end and Back-end Development. I have a
          couple of project with JS.
        </Card.Text>
        <br />
        <Button href="https://github.com/armin20">Github</Button>
      </Card.Body>
    </Card>
  );
}

export default About;
