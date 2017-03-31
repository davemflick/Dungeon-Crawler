import React from 'react';


export default class GameBoard2 extends React.Component{

	//GridView Bottom Right Corner top -480px, left -378px;
	//GridView Bottom Left Cornor top -480px, left 0px;
	//GridView Top Left Cornor top 0px, left 0px;
	//GridView Top Right Cornor top 0px, left -378px;

	//blockProps array [[index on BoardArr, floor/wall, player?]]

	constructor(props) {
		super(props);
		this.state = {
			mapWidth: 40,
			mapHeight: 40,
			viewTop: -220,
			viewLeft: -200,
			blockProps: [],
			verticalKey: 0,
			horizKey: 0,

		}
		// this.checkMapState = this.checkMapState.bind(this)

	}

	componentDidMount() {
		this.randomWall();
	}
	componentWillMount() {
    	
 	}

  	componentWillUnmount() {
    	
  	}

	handleKeyDown (e) {
		let map = this.state.blockProps;
		let length = this.state.blockProps.length;
		let player, top, right, bottom, left = null;

		if(length> 1600) {map.splice(1600)}
		for(let i=0; i<map.length; i++){
			if(map[i][1] === 2){ 
				player = map[i]
				if(i>39){top = map[i-40];} else{top = null};
				if(i<1560){bottom = map[i+40];} else {bottom = null};
				if(i%40 !== 0){left = map[i-1];} else {left = null};
				if(i%40 !== 39){right = map[i+1];} else {right = null};
			}
		}

		if(left !== null && left[1] !== 1 && e.keyCode == 37){
			left[1] = 2;
			player[1] = 0;
			this.state.horizKey -= 1;
			if(this.state.horizKey > -11 && this.state.horizKey < 11){
				this.state.viewLeft += 20;
			}
			console.log(this.state.horizKey)
			
		} else if(top !== null && top[1] !== 1 && e.keyCode == 38){
			top[1] = 2;
			player[1] = 0;
			this.state.verticalKey += 1;
			if(this.state.verticalKey < 12 && this.state.verticalKey > -15) {
				this.state.viewTop += 20;
			}
			
		} else if(right !== null && right[1] !== 1 && e.keyCode == 39){
			right[1] = 2;
			player[1] = 0;
			this.state.horizKey += 1;
			if(this.state.horizKey > -11 && this.state.horizKey < 11){
				this.state.viewLeft -= 20;
			}	
			console.log(this.state.horizKey)
		} else if(bottom !== null && bottom[1] !== 1 && e.keyCode == 40){
			bottom[1] = 2;
			player[1] = 0;
			this.state.verticalKey -= 1;
			if(this.state.verticalKey < 12 && this.state.verticalKey > -15) {
				this.state.viewTop -= 20;
			}
		}

		this.setState(this.state);
		
		this.checkMapState();

	}

	handleClick (e) {
		console.log(e.target)
	}

	onPlayerMove(){
		let block = this.state.blockProps;
		for(var i=0; i<block.length; i++){
			if(block[i][1] === 2 )
			block[i][1] = randNum();
		}
	}

	randomWall() {
		var randNum = function() {
			let num = Math.floor(Math.random() * 9);
			if(num !== 1) {num = 0};
			return num;
		}
		
		let block = this.state.blockProps;
		for(var i=0; i<block.length; i++){
			if(block[i][1] !== 2 )
			block[i][1] = randNum();
		}
		this.setState(this.state);
		this.checkMapState();
		
	}

	checkMapState (){
		for(var i=0; i<this.state.blockProps.length; i++)
			if(this.state.blockProps[i][1] === 0 ){
				this.refs['b' + i].className = 'block floor'
			} else if(this.state.blockProps[i][1] === 1) {
				this.refs['b' + i].className = 'block wall'
			} else if(this.state.blockProps[i][1] === 2) {
				this.refs['b' + i].className = 'block player'
			}
	}


	createBlockProps () {
		let width = this.state.mapWidth;
		let height = this.state.mapHeight;
		let gridArea = width * height;
		let centerBlock = ((gridArea/2) - (width/2));
		let blockProps = this.state.blockProps;
		let boardArr = [];

		for(var i=0; i<gridArea; i++){
			if(i !== centerBlock){
				blockProps.push([i, 0]);
			} else if ( i === centerBlock){
				blockProps.push([i, 2]);
			}
			boardArr.push(<div 
							className="block" 
							key={i} 
							ref={'b' + i}
							 ></div>)
		}

		return boardArr.map((block) => block);
	}


// Each Grid Array is organized by  [x, y, id , wall/floor, player/board]
	render() {
		return (
			<div className="gameContainer" tabIndex="1" onKeyDown={this.handleKeyDown.bind(this)}>
				<div className="visableArea"  onClick={this.handleClick} >
				 	<div className="gridContainer"
				 		ref="grid" 
				 		style={{top: `${this.state.viewTop}px`,
				 				left: `${this.state.viewLeft}px`}} >
				 		{this.createBlockProps()}
					</div>
				</div>
			</div>
		)
	}
}

	// handleKeyPress (e) {
	// 	const canvas = this.refs.canvas;
	// 	const ctx = canvas.getContext('2d');
	// 	let map = this.state.curMap;
	// 	let player, top, right, bottom, left = null;

	// 	//Locate Player position and neighbors
	// 	for(let i=0; i<map.length; i++){
	// 		if(map[i][4] === 'player'){ 
	// 			player = map[i]
	// 			if(i>39){top = map[i-40];} else{top = null};
	// 			if(i<1560){bottom = map[i+40];} else {bottom = null};
	// 			if(i%40 !== 0){left = map[i-1];} else {left = null};
	// 			if(i%40 !== 39){right = map[i+1];} else {right = null};
	// 		}
	// 	}

	// 	//Detects state of neighbors and moves player if eligable 
	// 	if(left !== null && left[3] !== 1 && e.keyCode == 37){
	// 		left[4] = 'player';
	// 		player[4] = 'board';
			
	// 	} else if(top !== null && top[3] !== 1 && e.keyCode == 38){
	// 		top[4] = 'player';
	// 		player[4] = 'board';
			
	// 	} else if(right !== null && right[3] !== 1 && e.keyCode == 39){
	// 		right[4] = 'player';
	// 		player[4] = 'board';	
	// 	} else if(bottom !== null && bottom[3] !== 1 && e.keyCode == 40){
	// 		bottom[4] = 'player';
	// 		player[4] = 'board';
	// 	}
	// 	this.setState(this.state);
	// 	this.drawGrid();
	// 	//left keyCode= 37  Up=38 right=39 down =40
	// }



	