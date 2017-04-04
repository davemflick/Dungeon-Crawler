import React from 'react';


// 0=Ground 1=Wall 2=Player 3=Enemies 4=Health 5=Weapons 6=? 7=? 8=? 9=Hole


export default class GameBoard2 extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			viewTop: this.props.viewTop,
			viewLeft: this.props.viewLeft,
			blockProps: [], /* [[index, floor/wall/player],[index, floor/wall/player]] */
			verticalKey: this.props.vK,
			horizKey: this.props.hK,
			curMap: this.props.curMap -1,
			maps: [this.props.mapOne, this.props.mapTwo, this.props.mapThree, this.props.mapFour],
			enemyCat: this.props.enemyCat,
			enemyKid: this.props.enemyKid,
			won : this.props.won,
			
		}

	}

	componentDidMount() {
			
			this.renderMap();
			window.addEventListener('keydown', this.handleKeyDown.bind(this))
			window.addEventListener('keyup', this.handleKeyUp.bind(this))
	}


	componentWillUnMount(){
		this.renderMap();
		window.addEventListener('keyDown', this.handleKeyDown.bind(this))
		window.addEventListener('keyup', this.handleKeyUp.bind(this))
	}

	handleKeyUp() {
		if(this.props.health <=0) {
			this.setState({
				viewTop: this.props.viewTop,
				viewLeft: this.props.viewLeft,
				verticalKey: this.props.vK,
				horizKey: this.props.hK,
				curMap: 0,
			})
			this.renderMap()
		}

		this.props.incLevel();
		this.setState({enemyCat: this.props.enemyCat})
		this.setState({enemyKid: this.props.enemyKid})
		if(this.state.won === 1) {this.renderMap()}
			this.setState({won: 0})

	}
	

	nextLevel() {
		this.props.incMap();
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
		}
		this.setState(this.state)
	}

	movePlayerUpDown(inc, b1, b2, view) {
		this.state.verticalKey = this.state.verticalKey + (inc);
		if(this.state.verticalKey <= b1 && this.state.verticalKey >= b2){
			this.state.viewTop = this.state.viewTop + (view);
		}
		this.setState(this.state)
	}

	//Check cat's health, replenish if dead
	checkCat (dir, player) {
		if(this.state.enemyCat <= 0) {
			dir[1] = 2;
			player[1] = 0;
			this.props.fixCat();
		}
	}

	timeOutAfterWin () {
			this.props.winner()
			this.state.verticalKey = this.props.vK
			this.state.horizKey = this.props.hK
			this.state.viewTop = this.props.viewTop
			this.state.viewLeft = this.props.viewLeft
			this.state.curMap = 0
			this.state.won = 1;
			this.setState(this.state)
	}
	//Check kid health
	checkKid (dir, player) {
		if(this.state.enemyKid <= 0) {
			dir[1] = 2;
			player[1] = 0;
			this.props.winner();
			this.setState({
				verticalKey: this.props.vK,
				horizKey: this.props.hK,
				viewTop: this.props.viewTop,
				viewLeft: this.props.viewLeft,
				curMap: 0,
				won: 1,
			})
		}
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
			} else if(left[1] == 5 || left[1] == 6 || left[1] == 7 || left[1] == 8) {
				this.props.upgradeWeapon();
				left[1] = 2;
				player[1] = 0;
				this.movePlayerLeftRight(-1, -11, 10, 20);
			} else if (left[1] === 3){
				this.checkCat(left, player);
				this.props.attackCat();
			} else if (left[1] === 10){
				this.checkKid(left, player);
				this.props.attackKid();
			} 
			
		} else if (e.keyCode === 38){
			if(top[1] === 0){
				top[1] = 2;
				player[1] = 0;
				this.movePlayerUpDown(1, 11, -13, 20);
			} else if(top[1] == 9) {
				this.nextLevel();
			} else if(top[1] == 4 ) {
				this.props.incHealth();
				top[1] = 2;
				player[1] = 0;
				this.movePlayerUpDown(1, 11, -13, 20);
			} else if(top[1] == 5 || top[1] == 6 || top[1] == 7 || top[1] == 8) {
				this.props.upgradeWeapon();
				top[1] = 2;
				player[1] = 0;
				this.movePlayerUpDown(1, 11, -13, 20);
			} else if (top[1] === 3){
				this.checkCat(top, player);
				this.props.attackCat();
			} else if (top[1] === 10){
				this.checkKid(top, player);
				this.props.attackKid();
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
			} else if(right[1] === 5 || right[1] == 6 || right[1] == 7 || right[1] == 8) {
				this.props.upgradeWeapon();
				right[1] = 2;
				player[1] = 0;
				this.movePlayerLeftRight(1, -10, 11, -20);
			} else if (right[1] === 3){
				this.checkCat(right, player);
				this.props.attackCat();
			} else if (right[1] === 10){
				this.checkKid(right, player);
				this.props.attackKid();
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
			} else if(bottom[1] == 5 || bottom[1] == 6 || bottom[1] == 7 || bottom[1] == 8) {
				this.props.upgradeWeapon();
				bottom[1] = 2;
				player[1] = 0;
				this.movePlayerUpDown(-1, 10, -14, -20);
			} else if (bottom[1] === 3){
				this.checkCat(bottom, player);
				this.props.attackCat();
			} else if (bottom[1] === 10){
				this.checkKid(bottom, player);
				this.props.attackKid();
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
		let cats = 5;
		let treats = 5;
		let toys = 2;
		let emptySpaces = this.findEmptySpaces(); //Returns an array of 0's
		this.placeObjects(treats, 4, emptySpaces);
		this.placeObjects(cats, 3, emptySpaces);
		if(this.state.curMap === 0){
			this.placeObjects(toys, 5, emptySpaces);
		} else if (this.state.curMap == 1){
			this.placeObjects(toys, 6, emptySpaces);
		} else if (this.state.curMap == 2){
			this.placeObjects(toys, 7, emptySpaces);
		} else if (this.state.curMap == 3){
			this.placeObjects(toys, 8, emptySpaces);
		}
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
				curDiv.className = 'block cat';
			} else if(block[i][1] === 4) {
				curDiv.className = 'block health';
			} else if(block[i][1] === 5) {
				curDiv.className = 'block tennisball';
			}else if(block[i][1] === 6) {
				curDiv.className = 'block duck';
			}else if(block[i][1] === 7) {
				curDiv.className = 'block bear';
			}else if(block[i][1] === 8) {
				curDiv.className = 'block squeek';
			} else if(block[i][1] === 9) {
				curDiv.className = 'block hole';
			} else if(block[i][1] === 10) {
				curDiv.className = 'block kid';
			}
		}

	}

 //Creates Array blockProps that stores, index and state of each grid cell [id, state]
	createBlockProps () {
		let width = this.props.mapWidth;
		let height = this.props.mapHeight;
		let gridArea = width * height;
		let blockProps = this.state.blockProps;
		let boardArr = [];

		for(var i=0; i<gridArea; i++){
			blockProps.push([i, 0]);
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

	