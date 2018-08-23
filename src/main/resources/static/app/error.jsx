import React, { Component} from "react";
import ReactDOM  from "react-dom";

 export class Error extends React.Component {
	 constructor(props) {
		    super(props);
	 }
	 
	 render() {
		 console.log(ReactDOM);
	 return (
	 <div>
		<h1>Sorry, something went wrong!</h1>
		<a href="/dashboard" className="btn btn-warning col-12">Back To Homepage</a>
	</div>
	  );
	 }
 };