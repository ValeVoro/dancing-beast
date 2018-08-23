import React, { Component} from "react";
import ReactDOM  from "react-dom";
import * as requests from '../js/requests.js';


export class ProgressBar extends React.Component {
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
		<div className={"col-12 " + (this.props.visible ? "" : "hiddenSec")}>
			<div className="progress col-6">
				<div className={"progress-bar progress-bar-striped progress-bar-animated"} style={{animation: "progressBarFill steps(100, start) " + dur2}} id="progressBar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
			</div>
		</div>
	  );
	 }
 };
 
export class Stage extends React.Component {
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
		<div className="danceCont">
			<div className="container">
				<div className="col-12  justify-content-center">
				
					<div className=" row danceFloor">
					
					
					<div id="staticCanvas" className="hiddensec"></div>
					<DefaultCanvas bpm={levelInfo[0].bpm} beastNum={sessionBeast} defMovs={levelInfo[0].defaultMovSeq} />	
							
					</div> 	
				</div> 
			</div>
		</div>
	  );
	 }
 };
 
 export class DefaultCanvas extends React.Component {
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
		<div id="defaultCanvas" className={"" + (this.state.visible ? "" : "hiddenSec")}>
			<video onEnded={this.handleEnd} className={"col-12 " + (this.state.instruction ? "" : "hiddenSec")}  ref="vid_instruction" >
				<source src="/img/defaults/instruction-final.mp4" ref="videoMovementSrc" type="video/mp4"></source>
			</video>
			<a onClick={this.handlePlay} className={"btn btn-danger col-10 offset-1 " + (this.state.buttons ? "" : "hiddenSec")}>Play instruction</a>
			<a onClick={this.handleSkip} className={"btn btn-warning col-6 offset-3 " + (this.state.buttons ? "" : "hiddenSec")}>Skip</a>
			<a onClick={this.handlePlay} className={"btn btn-danger afterInst col-10 offset-1 " + (this.state.endInstructionButton ? "" : "hiddenSec")}>Play again</a>

			<a onClick={this.handleLevelStart} className={"btn btn-success afterInst col-10 offset-1 " + (this.state.endInstructionButton ? "" : "hiddenSec")}>Dance!</a>

			{mov}
		</div>
	  );
	 }
 };
 
 export class MovementCanvas extends React.Component {
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
		 requests.postData(`http://${window.location.host}/sendSequence`, this.state.seq, (draw) => {
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
		<div id="movementCanvas" className="col-12">
		<ProgressBar started={this.state.started} visible={this.state.result == -1}/>

			<video onEnded={this.handleDanceEnd} id="hj_default" className={"col-12 " + (this.state.result == -1 ? "" : "hiddenSec")} ref="hj_default" >
				<source src="/img/defaults/dance-final.mp4" ref="videoMovementSrc" type="video/mp4"></source>
			</video>
			
			<a className={"btn btn-warning col-6 offset-3 quitDanceBtn " + (this.state.result == -1 ? "" : "hiddenSec")} href={`http://${window.location.host}/dashboard`}>back to dashboard</a>

			<Resultpane handleNewStart={this.handleNewStart} visible={this.state.result != -1} score={this.state.result} msg={this.state.msg} />
			
		</div>
	  );
	 }
 };
 
 export class Resultpane extends React.Component {
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
		<div id="resultPane" className={"col-12 " + (this.props.visible ? "" : "hiddenSec")} >
			<h1>Your score:</h1>
			<h2>{sc}</h2>
			<h3>{this.props.msg}</h3>
			
			<a onClick={this.props.handleNewStart} className="btn btn-danger col-10 offset-1 " >Start over!</a>
			<a href={dash} className="btn btn-warning col-10 offset-1 " >Back to dashboard</a>

		</div>
	  );
	 }
 };

 