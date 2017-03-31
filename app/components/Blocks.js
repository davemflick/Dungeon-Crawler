import React from 'react';


export default class GameBoard2 extends React.Component{


	constructor(props) {
		super(props);
		this.state = {

		}
}

	render(){
		return (
			<div className="gridContainer" style={this.state.gridView} >
					{console.log(this.props.boardArr)}
				 {this.props.boardArr.map((board) => board)}
			</div>
		)
	}

}