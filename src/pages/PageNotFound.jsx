import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageNotFound() {

  return (

    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "80vh" }}
    >

      <h1 className="display-1 fw-bold text-primary">
        404
      </h1>

      <h2 className="fw-bold">
        Page Not Found
      </h2>

      <p className="text-muted mb-4">
        The page you are looking for does not exist.
      </p>

      <Button
        as={Link}
        to="/"
        variant="primary"
      >
        Back to Home
      </Button>

    </Container>

  );

}

export default PageNotFound;