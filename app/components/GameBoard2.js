import React from 'react';


// 0=Ground 1=Wall 2=Player 3=Enemies 4=Health 5=Weapons 6=? 7=? 8=? 9=Hole


export default class GameBoard2 extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			viewTop: -220,
			viewLeft: -200,
			blockProps: [], /* [[index, floor/wall/player],[index, floor/wall/player]] */
			verticalKey: 0,
			horizKey: 0,
			curMap: 0,
			maps: [this.props.mapOne, this.props.mapTwo, this.props.mapThree, this.props.mapFour],
			playerStats: {
					health: this.props.health,
					weapon: this.props.weapon,
				},
			enemyStats: {
					lev1: 20,
					lev2: 40,
					lev3: 80,
			},
		}

	}

	componentDidMount() {
			this.renderMap();
			window.addEventListener('keydown', this.handleKeyDown.bind(this))
	}


	componentWillUnMount(){
		this.renderMap();
		this.refs.gameCont.addEventListener('keyDown', this.handleKeyDown)
	}

	nextLevel() {
		this.state.viewTop = -220;
		this.state.viewLeft =  -200;
		this.state.verticalKey = 0;
		this.state.horizKey = 0;
		this.state.curMap += 1;
		this.setState(this.state);
		this.renderMap();
	}

	movePlayerLeftRight(inc, b1, b2, view) {
		this.state.horizKey = this.state.horizKey + (inc);
		if(this.state.horizKey > b1 && this.state.horizKey < b2){
			this.state.viewLeft = this.state.viewLeft + (view);
			console.log(this.state.viewLeft)
		}
		this.setState(this.state)
	}

	movePlayerUpDown(inc, b1, b2, view) {
		this.state.verticalKey = this.state.verticalKey + (inc);
		if(this.state.verticalKey <= b1 && this.state.verticalKey >= b2){
			this.state.viewTop = this.state.viewTop + (view);
			console.log(this.state.viewTop)
		}
		this.setState(this.state)
	}
	

	handleKeyDown (e) {
		let map = this.state.blockProps;
		const length = this.state.blockProps.length;
		let player, top, right, bottom, left = null;
		//Make Sure blockProps length is equivelent to number of grid squares
		if(length> 1600) {map.splice(1599)}
		/*Loop through grid, determine the neighboring blocks. 
		  If a neighbor does not exit, set it to null(i.e. No top neighbor for top row)*/
		for(let i=0; i<map.length; i++){
			if(map[i][1] === 2){ 
				player = map[i]
				if(i>39){top = map[i-40];} else{top = null};
				if(i<1560){bottom = map[i+40];} else {bottom = null};
				if(i%40 !== 0){left = map[i-1];} else {left = null};
				if(i%40 !== 39){right = map[i+1];} else {right = null};
			}
		}
		/*Check status of Player's neighbors,
		 if it exists and it is not a wall, 
		 player can move in direction of pressed key.*/
		if(e.keyCode === 37){
			if(left[1] === 0){
				left[1] = 2;
				player[1] = 0;
				this.movePlayerLeftRight(-1, -11, 10, 20);
			} else if(left[1] === 9) {
				this.nextLevel();
			} else if(left[1] === 4) {
				this.props.incHealth();
				left[1] = 2;
				player[1] = 0;
				this.movePlayerLeftRight(-1, -11, 10, 20);
			}
			
		} else if (e.keyCode === 38){
			if(top[1] === 0){
				top[1] = 2;
				player[1] = 0;
				this.movePlayerUpDown(1, 11, -13, 20);
			} else if(top[1] == 9) {
				this.nextLevel();
			} else if(top[1] == 4) {
				this.props.incHealth();
				top[1] = 2;
				player[1] = 0;
				this.movePlayerUpDown(1, 11, -13, 20);
			}

		} else if(e.keyCode === 39){
			if(right[1] === 0){
				right[1] = 2;
				player[1] = 0;
				this.movePlayerLeftRight(1, -10, 11, -20);
			} else if(right[1] === 9) {
				this.nextLevel();
			} else if(right[1] === 4) {
				this.props.incHealth();
				right[1] = 2;
				player[1] = 0;
				this.movePlayerLeftRight(1, -10, 11, -20);
			}

		} else if (e.keyCode === 40){
			if(bottom[1] === 0){
				bottom[1] = 2;
				player[1] = 0;
				this.movePlayerUpDown(-1, 10, -14, -20);
			} else if(bottom[1] === 9) {
					this.nextLevel();
			} else if(bottom[1] == 4) {
				this.props.incHealth();
				bottom[1] = 2;
				player[1] = 0;
				this.movePlayerUpDown(-1, 10, -14, -20);
			}
		}
		this.setState(this.state);
		// call checkMapState to update game grid
		this.checkMapState();

	}

	//Determines all empty (floor) pieces in map
	findEmptySpaces () {
		let empty = []
		for(var i=0; i<1600; i++){
			if(this.state.blockProps[i][1] === 0) {
				empty.push(0)
			}
		}
		return empty
	}

	//Takes in enemies/health/weapon and asigns to random index in array.
	placeObjects(object, id, emptySpaces)  {
		while (object > 0) {
			let num = Math.floor(Math.random() * emptySpaces.length);
			if(emptySpaces[num] == 0){
					emptySpaces[num] = id;
					object --
			} else {
				object = object
			}
		}
		return emptySpaces
	}

	//Generates an Array of empty spaces, health, weapons, enemies In random order
	randomBlockGenerator() {
		let enemies = 5;
		let treats = 5;
		let toys = 2;
		let emptySpaces = this.findEmptySpaces(); //Returns an array of 0's
		this.placeObjects(enemies, 3, emptySpaces);
		this.placeObjects(treats, 4, emptySpaces);
		this.placeObjects(toys, 5, emptySpaces);
		return emptySpaces;
	}


	//Will Count total number of Empty Squares
	// Randomly Place Enemies, Health, Weapons
	createRandomMap() {
		let emptyBlocks = this.randomBlockGenerator();
		for(var i=0; i<1600; i++){
			if(this.state.blockProps[i][1] === 0) {
				this.state.blockProps[i][1] = emptyBlocks[0];
				emptyBlocks.splice(0,1);
			}
		}	
		this.setState(this.state);
		this.checkMapState();
	}

	//Will take in blockProps array, determine which each block is and render map
	renderMap() {
		let block = this.state.blockProps;
		for(var i=0; i<block.length; i++){
			this.state.blockProps[i][1] = this.state.maps[this.state.curMap][i];
		}
		this.setState(this.state);
		this.createRandomMap();
	}

	checkMapState (){
		//Reduce blockProps back down to 1600
		if(this.state.blockProps.length > 1600) {this.state.blockProps.splice(1599)}
		//Loop through blockProps, determine status, set class
		for(var i=0; i<this.state.blockProps.length; i++){
			let block = this.state.blockProps;
			let curDiv = this.refs['b' + i];
			if(block[i][1] === 0 ){
				curDiv.className = 'block floor';
			} else if(block[i][1] === 1) {
				curDiv.className = 'block wall';
			} else if(block[i][1] === 2) {
				curDiv.className = 'block player';
			} else if(block[i][1] === 3) {
				curDiv.className = 'block enemy';
			} else if(block[i][1] === 4) {
				curDiv.className = 'block health';
			} else if(block[i][1] === 5) {
				curDiv.className = 'block weapon';
			} else if(block[i][1] === 9) {
				curDiv.className = 'block hole';
			}
		}

	}


	createBlockProps () {
		let width = this.props.mapWidth;
		let height = this.props.mapHeight;
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

	render() {
		return (
				<div className="visableArea">
				 	<div className="gridContainer"
				 		ref="grid" 
				 		style={{top: `${this.state.viewTop}px`,
				 				left: `${this.state.viewLeft}px`}} >
				 		{this.createBlockProps()}
					</div>
				</div>
		)
	}
}


// tabIndex="1" onKeyDown={this.handleKeyDown.bind(this)}

	