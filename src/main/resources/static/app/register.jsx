import React, { Component} from "react";
import ReactDOM  from "react-dom";
import * as requests from '../js/requests.js';

export class Register extends React.Component {
	 constructor() {
		    super();
		    this.state = {
		    	visible: 'PickBeast',
		    	name: '',
		    	password: '',
		    	beast: '',
		    	complete: false
		    };

		    this.handleChange = this.handleChange.bind(this);
		    this.sendRegistration = this.sendRegistration.bind(this);
	 }

	 handleChange(newPar) {
		
		    const key = newPar[0];
		    const value = newPar[1];
		    
		    
		    console.log("Register component - change invoked");
		    console.log(this);
		    this.setState({[key]: value});
		    console.log("New register state:");
		    console.log(this.state);
		    if(key == 'beast'){
		    	this.setState({visible: 'PickName'});
		    }else if(key == 'name'){
		    	this.setState({visible: 'pickPassword'});
		    }else if(key == 'password' && this.state.complete){
		    	this.sendRegistration(value);
		    }
		    
	 }
	
	 sendRegistration(value) {
		 const newbeast = this.state.beast;
		 const newname = this.state.name;
		 const newpassword = value;
		 const obj = {"beast": newbeast, "name": newname, "password": newpassword};
		   
		 requests.postData(`http://${window.location.host}/sendRegistration`, obj, (d) => {
			 window.location = `http://${window.location.host}/dashboard`;
		 });
		    		   
	 }
	 
	 render() {
		 console.log(ReactDOM);
		 let activeBlock = this.state.visible == 'PickBeast' ?
			(<PickBeast handleChange={this.handleChange} creatureCount={3} /> ) :
				(this.state.visible == 'PickName' ?
						(<PickName handleChange={this.handleChange} />) :
						(<PickPassword handleChange={this.handleChange} />)
				);
		 
		 
	 return (
			 <div className="registerCont">
			 	<div className="container">
			 		<div className="col-lg-6 offset-lg-3 justify-content-center">
           
			 			<form className="register" role="form" action="/register"  method="POST" enctype="utf8">

			 			{activeBlock}
			 			
			 			</form> 
			
			 		</div> 
			 	</div>
			 </div>
	  );
	 }
 };
 
 
 
 export class PickBeast extends React.Component {
	 constructor(props) {
		    super(props);
		    this.state = {
		    	origin: 'beast',
		    	value: '1', 
		    	complete: false
		    };

		    this.handleSubmit = this.handleSubmit.bind(this);
		    this.getChosen = this.getChosen.bind(this);
		    this.skipBack = this.skipBack.bind(this);
		    this.preventDefault = this.preventDefault.bind(this);
	 }
	 skipBack(e){
		 e.preventDefault();
		 window.location = `${window.location.port}/login`;
	 }
	 
	 preventDefault(event){
		 event.preventDefault();
	 }
	 
	 handleSubmit(event) {
		    event.preventDefault();
		    const inputType = this.state.origin;
		    const value = this.state.value;
		    this.setState({complete: true});
		    this.props.handleChange([inputType, value]);

	 }
	  getChosen(dir) {
		  
		  const direction = parseInt(dir);
		  const value = parseInt(this.state.value);
		  const creatureCount = this.props.creatureCount;
		  var newVal = value + direction;
		  if(newVal == creatureCount){
			  newVal = 1;
		  }else if(newVal == 0){
			  newVal = creatureCount-1;
		  }
		  const video = this.refs[newVal];
		  video.currentTime = 0;
		  video.play();
		  this.setState({value: `${newVal}`});	  
	  }
	
	  
	 render() {
	  var indents = [];
	  for (var i = 1; i < this.props.creatureCount; i++) {
	      indents.push(	<div className={"carousel-item " + (i==this.state.value ? 'active' : '')} id={`carouselItem${i}`}>
	      <video ref={i} width="400" height="300"  autoplay="true" className="d-block w-100">
	      	<source src={`/img/avatars/${i}.mp4`} type="video/mp4"></source>
	      	no support
	      </video>
	      </div>);
	  }
 
	 return (
	  <div>
	  <h1>Pick your beast</h1>
	  <div id="carouselControls" className="carousel slide" data-keyboard="false" data-ride="carousel" data-interval="false">
	  <div className="carousel-inner">
	    
      {indents}
	  
	  </div>
	  <a className="carousel-control-prev" href="#carouselControls" role="button" onClick={(par) => this.getChosen(-1)} data-slide="prev">
	    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
	    <span className="sr-only">Previous</span>
	  </a>
	  <a className="carousel-control-next" href="#carouselControls" role="button" onClick={(par) => this.getChosen(1)} data-slide="next">
	    <span className="carousel-control-next-icon" aria-hidden="true"></span>
	    <span className="sr-only">Next</span>
	  </a>
	</div>
	  
		<button  className="btn btn-warning col-6 backtoLoginButton" onClick={this.skipBack}>
 		<i className="fa fa-angle-double-left"></i><span> back to login</span>
		</button>
		<button title={(this.state.value == 1 ? '' : 'This beast is not available yet')} className={"btn btn-success col-4 offset-1 " + (this.state.value == 1  ? '' : 'disabled')} onClick={this.state.value != 1  ? this.preventDefault : this.handleSubmit}>
		<span>next </span><i className="fa fa-angle-double-right"></i>
	    </button>
	  </div>
	  );
	 }
 };
 
 
 export class PickName extends React.Component {
	 constructor(props) {
		    super(props);
		    this.state = {
		    	origin: 'name',
		    	value: '', 
		    	taken: '',
		    	complete: false
		    };

		    this.handleSubmit = this.handleSubmit.bind(this);
		    this.handleChange = this.handleChange.bind(this);
		    this.skipBack = this.skipBack.bind(this);
	 }

	 handleSubmit(event) {
		    event.preventDefault();
		    const inputType = this.state.origin;
		    const value = this.state.value;
		    if(value.length > 0 && !this.state.taken){
		    	this.setState({complete: true});
		        this.props.handleChange([inputType, value]);

		    }

	 }
	 
	 skipBack(event){
		 this.props.handleChange(['name', '']);
		 this.props.handleChange(['visible', 'PickBeast']);
	 }
	 
	  handleChange(event) {
		    const value = event.target.value;

		    requests.getData(`http://${window.location.host}/setName?name=${value}`, (data) => {
		    	console.log("Checking user name...");
		    	console.log(data)
		    	if(data){
		    		this.setState({value: `${value}`});
		    		this.setState({taken: false});
		    	}else{
		    		this.setState({taken: true});
		    	}
		    	
		    });
	  }
	  
	 render() {
	
	 return (
			
	    
	     <form>
	       <h1>Your beast needs a name</h1>
	    	  <div className="form-group">
	    			<input type="text" name="name"  className="form-control"  onChange={this.handleChange}></input>
	    	  </div>
	    	  <div className={(this.state.value.length > 0 ? '' : 'hiddenSec') + ' ' + (this.state.taken ? 'alert alert-danger' : 'alert alert-success')}>{this.state.taken ? 'This name is taken' : 'Name is available'}</div>
	 		<button  className="btn btn-warning col-4 offset-1" onClick={this.skipBack}>
	 		<i className="fa fa-angle-double-left"></i><span> back</span>
			</button>
			<button  className={"btn btn-success col-4 offset-2 " + ((this.state.value.length > 0 && !this.state.taken) ? '' : 'disabled')} onClick={this.handleSubmit}>
				<span>next </span><i className="fa fa-angle-double-right"></i>
			</button>
		</form>
	  );
	 }
 };
 
 export class PickPassword extends React.Component {
	 constructor(props) {
		    super(props);
		    this.state = {
		    	origin: 'password',
		    	value: '', 
		    	complete: false
		    };

		    this.handleSubmit = this.handleSubmit.bind(this);
		    this.handleChange = this.handleChange.bind(this);
		    this.skipBack = this.skipBack.bind(this);
	 }
	 handleSubmit(event) {
		    event.preventDefault();
		    const inputType = this.state.origin;
		    const value = this.state.value;
		    this.setState({complete: true});
		    this.props.handleChange([inputType, value]);
		    this.props.handleChange(['complete', true]);
	}
	 
	 skipBack(event){
		 this.props.handleChange(['password', '']);
		 this.props.handleChange(['visible', 'PickName']);
	 }
	  handleChange(event) {
		    const value = event.target.value;
		    this.setState({value: `${value}`});
	  }
	  
	 render() {
	
	 return (
		 
	    	  <div className="form-group">
	    	  <h1>Set the password</h1>
	    			<input type="text" name="password"  onChange={this.handleChange} className="form-control" placeholder=""></input>
	  	    	<div className={((this.state.value.length < 5 && this.state.value.length > 0) ? 'alert alert-danger' : 'hiddenSec')}>Your password must be at least 5 characters long</div>
	  	 		<button  className="btn btn-warning col-4 offset-1" onClick={this.skipBack}>
	  	 		<i className="fa fa-angle-double-left"></i><span> back</span>
	  			</button>
	  			<button  className={"btn btn-success col-4 offset-2 " + (this.state.value.length < 5 ? 'disabled' : '')} onClick={this.handleSubmit}>
	  				<span>Done! </span></button>
	    	 </div>

	  );
	 }
 };
