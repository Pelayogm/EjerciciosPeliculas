import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";

function Peliculas() {
  const [peliculas, setPeliculas] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const fetchPeliculas = async () => {
        const response = await fetch("peliculas.json");
        const data = await response.json();
        setPeliculas(data);
        setSelectedMovie(data[0]);
    };
    fetchPeliculas();
  }, []);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleShowSynopsis = (synopsis) => {
    setModalContent(synopsis);
    setShowModal(true);
  };

  return (
    <Container fluid className="p-4">
      {selectedMovie && (
        <Row className="mb-4">
          <Col md={8}>
            <img
              src={selectedMovie.foto}
              alt={selectedMovie.titulo}
              className="img-fluid"
            />
          </Col>
          <Col md={4}>
            <h2>{selectedMovie.titulo}</h2>
            <p><strong>Director:</strong> {selectedMovie.director}</p>
            <p><strong>Actores:</strong> {selectedMovie.actoresPrincipales.join(", ")}</p>
            <p><strong>Sinopsis:</strong> {selectedMovie.sinopsis}</p>
          </Col>
        </Row>
      )}

      <Row>
        {peliculas.map((movie, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={movie.foto} alt={movie.titulo} />
              <Card.Body>
                <Card.Title>{movie.titulo}</Card.Title>
                <Card.Text><strong>Director:</strong> {movie.director}</Card.Text>
                <Card.Text>
                  <strong>Actores:</strong> {movie.actoresPrincipales.join(", ")}
                </Card.Text>
                <Button
                  variant="info"
                  onClick={() => handleShowSynopsis(movie.sinopsis)}
                  className="me-2"
                >
                  Más
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleSelectMovie(movie)}
                >
                  Seleccionar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sinopsis</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Peliculas;
