import React, { Component} from "react";
import ReactDOM  from "react-dom";
import * as requests from '../js/requests.js';

export class Dashboard extends React.Component {
	 constructor(props) {
		    super(props);
		    this.state = {
		    	name: sessionUsername,
		    	beast: sessionBeast, 
		    	beastType: sessionBeastType,
		    	status: status
		    };

	 }
	 
	 render() {
		 console.log(ReactDOM);
	 return (
		<div className="dashboardCont">
			<div className="container">
				<div className="col-12  justify-content-center">
					<div className="dashboard">
						<h1>Dashboard</h1>
						<div className="row">
							<ProfileSummary status={this.state.status} name={this.state.name} beast={this.state.beast} beastType={this.state.beastType}/>
							<ProfileSections />
						</div>
					</div> 	
				</div> 
			</div>
		</div>
	  );
	 }
 };

  export class ProfileSummary extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
		    name: this.props.name,
		    beast: this.props.beast, 
		    beastType: this.props.beastType,
		    changeApproved: false
		};
	    this.handleNameEdit = this.handleNameEdit.bind(this);

	}
	handleNameEdit(value){
		 var that = this;
		 requests.postData(`http://${window.location.host}/editName`, value);
	}

	
	 render() {
		 console.log(ReactDOM);
	 return (
		<div className="col-md-4 dashPerson">
		  <div className="container">
			<div className="cardHeader"></div>
			<div className="avatar">
				<img className="avatarImage" src={`/img/avatars/${this.props.beast}-thumb.png`} ></img>
			</div>
			<div className="info">
				<h2>{this.props.name} 
					<i data-toggle="modal" data-target="#modal" className="fa fa-edit" title="edit name"></i>
					
				</h2>
				<p>the {sessionBeastType} <a href="/logout"><i title="Log out" className="fa fa-sign-out"></i></a></p>
			</div>
			<hr></hr>
			<div className="col-12">
				<img className="col-8  col-lg-4 m-1" src={status=='Newbie' ? "/img/Newbie.gif" : "/img/oldschool.jpg"}></img>
				<h6>{this.props.status}</h6>
				</div>
			<Modal modalTitle="Edit name" handleEditSubmit={this.handleNameEdit} currentInput={this.props.name} />
		  </div>
		</div>
	  );
	 }
 };
 
 
 export class ProfileSections extends React.Component {
	 render() {
		 console.log(ReactDOM);
	 return (
		<div className="col-md-8 dashSections">
		  <div className="container">
			<div className="tab" role="tabpanel">
				<ul className="nav nav-tabs" role="tablist">
					<li className="nav-item ">
						<a className="nav-link active" href="#userAchievements" role="tab" data-toggle="tab">
						<span><i className="fa fa-star"></i></span>
						ACHIEVEMENTS
						</a>
					</li>
					<li className="nav-item ">
						<a className="nav-link" href="#userGallery" role="tab" data-toggle="tab">
						<span><i className="fa fa-camera"></i></span>
						GALLERY
						</a>
					</li>
				</ul>
				<div className="tab-content tabs">
					<Achievements />
					<Gallery />
				</div>
			</div>
		  </div>
		</div>
	  );
	 }
 };
 
 
 export class Modal extends React.Component {
	constructor(props) {
		super(props);
	    this.state = {
			changeApproved: false,
			value: this.props.currentInput
		};
		this.handleClick = this.handleClick.bind(this);
		this.readInput = this.readInput.bind(this);
		this.setState = this.setState.bind(this);
	}
	handleClick(event){
		if(this.state.changeApproved){
			this.props.handleEditSubmit(this.state.value);
		}
	}
	readInput(event){
	    const value = event.target.value;
	    this.setState({value: `${value}`});
	    
	    requests.getData(`http://${window.location.host}/setName?name=${value}`, (data) => {
	    	console.log("Checking user name...");
	    	console.log(data)
	    	if(data && this.state.value.length > 0){
	    		this.setState({changeApproved: true});
	    	}else{
	    		this.setState({changeApproved: false});
	    	}
	    });
	    
	   
	}
	 render() {
		 console.log(ReactDOM);
	 return (
			 <div className="modal fade" id="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			  <div className="modal-dialog modal-dialog-centered" role="document">
			    <div className="modal-content">
			      <div className="modal-header">
			        <h5 className="modal-title" id="exampleModalLongTitle">{this.props.modalTitle}</h5>
			
			      </div>
			      <div className="modal-body">
			        <input className="input " value={this.state.value} onChange={this.readInput}></input>
			    	<div className={"alertInModal " + (this.state.changeApproved ? 'alert alert-success' : (this.state.value==this.props.currentInput ? 'alert alert-warning' : (this.state.value.length > 0 ? 'alert alert-danger' : 'alert alert-warning')))}>{this.state.changeApproved ? 'This name is available' : (this.state.value==this.props.currentInput ? 'This is your current name' : (this.state.value.length > 0 ? 'Name is taken' : 'Name cannot be empty'))}</div>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
			        <button type="button" onClick={this.handleClick} className={"btn btn-success " + (this.state.changeApproved ? '' : 'disabled')} >Save </button>
			      </div>
			    </div>
			  </div>
			</div>
	  );
	 }
 };
 
 export class Achievements extends React.Component {
	 constructor(props) {
		    super(props);
	 }
	 
	 render() {
		 var dancesNumber = Object.keys(requests.groupJSON(dances, "dance"));
		 var scoresNumber = requests.groupJSON(scores, "dance");

		 var carousels = [];
		 for(var i=0; i< dances.length; i++){
			 var nam = dances[i][0];
			
		
			 var lev = dances[i][1];
			 console.log(scores);

			 var sc = scoresNumber[nam] ? scoresNumber[nam] : 0;
			 
			 carousels.push(<DanceCarousel id={i} name={nam} levels={lev} score={sc} />);
		 }
	 return (
	  <div className="tab-pane fade show active" id="userAchievements" role="tabpanel">
	
		  { carousels }
		
	  </div>
	  );
	 }
 };
 
 export class DanceCarousel extends React.Component {
	 constructor(props) {
		    super(props);
			this.handleClick = this.handleClick.bind(this);
	 }
	
	handleClick(event){
	    const dance = event.target.getAttribute("dance");
	    const level = event.target.getAttribute("level");
	    if(dance != "Hip hop" || level != 1){
	    	alert("Sorry, this level is not developed yet!");
	    }else{
		    window.location = `http://${window.location.host}/start?dance=${dance}&level=${level}`;

	    }

	}
	 render() {
		 var indents = [];
		 var contNum =  Math.ceil( parseInt(this.props.levels) / 3);
		 var inLast = parseInt(this.props.levels) % 3 == 0 ? 3 : parseInt(this.props.levels) % 3;
		 var markDisabled = false;
		 for (var i = 0; i < contNum; i++) { 
			 var singles = [];
			 
			 if(i == contNum-1){
				 for(var a = 3*i; a < this.props.levels; a++){

					 let thumb = `url( /img/carousel-thumb/${this.props.id+1}_${a+1}.png)`;
					 let myScore = this.props.score[a] ? this.props.score[a].score : 0;
					 singles.push(
					<div level={a+1} dance={this.props.name} className={"col-4 singleLevel "+ (markDisabled ? "grayFilt" : "")} onClick={markDisabled ? "" : this.handleClick}>
					 <div className="singleLevelInner " style={{backgroundImage: thumb}}>
					 	<p>score<br></br>{myScore}</p>
					 	
					 </div>
					 <span>Level {a+1}</span>
					</div>);
					 if(myScore==0){
						 markDisabled = true;
					 }
				 }
			 }else{
				 for(var a = 3*i; a < (3*i+3); a++){
					 let thumb = `url( /img/carousel-thumb/${this.props.id+1}_${a+1}.png)`;
					 console.log(this.props.score);
					 let myScore = this.props.score[a] ? this.props.score[a].score : 0;

					 singles.push(
					<div level={a+1} dance={this.props.name} className={"col-4 singleLevel "+ (markDisabled ? "grayFilt" : "")} onClick={markDisabled ? "" : this.handleClick}>
					 <div className="singleLevelInner " style={{backgroundImage: thumb}}>
					 	<p>score<br></br>{myScore}</p>
					 	
					 </div>
					 <span>Level {a+1}</span>
					</div>);
					 if(myScore==0){
						 markDisabled = true;
					 }
				}
			 }
		     indents.push(	<div className={"carousel-item " + (i==0 ? 'active' : '')} id={`levelCarouselItem${i}`}>
		     	{singles}
		     </div>);
		  }
		 
	 return (
		<div className="carouselWrapper">
		<h4 className="col-12">{this.props.name}</h4>
		<div className="row" id="dancesCarousel">
		
			<div id={"carouselControls" + this.props.id} className="carousel slide col-12" data-wrap="false" data-ride="carousel" data-interval="false">
				<div className="carousel-inner row">
			    
				{indents}
			  
				</div>
				<a className="carousel-control-prev" href={"#carouselControls" + this.props.id} role="button"  data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true"></span>
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href={"#carouselControls" + this.props.id} role="button"  data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true"></span>
					<span className="sr-only">Next</span>
				</a>
			</div>
		</div>
		</div>
	  );
	 }
 };
 
 export class Gallery extends React.Component {
	 constructor(props) {
		    super(props);
	 }
	 
	 render() {
		 console.log(ReactDOM);
	 return (
		<div className="tab-pane fade" id="userGallery" role="tabpanel">
			<p>This feature is under construction! <br></br><br></br>
				<i className="fa fa-wrench"></i>
			</p>
		</div>
	  );
	 }
 };