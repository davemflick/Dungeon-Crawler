import React from 'react';



export default class GameBoard2 extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			viewTop: -220,
			viewLeft: -200,
			blockProps: [], /* [[index, floor/wall/player],[index, floor/wall/player]] */
			verticalKey: 0,
			horizKey: 0,

		}

	}

	componentDidMount() {
		this.renderMap();
		window.addEventListener('keydown', this.handleKeyDown.bind(this))
	}


	componentWillUnMount(){
		this.refs.gameCont.addEventListener('keyDown', this.handleKeyDown)
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
		if(left !== null && left[1] !== 1 && e.keyCode == 37){
			left[1] = 2;
			player[1] = 0;
			this.state.horizKey -= 1;
			if(this.state.horizKey > -11 && this.state.horizKey < 10){
				this.state.viewLeft += 20;
			}
			
		} else if(top !== null && top[1] !== 1 && e.keyCode == 38){
			top[1] = 2;
			player[1] = 0;
			this.state.verticalKey++;
			if(this.state.verticalKey <= 11 && this.state.verticalKey >= -13) {
				this.state.viewTop += 20;
			}

		} else if(right !== null && right[1] !== 1 && e.keyCode == 39){
			right[1] = 2;
			player[1] = 0;
			this.state.horizKey += 1;
			if(this.state.horizKey > -10 && this.state.horizKey < 11){
				this.state.viewLeft -= 20;
			}	
			
		} else if(bottom !== null && bottom[1] !== 1 && e.keyCode == 40){
			bottom[1] = 2;
			player[1] = 0;
			this.state.verticalKey--;
			if(this.state.verticalKey <= 10 && this.state.verticalKey >= -14)  {
				this.state.viewTop -= 20;
			}
		}
		this.setState(this.state);
		// call checkMapState to update game grid
		this.checkMapState();

	}


	onPlayerMove(){
		let block = this.state.blockProps;
		for(var i=0; i<block.length; i++){
			if(block[i][1] === 2 )
			block[i][1] = randNum();
		}
	}

	findEmptySpaces () {
		let empty = []
		for(var i=0; i<1600; i++){
			if(this.state.blockProps[i][1] === 0) {
				empty.push(0)
			}
		}
		return empty
	}

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

	renderMap() {
		let block = this.state.blockProps;
		for(var i=0; i<block.length; i++){
			this.state.blockProps[i][1] = this.props.mapTwo[i];
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

	