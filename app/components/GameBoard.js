import React from 'react';


export default class GameBoard extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			movable: [5, 5],
			canWidth: 800,
			canHeight: 800,
			blankMapArr: [],
			curMap: [],
		}
	}

	componentDidMount() {
		this.createMapArray();
		this.drawGrid()
		
	}

	createMapArray () {
		let mapArr = this.state.blankMapArr;
		const squareSize = 20;
		const numOfXs = this.state.canWidth / squareSize;
		const numOfYs = this.state.canHeight / squareSize;
		const numOfSqs = numOfXs * numOfYs;
		for(let i=0; i< numOfXs; i++){
			let x = 0
			let k = 1
			while(x < numOfXs){
				if((k +(i*40)) !== 781) {
					mapArr.push([(x*20), (i*20), (k +(i*40)), 0, 'board'])
				} else {
					mapArr.push([(x*20), (i*20), (k +(i*40)), 0, 'player'])
					}
					x++;
					k++;
				}
			}
		this.state.blankMapArr = mapArr;
		this.makeRandomMap(mapArr);
		this.setState(this.state);
	}

	handleKeyPress (e) {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext('2d');
		let map = this.state.curMap;
		let player, top, right, bottom, left = null;

		//Locate Player position and neighbors
		for(let i=0; i<map.length; i++){
			if(map[i][4] === 'player'){ 
				player = map[i]
				if(i>39){top = map[i-40];} else{top = null};
				if(i<1560){bottom = map[i+40];} else {bottom = null};
				if(i%40 !== 0){left = map[i-1];} else {left = null};
				if(i%40 !== 39){right = map[i+1];} else {right = null};
			}
		}

		//Detects state of neighbors and moves player if eligable 
		if(left !== null && left[3] !== 1 && e.keyCode == 37){
			left[4] = 'player';
			player[4] = 'board';
			
		} else if(top !== null && top[3] !== 1 && e.keyCode == 38){
			top[4] = 'player';
			player[4] = 'board';
			
		} else if(right !== null && right[3] !== 1 && e.keyCode == 39){
			right[4] = 'player';
			player[4] = 'board';	
		} else if(bottom !== null && bottom[3] !== 1 && e.keyCode == 40){
			bottom[4] = 'player';
			player[4] = 'board';
		}
		this.setState(this.state);
		this.drawGrid();
		//left keyCode= 37  Up=38 right=39 down =40
	}

	drawGrid() {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext('2d');
		var gridOptions = {
            majorLines: {
                separation: 20,
                color: 'black',
            },
            mapArr: [],
        };

        this.createGrid(canvas, gridOptions.majorLines, gridOptions.mapArr);
        this.buildWalls(ctx);
        this.fillSq(ctx);
	}

	fillSq (ctx) {
		let mapArr = this.state.curMap
		let player = mapArr[780];

	}

	

	buildWalls (ctx) {
		let sq = this.state.curMap;
		for(var i=0; i<sq.length; i++){
			if(sq[i][3] === 1 ) {
				ctx.fillStyle = 'blue';
				ctx.fillRect(sq[i][0], sq[i][1], 19, 19);
			} else if (sq[i][3] === 0 && sq[i][4] === 'player'){
				ctx.fillStyle = 'red';
				ctx.fillRect(sq[i][0], sq[i][1], 19, 19)
			} else if (sq[i][3] === 0 && sq[i][4] === 'board'){
				ctx.clearRect(sq[i][0], sq[i][1], 19, 19)
			}
		}
	}

	createGrid (canvas, lineOptions) {
		const canSide = canvas.width;
		const ctx = canvas.getContext('2d');
		let lineCount, i, x, y = null;
		ctx.strokeStyle = lineOptions.color;
		ctx.strokeWidth = 1;
		ctx.beginPath();
        lineCount = Math.floor(canSide/ lineOptions.separation)
		for (i = 1; i <= lineCount; i++) {
            x = (i * lineOptions.separation);
            y = x;
            //X Lines
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canSide);
            //Y Lines
            ctx.moveTo(0, y);
            ctx.lineTo(canSide, y);
            ctx.stroke();
        }
        
        ctx.closePath();

        return;

	}

	makeRandomMap (map) {
		var randomNum = function () {
			let num = Math.round(Math.random() * 5)
			if(num !== 1) {num = 0}
			return num;
		}
		
		for(var x=0; x<map.length; x++){
			if(map[x][4] !== 'player'){
				map[x][3] = randomNum();
			} else { map[x][3] = 0 }
		}

		this.state.curMap = map;
		this.state.blankMapArr = [];
	}


// Each Grid Array is organized by  [x, y, id , wall/floor, player/board]
	render() {
		return (
			<div className="gameContainer" onKeyDown={this.handleKeyPress.bind(this)}>
				<div className="visableArea" >
				<canvas 
					id="myCanvas" 
					ref="canvas"
					width={this.state.canWidth}
					height={this.state.canHeight} 
					tabIndex='1'
					>
				</canvas>
				</div>
			</div>
		)
	}
}



	