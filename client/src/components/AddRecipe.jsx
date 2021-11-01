import { Form, Row, Col, Button } from "react-bootstrap";
import { FiLogIn } from "react-icons/fi";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { LoginContext } from "../controller/loginstate";

const url = "http://localhost:5000/api";

const signupInitialValues = {
  name: "",
  time: 0,
  introduction: "",
  difficulty: "",
  ingredient: [],
  steps: [],
  type: "",
  allergies: [],
  photo: "",
};
const initialStep = {
  description: "",
  photo: "",
};

const AddRecipe = () => {
  const [signup, setSignup] = useState(signupInitialValues);
  const [ingredient, setIngredient] = useState("");
  const [step, setStep] = useState(initialStep);
  const [allergy, setAllergy] = useState([]);
  const {account} = useContext(LoginContext);
  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const onIngredientChange = (e) => {
    setIngredient(e.target.value);
  };
  const onPhotoChange = (e) => {
    setStep({ ...step, photo: e.target.value });
  };
  const onDesChange = (e) => {
    setStep({ ...step, description: e.target.value });
  };
  const history = useHistory();

  const addIngredientHandler = (e) => {
    if (ingredient === "") return;
    setSignup({
      ...signup,
      ingredient: [...signup.ingredient, { item: ingredient }],
    });
    setIngredient("");
  };

  const addStepHandler = (e) => {
    if (step.description === "" || step.photo === "") {
      console.log("kindly please enter both the detials");
      return;
    }
    setSignup({ ...signup, steps: step });
    setStep(initialStep);
  };
  const onAllergyChange = (e) => {
    setAllergy(e.target.value);
  };
  const addAllergyHandler = (e) => {
    if (allergy === "") return;
    setSignup({
      ...signup,
      allergies: [...signup.allergies, { allergy: allergy }],
    });
    setAllergy("");
  };

  
  if(account === '')
  {
    alert('User is not logged in');
    history.push('/login');
  }

  const clickHandler = async () => {
    // alert(login);
    console.log(signup);
    let response = await axios.post(`${url}/recipe/add`, signup);
    // alert(response);
    if (!response) {
      alert("invalid signup");
      return;
    }
    alert("signup successfully");
    setSignup(signupInitialValues);
    setAllergy("");
    setIngredient("");
    setStep(initialStep);
    history.push("/login");
  };

  return (
    <div
      style={{
        display: "block",
        width: "70%",
        margin: "100px auto",
        borderRadius: "5px",
        background: "rgba(200,200,200,0.3)",
        padding: 30,
      }}
      className="col-8"
    >
      <h4
        style={{
          color: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <FiLogIn style={{ color: "black", fontSize: 30 }} className="mr-2" />
        Add Recipe
      </h4>
      <Form>
        <Row>
          <Form.Group as={Col}>
            <Form.Label style={{ fontSize: 20, color: "black" }}>
              <span>Recipe Name</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => onInputChange(e)}
              value={signup.name}
              name="name"
              type="text"
              placeholder="Enter recipe name"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label style={{ fontSize: 20, color: "black" }}>
              <span>Introduction</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => onInputChange(e)}
              value={signup.introduction}
              name="introduction"
              type="text"
              placeholder="Enter Introduction of the recipe"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col}>
            <Form.Label style={{ fontSize: 20, color: "black" }}>
              <span>Time</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => onInputChange(e)}
              value={signup.time}
              name="time"
              type="text"
              placeholder="Enter Time in minutes"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label style={{ fontSize: 20, color: "black" }}>
              <span>Difficulty</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => onInputChange(e)}
              value={signup.difficulty}
              name="difficulty"
              type="text"
              placeholder="Enter Difficulty (Hard / Easy / Medium)"
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} className="d-flex-row justify-content-center">
            <Form.Label style={{ fontSize: 20, color: "black" }}>
              <span>Ingredients</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => onIngredientChange(e)}
              value={ingredient}
              name="Ingredient"
              type="text"
              placeholder="Enter Ingredient"
            />
            <Button
              size="lg"
              variant="success"
              onClick={() => addIngredientHandler()}
              style={{marginLeft:'auto',marginRight:'auto' , marginTop: 20, display: 'block'}}
            >
              Add Ingredient
            </Button>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label style={{ fontSize: 20, color: "black" }}>
              <span>Steps</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => onDesChange(e)}
              value={step.description}
              name="description"
              type="text"
              placeholder="Enter description"
              className="mb-3"
            />
            <Form.Control
              onChange={(e) => onPhotoChange(e)}
              value={step.photo}
              name="photo"
              type="text"
              placeholder="Enter photo"
            />
            <Button
              size="lg"
              variant="success"
              onClick={() => addStepHandler()}
              style={ {marginLeft:'auto',marginRight:'auto' , marginTop: 20, display: 'block'}}
            >
              Add Step
            </Button>
          </Form.Group>
        </Row>
        <Form.Group>
          <Form.Label style={{ fontSize: 20, color: "black" }}>
            <span>Type</span>
          </Form.Label>
          <Form.Control
            onChange={(e) => onInputChange(e)}
            value={signup.type}
            name="type"
            type="text"
            placeholder="Enter type(Veg/ Non Veg/ Vegan"
          />
        </Form.Group>
        <Row>
          <Form.Group as={Col}>
            <Form.Label style={{ fontSize: 20, color: "black" }}>
              <span>Allergies</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => onAllergyChange(e)}
              value={allergy}
              name="allergy"
              placeholder="Enter allergy"
            />
            <Button
              size="lg"
              variant="success"
              onClick={() => addAllergyHandler()}
              style={{marginLeft:'auto',marginRight:'auto' , marginTop: 20, display: 'block'}}
            >
              Add Allergy
            </Button>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label style={{ fontSize: 20, color: "black" }}>
              <span>Photo</span>
            </Form.Label>
            <Form.Control
              onChange={(e) => onInputChange(e)}
              value={signup.photo}
              name="photo"
              type="text"
              placeholder="Enter photo link"
            />
          </Form.Group>
        </Row>
        <Button
          size="lg"
          variant="success"
          onClick={() => clickHandler()}
          style={{marginLeft:'auto',marginRight:'auto' , marginTop: 20, display: 'block'}}
        >
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddRecipe;
