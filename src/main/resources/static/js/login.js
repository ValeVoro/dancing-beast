var Router = window.ReactRouterDOM.BrowserRouter;
var Route = window.ReactRouter.Route;
var IndexRoute = window.ReactRouter.IndexRoute;
var Link = window.ReactRouter.Link;
var Switch = window.ReactRouter.Switch;
var Schedule = window.ReactRouter.Schedule;

class App extends React.Component {
	 render() {
		 console.log(ReactDOM);
	 return (
		<Router>
			 <Switch>
			 	<Route exact path='/' component={Dashboard}/>
			 	<Route path='/registration' component={Register}/>
			 	<Route path='/dashboard' component={Dashboard}/>
			 	<Route path='/start*' component={Stage}/>
			  </Switch>
		</Router>
	  );
	 }
 };


 
 class Register extends React.Component {
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
		    }else if(key == 'password'){
		    	this.sendRegistration(value);
		    }
		    
	 }
	
	 sendRegistration(value) {
		 const newbeast = this.state.beast;
		 const newname = this.state.name;
		 const newpassword = value;
		 const obj = {"beast": newbeast, "name": newname, "password": newpassword};
		   
		 postData(`http://${window.location.host}/sendRegistration`, obj, (d) => {
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
			 <div class="registerCont">
			 	<div class="container">
			 		<div class="col-lg-6 offset-lg-3 justify-content-center">
           
			 			<form className="register" role="form" action="/register"  method="POST" enctype="utf8">

			 			{activeBlock}
			 			
			 			</form> 
			
			 		</div> 
			 	</div>
			 </div>
	  );
	 }
 };
 
 
 
 class PickBeast extends React.Component {
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
	      <video ref={i} width="400" height="300"  autoplay="true" class="d-block w-100">
	      	<source src={`/img/avatars/${i}.mp4`} type="video/mp4"></source>
	      	no support
	      </video>
	      </div>);
	  }
 
	 return (
	  <div>
	  <h1>Pick your beast</h1>
	  <div id="carouselControls" class="carousel slide" data-ride="carousel" data-interval="false">
	  <div class="carousel-inner">
	    
      {indents}
	  
	  </div>
	  <a class="carousel-control-prev" href="#carouselControls" role="button" onClick={(par) => this.getChosen(-1)} data-slide="prev">
	    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
	    <span class="sr-only">Previous</span>
	  </a>
	  <a class="carousel-control-next" href="#carouselControls" role="button" onClick={(par) => this.getChosen(1)} data-slide="next">
	    <span class="carousel-control-next-icon" aria-hidden="true"></span>
	    <span class="sr-only">Next</span>
	  </a>
	</div>
	  
		<button  class="btn btn-warning col-6 backtoLoginButton" onClick={this.skipBack}>
 		<i class="fa fa-angle-double-left"></i><span> back to login</span>
		</button>
		<button title={(this.state.value == 1 ? '' : 'This beast is not available yet')} class={"btn btn-success col-4 offset-1 " + (this.state.value == 1  ? '' : 'disabled')} onClick={this.state.value != 1  ? this.preventDefault : this.handleSubmit}>
		<span>next </span><i class="fa fa-angle-double-right"></i>
	    </button>
	  </div>
	  );
	 }
 };
 
 
 class PickName extends React.Component {
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

		    getData(`http://${window.location.host}/setName?name=${value}`, (data) => {
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
	    	  <div class="form-group">
	    			<input type="text" name="name"  class="form-control"  onChange={this.handleChange}></input>
	    	  </div>
	    	  <div class={(this.state.value.length > 0 ? '' : 'hiddenSec') + ' ' + (this.state.taken ? 'alert alert-danger' : 'alert alert-success')}>{this.state.taken ? 'This name is taken' : 'Name is available'}</div>
	 		<button  class="btn btn-warning col-4 offset-1" onClick={this.skipBack}>
	 		<i class="fa fa-angle-double-left"></i><span> back</span>
			</button>
			<button  class={"btn btn-success col-4 offset-2 " + ((this.state.value.length > 0 && !this.state.taken) ? '' : 'disabled')} onClick={this.handleSubmit}>
				<span>next </span><i class="fa fa-angle-double-right"></i>
			</button>
		</form>
	  );
	 }
 };
 
 class PickPassword extends React.Component {
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
		 
	    	  <div class="form-group">
	    	  <h1>Set the password</h1>
	    			<input type="text" name="password"  onChange={this.handleChange} class="form-control" placeholder=""></input>
	  	    	<div class={((this.state.value.length < 5 && this.state.value.length > 0) ? 'alert alert-danger' : 'hiddenSec')}>Your password must be at least 5 characters long</div>
	  	 		<button  class="btn btn-warning col-4 offset-1" onClick={this.skipBack}>
	  	 		<i class="fa fa-angle-double-left"></i><span> back</span>
	  			</button>
	  			<button  class={"btn btn-success col-4 offset-2 " + (this.state.value.length < 5 ? 'disabled' : '')} onClick={this.handleSubmit}>
	  				<span>Done! </span></button>
	    	 </div>

	  );
	 }
 };

 class Dashboard extends React.Component {
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
		<div class="dashboardCont">
			<div class="container">
				<div class="col-12  justify-content-center">
					<div className="dashboard">
						<h1>Dashboard</h1>
						<div class="row">
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

  class ProfileSummary extends React.Component {
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
		 postData(`http://${window.location.host}/editName`, value);
	}

	
	 render() {
		 console.log(ReactDOM);
	 return (
		<div class="col-md-4 dashPerson">
		  <div class="container">
			<div class="cardHeader"></div>
			<div class="avatar">
				<img class="avatarImage" src={`/img/avatars/${this.props.beast}-thumb.png`} ></img>
			</div>
			<div class="info">
				<h2>{this.props.name} 
					<i data-toggle="modal" data-target="#modal" class="fa fa-edit" title="edit name"></i>
					
				</h2>
				<p>the {sessionBeastType} <a href="/logout"><i title="Log out" class="fa fa-sign-out"></i></a></p>
			</div>
			<hr></hr>
			<div class="col-12">
				<img class="col-8  col-lg-4 m-1" src={status=='Newbie' ? "/img/Newbie.gif" : "/img/oldschool.jpg"}></img>
				<h6>{this.props.status}</h6>
				</div>
			<Modal modalTitle="Edit name" handleEditSubmit={this.handleNameEdit} currentInput={this.props.name} />
		  </div>
		</div>
	  );
	 }
 };
 
 
 class ProfileSections extends React.Component {
	 render() {
		 console.log(ReactDOM);
	 return (
		<div class="col-md-8 dashSections">
		  <div class="container">
			<div class="tab" role="tabpanel">
				<ul class="nav nav-tabs" role="tablist">
					<li class="nav-item ">
						<a class="nav-link active" href="#userAchievements" role="tab" data-toggle="tab">
						<span><i class="fa fa-star"></i></span>
						ACHIEVEMENTS
						</a>
					</li>
					<li class="nav-item ">
						<a class="nav-link" href="#userGallery" role="tab" data-toggle="tab">
						<span><i class="fa fa-camera"></i></span>
						GALLERY
						</a>
					</li>
				</ul>
				<div class="tab-content tabs">
					<Achievements />
					<Gallery />
				</div>
			</div>
		  </div>
		</div>
	  );
	 }
 };
 
 
 class Modal extends React.Component {
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
	    
	    getData(`http://${window.location.host}/setName?name=${value}`, (data) => {
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
			 <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			  <div class="modal-dialog modal-dialog-centered" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLongTitle">{this.props.modalTitle}</h5>
			
			      </div>
			      <div class="modal-body">
			        <input class="input " value={this.state.value} onChange={this.readInput}></input>
			    	<div class={"alertInModal " + (this.state.changeApproved ? 'alert alert-success' : (this.state.value==this.props.currentInput ? 'alert alert-warning' : (this.state.value.length > 0 ? 'alert alert-danger' : 'alert alert-warning')))}>{this.state.changeApproved ? 'This name is available' : (this.state.value==this.props.currentInput ? 'This is your current name' : (this.state.value.length > 0 ? 'Name is taken' : 'Name cannot be empty'))}</div>
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
			        <button type="button" onClick={this.handleClick} class={"btn btn-success " + (this.state.changeApproved ? '' : 'disabled')} >Save </button>
			      </div>
			    </div>
			  </div>
			</div>
	  );
	 }
 };
 
 class Achievements extends React.Component {
	 constructor(props) {
		    super(props);
	 }
	 
	 render() {
		 var dancesNumber = Object.keys(groupJSON(dances, "dance"));
		 var scoresNumber = groupJSON(scores, "dance");

		 var carousels = [];
		 for(var i=0; i< dances.length; i++){
			 var nam = dances[i][0];
			
		
			 var lev = dances[i][1];
			 console.log(scores);

			 var sc = scoresNumber[nam] ? scoresNumber[nam] : 0;
			 
			 carousels.push(<DanceCarousel id={i} name={nam} levels={lev} score={sc} />);
		 }
	 return (
	  <div class="tab-pane fade show active" id="userAchievements" role="tabpanel">
	
		  { carousels }
		
	  </div>
	  );
	 }
 };
 
 class DanceCarousel extends React.Component {
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
					<div level={a+1} dance={this.props.name} class={"col-4 singleLevel "+ (markDisabled ? "grayFilt" : "")} onClick={markDisabled ? "" : this.handleClick}>
					 <div class="singleLevelInner " style={{backgroundImage: thumb}}>
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
					<div level={a+1} dance={this.props.name} class={"col-4 singleLevel "+ (markDisabled ? "grayFilt" : "")} onClick={markDisabled ? "" : this.handleClick}>
					 <div class="singleLevelInner " style={{backgroundImage: thumb}}>
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
		<div class="carouselWrapper">
		<h4 class="col-12">{this.props.name}</h4>
		<div class="row" id="dancesCarousel">
		
			<div id={"carouselControls" + this.props.id} class="carousel slide col-12" data-wrap="false" data-ride="carousel" data-interval="false">
				<div class="carousel-inner row">
			    
				{indents}
			  
				</div>
				<a class="carousel-control-prev" href={"#carouselControls" + this.props.id} role="button"  data-slide="prev">
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a>
				<a class="carousel-control-next" href={"#carouselControls" + this.props.id} role="button"  data-slide="next">
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
		</div>
		</div>
	  );
	 }
 };
 
 class Gallery extends React.Component {
	 constructor(props) {
		    super(props);
	 }
	 
	 render() {
		 console.log(ReactDOM);
	 return (
		<div class="tab-pane fade" id="userGallery" role="tabpanel">
			<p>This feature is under construction! <br></br><br></br>
				<i class="fa fa-wrench"></i>
			</p>
		</div>
	  );
	 }
 };
 
 class ProgressBar extends React.Component {
	 constructor(props) {
		    super(props);
		    this.state = {
		    		dur: levelInfo[0].duration,
			    	anim: ""
			};
		    this.state.anim = this.state.dur + "s";
	 }
	 render() {
		 var dur2 = this.props.started ? this.state.anim : "";
	 return (
		<div class={"col-12 " + (this.props.visible ? "" : "hiddenSec")}>
			<div class="progress col-6">
				<div class={"progress-bar progress-bar-striped progress-bar-animated"} style={{animation: "progressBarFill steps(100, start) " + dur2}} id="progressBar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
			</div>
		</div>
	  );
	 }
 };
 
 class Stage extends React.Component {
	 constructor(props) {
		 super(props);
	 }
	 shouldComponentUpdate(nextProps, nextState) {
		    return false;
	}

	 componentDidMount(){
	
		 var dur = levelInfo[0].duration;
		 console.log(dur);
	
	   
	 }
	 
	 render() {
		 console.log(ReactDOM);
	 return (
		<div class="danceCont">
			<div class="container">
				<div class="col-12  justify-content-center">
				
					<div className=" row danceFloor">
					
					
					<div id="staticCanvas" class="hiddensec"></div>
					<DefaultCanvas bpm={levelInfo[0].bpm} beastNum={sessionBeast} defMovs={levelInfo[0].defaultMovSeq} />	
							
					</div> 	
				</div> 
			</div>
		</div>
	  );
	 }
 };
 
 class DefaultCanvas extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state = {
			visible: true,
			instruction: false,
			buttons: true,
			endInstructionButton: false,
			movement: false
		 };
		 this.handlePlay = this.handlePlay.bind(this);
		 this.handleEnd = this.handleEnd.bind(this);
		 this.handleSkip = this.handleSkip.bind(this);
		 this.handleLevelStart = this.handleLevelStart.bind(this);

	 }
	 handlePlay(){
		 this.state.instruction = true;
		 this.state.buttons = false;
		 this.state.endInstructionButton = false;
		 this.setState(this.state);
	 }
	 handleLevelStart(){
		 this.state.instruction = false;
		 this.state.movement = true;
		 this.state.endInstructionButton = false;
		 this.setState(this.state); 
	 }
	 handleEnd(){
		 this.state.endInstructionButton = true;
		 this.setState(this.state);
	 }
	 handleSkip(){
		 this.state.buttons = false;
		 this.state.movement = true;
		 this.setState(this.state);
	 }
	 componentDidUpdate(){
		 if(this.state.instruction && !this.state.endInstructionButton){
			 setTimeout( () => { this.refs.vid_instruction.play()}, 4000);
		 }
	 }
	 
	 render() {
		 var mov = "";
		 if(this.state.movement){
			 mov =  <MovementCanvas />
		 }
		 
	 return (
		<div id="defaultCanvas" class={"" + (this.state.visible ? "" : "hiddenSec")}>
			<video onEnded={this.handleEnd} class={"col-12 " + (this.state.instruction ? "" : "hiddenSec")}  ref="vid_instruction" >
				<source src="/img/defaults/instruction-final.mp4" ref="videoMovementSrc" type="video/mp4"></source>
			</video>
			<a onClick={this.handlePlay} class={"btn btn-danger col-10 offset-1 " + (this.state.buttons ? "" : "hiddenSec")}>Play instruction</a>
			<a onClick={this.handleSkip} class={"btn btn-warning col-6 offset-3 " + (this.state.buttons ? "" : "hiddenSec")}>Skip</a>
			<a onClick={this.handlePlay} class={"btn btn-danger afterInst col-10 offset-1 " + (this.state.endInstructionButton ? "" : "hiddenSec")}>Play again</a>

			<a onClick={this.handleLevelStart} class={"btn btn-success afterInst col-10 offset-1 " + (this.state.endInstructionButton ? "" : "hiddenSec")}>Dance!</a>

			{mov}
		</div>
	  );
	 }
 };
 
 class MovementCanvas extends React.Component {
	 constructor(props) {
		 super(props);
		 this.state = {
		  		dur: levelInfo[0].duration,
		  		visible: true,
		  		hj: false,
		  		flare: false,
		  		started: false,
		  		result: -1,
		  		msg: '',
			   	seq: []
		 };
		 this.setDefault = this.setDefault.bind(this);
		 this.handleKeyDown = this.handleKeyDown.bind(this);
		 this.handleKeyUp = this.handleKeyUp.bind(this);
		 this.handleDanceEnd = this.handleDanceEnd.bind(this);
		 this.handleStart = this.handleStart.bind(this);
		 this.handleNewStart = this.handleNewStart.bind(this);

	 }
	 handleStart(){
		 document.onkeydown = (e) => { this.handleKeyDown(event.keyCode) }; 
		 document.onkeyup = (e) => { this.handleKeyUp(event.keyCode) };	 
		 setTimeout( () => {
			 this.state.seq.push({"keyId": 0, "pressed": true, "time": Date.now()});	
			 this.refs.hj_default.play();
		 }, 1000);
		 setTimeout( () => {
			 this.setState({started: true})
		 }, 4000);
	 }
	 handleNewStart(){
		 this.setState({
		  		hj: false,
		  		flare: false,
		  		result: -1,
		  		msg: '',
			   	seq: []
		 });
		 this.handleStart();
	 }
	 componentDidMount(){
		 this.handleStart();
	 }
	 componentDidUpdate(){
		 
	 }
	 handleDanceEnd(){
		 var that = this;
		 postData(`http://${window.location.host}/sendSequence`, this.state.seq, (draw) => {
			 var d = parseInt(draw);
			 console.log(d);
			 var msg;
			 if(d > 84){
				 msg = "Great job!";
			 }else if(d >= 50){
				 msg = "Not bad!";
			 }
			 else{
				 msg = "Keep trying"
			 }
			 that.setState({
				 result: d,
			 	 msg:  msg
			 });
		 });
	 }
	 handleKeyDown(keyID){
		 if(keyID == 72){
			 if(!this.state.hj){
				 this.state.seq.push({"keyId": keyID, "pressed": true, "time": Date.now()});
			 }
			 this.state.hj = true;
		 }else if(keyID == 70){
			 if(!this.state.flare){
				 this.state.seq.push({"keyId": keyID, "pressed": true, "time": Date.now()});
			 }
			 this.state.flare = true;
		 }else{
			 this.state.seq.push({"keyId": keyID, "pressed": true, "time": Date.now()});				
		 }
	 }
	 handleKeyUp(keyID){
		 if(keyID == 72){
			 this.state.hj = false;
		 }else if(keyID == 70){
			 this.state.flare = false;
		 }
			this.state.seq.push({"keyId": keyID, "pressed": false, "time": Date.now()})
	 }
	 setDefault(){
		 
	 }
	 render() {
		 console.log(ReactDOM);
	
	 return (
		<div id="movementCanvas" class="col-12">
		<ProgressBar started={this.state.started} visible={this.state.result == -1}/>

			<video onEnded={this.handleDanceEnd} id="hj_default" class={"col-12 " + (this.state.result == -1 ? "" : "hiddenSec")} ref="hj_default" >
				<source src="/img/defaults/dance-final.mp4" ref="videoMovementSrc" type="video/mp4"></source>
			</video>
			
			<a class={"btn btn-warning col-6 offset-3 quitDanceBtn " + (this.state.result == -1 ? "" : "hiddenSec")} href={`http://${window.location.host}/dashboard`}>back to dashboard</a>

			<Resultpane handleNewStart={this.handleNewStart} visible={this.state.result != -1} score={this.state.result} msg={this.state.msg} />
			
		</div>
	  );
	 }
 };
 
 class Resultpane extends React.Component {
	 constructor(props) {
		    super(props);
		    this.state = {
			};
	 }
	 render() {
		 console.log(ReactDOM);
		 var sc = this.props.score + " / 100"; 
		 var dash = `http://${window.location.host}/dashboard`;
	 return (
		<div id="resultPane" class={"col-12 " + (this.props.visible ? "" : "hiddenSec")} >
			<h1>Your score:</h1>
			<h2>{sc}</h2>
			<h3>{this.props.msg}</h3>
			
			<a onClick={this.props.handleNewStart} class="btn btn-danger col-10 offset-1 " >Start over!</a>
			<a href={dash} class="btn btn-warning col-10 offset-1 " >Back to dashboard</a>

		</div>
	  );
	 }
 };
 ReactDOM.render(
		 	<App />, 
		 document.getElementById('init')
	 );
 
 