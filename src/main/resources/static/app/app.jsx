import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, IndexRoute, Link, Switch, Schedule } from 'react-router-dom';
import { LoginForm } from './login.jsx';
import { Register, PickBeast, PickName, PickPassword } from './register.jsx';
import { Dashboard, ProfileSummary, ProfileSections, Modal, Achievements, DanceCarousel, Gallery } from './dashboard.jsx';
import { ProgressBar, Stage, DefaultCanvas, MovementCanvas, Resultpane } from './dance.jsx';
import { Error } from './error.jsx';


class App extends React.Component {
	 render() {
		 console.log(ReactDOM);
	 return (
		<BrowserRouter>
			 <Switch>
			 	<Route exact path='/login' component={LoginForm}/>
			 	<Route exact path='/loginfailure' component={LoginForm}/>
			 	<Route exact path='/' component={Dashboard}/>
			 	<Route path='/registration' component={Register}/>
			 	<Route path='/dashboard' component={Dashboard}/>
			 	<Route path='/start*' component={Stage}/>
			 	<Route exact path='/error' component={Error}/>
			  </Switch>
		</BrowserRouter>
	  );
	 }
 };
 
 ReactDOM.render(
		 	<App />, 
		 document.getElementById('init')
 );