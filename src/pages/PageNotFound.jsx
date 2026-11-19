import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageNotFound() {

  return (

    <Container
      className="d-flex flex-column justify-content-center align-items-center text-center py-5"
      style={{ minHeight: "80vh" }}
    >

      <h1
        className="display-4 fw-bold text-zinc-900 mb-2"
        style={{ letterSpacing: "-0.03em" }}
      >
        404
      </h1>

      <h4 className="fw-semibold mb-2">
        Page Not Found
      </h4>

      <p className="text-muted mb-4 small" style={{ maxWidth: "360px" }}>
        The page you are looking for does not exist or may have been moved.
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