import { BrowserRouter, Switch, Route } from "react-router-dom";
import {} from "react-router-dom";
import Header from './components/Header.jsx';
import Recipe from "./components/Recipe.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RecipeCard from "./components/RecipeCard.jsx";
import Login from "./components/Login.jsx";
import LoginState from "./controller/loginstate.jsx";
import Signup from "./components/Signup.jsx";
import AddRecipe from "./components/AddRecipe.jsx";

function App() {
	return (
		<LoginState>
			<BrowserRouter>
				<Header/>
				<Switch>
					<Route exact path='/' component={RecipeCard} /> 
					<Route exact path='/Login' component={Login} />
					<Route exact path='/Signup' component={Signup} />
					<Route exact path="/add" component={AddRecipe} />
					<Route path="/recipe/:id" component={Recipe} />
				</Switch>
			</BrowserRouter>
		</LoginState>
	);
}

export default App;
