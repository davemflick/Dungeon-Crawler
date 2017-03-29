import React from 'react';


export default class GameBoard extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			movable: [5, 5]
		}
	}

	componentDidMount() {
		this.drawGrid()
	}


	handleKeyPress (e) {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext('2d');
		let move = this.state.movable;
		const clear = ctx.clearRect(move[0], move[1], 10, 10)
		if(move[0]>5 && e.keyCode == 37){
			clear;
			move[0] -= 20;
		} else if(move[0]<785 && e.keyCode == 39){
			clear;
			move[0] += 20;
		} else if(move[1]>5 && e.keyCode == 38){
			clear;
			move[1] -= 20;
		} else if(move[1]<585 && e.keyCode == 40){
			clear;
			move[1] += 20;
		}
		console.log(move)
		this.setState(this.state);
		this.fillSq(ctx);
		//left keyCode= 37  Up=38 right=39 down =40
	}

	drawGrid() {
		const canvas = this.refs.canvas;
		const ctx = canvas.getContext('2d');
		var gridOptions = {
            majorLines: {
                separation: 20,
                color: 'black',
            }
        };

        this.createGrid(canvas, gridOptions.majorLines);
        this.fillSq(ctx);
	}

	fillSq (ctx) {
		let x = this.state.movable[0];
		let y = this.state.movable[1];
		ctx.fillRect(x, y, 10, 10)
		return
	}

	createGrid (canvas, lineOptions) {
		const cw = canvas.width;
		const ch= canvas.height;
		const ctx = canvas.getContext('2d');
		let lineCount, i, x, y = null;

		ctx.strokeStyle = lineOptions.color;
		ctx.strokeWidth = 1;
		ctx.beginPath();

        lineCount = Math.floor(cw/ lineOptions.separation)
		for (i = 1; i <= lineCount; i++) {
            x = (i * lineOptions.separation);
            ctx.moveTo(x, 0);
            ctx.lineTo(x, ch);
            ctx.stroke();
        }

        lineCount = Math.floor(ch/ lineOptions.separation)
        for (i = 1; i <= lineCount; i++) {
            y = (i * lineOptions.separation);
            ctx.moveTo(0, y);
            ctx.lineTo(cw, y);
            ctx.stroke();
        }
        ctx.closePath();
        ctx.fillStyle ='red'
        

        return;

	}

	render() {
		return (
			<div className="gameContainer" onKeyDown={this.handleKeyPress.bind(this)}>
				<div className="visableArea" >
				<canvas 
					id="myCanvas" 
					ref="canvas" 
					width="800" 
					height="600"
					tabIndex='1'
					>
				</canvas>
				</div>
			</div>
		)
	}
}