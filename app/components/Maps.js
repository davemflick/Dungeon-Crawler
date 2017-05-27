import React from 'react';
import GameBoard2 from './GameBoard2';
import { MAP_ONE, MAP_TWO, MAP_THREE, MAP_FOUR } from './AllMaps';

export default class Maps extends React.Component{

	constructor(props) {
		super(props);
		this.state = {
			mapWidth: 40,
			mapHeight: 40,
			mapOne: MAP_ONE,
			mapTwo: MAP_TWO,
			mapThree: MAP_THREE,
			mapFour: MAP_FOUR,
		}
	}
	

	render () {
		return (
			<div className="gameContainer" ref="gameCont">
				 <GameBoard2  
				 	mapOne={this.state.mapOne}
		 			mapTwo={this.state.mapTwo}
		 			mapThree={this.state.mapThree}
		 			mapFour={this.state.mapFour}
		 			mapWidth={this.state.mapWidth}
		 			mapHeight={this.state.mapHeight}
		 			incMap={this.props.incMap}
		 			curMap={this.props.curMap}
		 			health={this.props.health}
		 			weapon={this.props.weapon}
		 			incHealth={this.props.incHealth}
		 			upgradeWeapon={this.props.upgradeWeapon}
		 			attackCat={this.props.attackCat}
		 			attackKid={this.props.attackKid}
		 			viewLeft={this.props.viewLeft}
			  		viewTop={this.props.viewTop}
			  		vK={this.props.vK}
			  		hK={this.props.hK}
			  		incLevel={this.props.incLevel}
			  		enemyCat={this.props.enemyCat}
			  		enemyKid={this.props.enemyKid}
			  		fixCat={this.props.fixCat}
			  		winner={this.props.winner}
			  		won={this.props.won}
			  		/>
			</div>
		)
	}

}

	

	
