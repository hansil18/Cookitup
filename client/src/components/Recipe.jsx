import { Col, Row, Container, Carousel, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Speech from "react-speech";

const url = "http://localhost:5000/api";

const speechstyle = {
  play: {
    hover: {
      backgroundColor: "black",
      color: "white",
    },
    button: {
      padding: "4",
      fontFamily: "Helvetica",
      fontSize: "1.0em",
      cursor: "pointer",
      pointerEvents: "none",
      outline: "none",
      backgroundColor: "inherit",
      border: "none",

    },
  },
};


const Recipe = () => {
  const { id } = useParams();
  const [recipedata, setRecipedata] = useState([]);
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    console.log(selectedIndex);
    if (selectedIndex === -1) return;
    if (selectedIndex === recipedata[0].steps.length - 1) return;
    setIndex(selectedIndex);
  };
  useEffect(() => {
    fetchrecipe();
  }, []);
  const fetchrecipe = async () => {
    try {
      await axios
        .get(`${url}/recipe/search`, { params: { _id: id } })
        .then((res) => {
          console.log(res.data);
          setRecipedata(res.data);
        });
    } catch (err) {
      console.log("error recipe not found in the database", err);
    }
  };
  return (
    <div>
      {recipedata[0] ? (
        <Container>
          <Row className="mt-5">
            <Col><img src={recipedata[0].photo} alt="Food" ></img></Col>
            <Col>
              <h1>{recipedata[0].name}</h1>
              <p style={{fontSize:20}}>{recipedata[0].introduction}</p>
              <Speech
                  text={recipedata[0].introduction}
                  style={speechstyle}
                  textAsButton={true}
                  displayText="Click to Hear"
                />
            </Col>
          </Row>
          <Container fluid>
            <Row style={{marginTop:'10px'}}>
              <Col>
                <Card style={{marginTop:'10px',padding:10}}>
                  <h4>Allergies</h4>
                    {recipedata[0].allergies.map((allergy) => (
                      <p>{allergy.allergy}</p>
                    ))}
                    {/* <span>{recipedata[0].allergies}</span> */}
                </Card>
              </Col>
              <Col>
                <Card style={{marginTop:'10px',padding:10}}>
                  <h4>Time </h4>
                  <p> {recipedata[0].time} minutes</p>
                </Card>
              </Col>
              <Col>
                <Card style={{marginTop:'10px',padding:10}}>
                  <h4>Difficulty </h4>
                  <p> {recipedata[0].difficulty}</p>
                </Card>
              </Col>
              <Col>
                <Card style={{marginTop:'10px',padding:10}}>
                  <h4>Type </h4>
                  <p> {recipedata[0].type}</p>
                </Card>
              </Col>
            </Row>
          </Container>
          <hr/>
          <h2>Step by Step Cooking</h2>
          <Row>{/* <span>{recipedata[0].ingrediants}</span> */}</Row>
          <Row className="d-flex justify-content-center">
            <Carousel
              variant="dark"
              className="mb-5"
              style={{ display: "block", width: "70%", padding: 30 }}
            >
              {recipedata[0].steps.map((step) => (
                <Carousel.Item style={{ height: "100rem"}}>
                  <Card style={{ width: "100%" , height: "50%"}}>
                    <Card.Img style={{ height: "50%", width: "100%"}} variant="top" src={step.photo} />
                    <Card.Body>
                      <Card.Title>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
                          <h3>Step 1,2</h3>
                          <Speech
                              text={step.description}
                              style={speechstyle}
                              textAsButton={true}
                              displayText="Click to Hear"
                          />
                        </div>
                      </Card.Title>
                      <hr/>
                      <Card.Text>{step.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Recipe;
