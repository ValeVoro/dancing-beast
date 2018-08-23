import React, { Component} from "react";
import ReactDOM  from "react-dom";
 
 export class LoginForm extends React.Component {
	 constructor(props) {
		    super(props);
		    this.state = {
			};
	 }
	 render() {
	 return (
			 <div className="row">
		       
		    	<div className="col-lg-12">
		    	    <label>Your beast's name</label>
		    	    <div className="form-group">
		    			<input type="text" name="username" id="email" className="form-control" placeholder=""></input>
		    		</div>
		    	</div>
		    	
		    	<div className="col-lg-12">
		    	    <label>Password</label>
		    	    <div className="form-group">
						<input type="password" name="password" id="password" className="form-control" placeholder=""></input>
		    		</div>
		    	</div>
		    	
				<div className="col-lg-12 ">
				    <button type="submit" className="btn btn-default login-btn">
						<span>LOGIN</span>
					</button>
				</div>  
				    
				<p className="register-msg">Don't have a beast yet?</p>
				

				
			 </div>
	  );
	 }
 };