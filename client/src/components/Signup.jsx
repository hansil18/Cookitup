import { Form, Row, Col, Button } from 'react-bootstrap';
import { FiLogIn } from 'react-icons/fi'
import { authenticateSignup } from '../service/service';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';




const signupInitialValues = {
    username: '',
    password: ''
};


const Signup = () => {

    const [signup, setSignup] = useState(signupInitialValues);

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value });
    }

    const history = useHistory();
    
    const clickHandler = async () => {
        // alert(login);
        let response = await authenticateSignup(signup);
        // alert(response);
        if(!response) {
            alert("invalid signup");
            setSignup({ ...signup, password: ''});
            return;
        }
        alert("signup successfully");
        setSignup(signupInitialValues);
        history.push("/login");
    }

    return (
        <div style={{ display: 'block', 
        width: '30%',
        margin: '100px auto',
        borderRadius: '5px',
        background: 'rgba(200,200,200,0.3)',
        padding: 30,
        }} className="col-8">
            <h4 style={{color: 'black', display:'flex', justifyContent: "center", alignItems: "center", marginBottom: 15}}>
                <FiLogIn style={{color: 'black', fontSize: 30}} className="mr-2"/>
                SignUp
            </h4>
            <Form>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: 'black'}}>
                            <span>User Name</span>
                        </Form.Label>
                        <Form.Control onChange={(e) => onInputChange(e)} value={signup.username} name="username" type="text" placeholder="Enter User Name"/>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col}>
                        <Form.Label style={{fontSize: 20, color: 'black'}}>
                            <span>Password</span>
                        </Form.Label> 
                        <Form.Control onChange={(e) => onInputChange(e)} value={signup.password} name="password" type="password" placeholder="Enter Password"/>
                    </Form.Group>
                </Row>
                <Button size="lg" variant="success" onClick={() => clickHandler()} style={{marginLeft: '35%', marginTop: 20}}>
                    SignUp
                </Button>
            </Form>
        </div>
    ) 
}

export default Signup;