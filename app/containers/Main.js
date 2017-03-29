import React from 'react';
import ReactDOM, { render } from 'react-dom';
import PlayerStats from '../components/PlayerStats';
import GameBoard from '../components/GameBoard';


export default class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			Health: 100,
			Level: 1,
			NextLevel: 100,
			Weapon: 'None',
			CurMap: 1,
		}
	}

	render() {
		return (
			<div className="mainContainer">
				<PlayerStats 
					curHealth={this.state.Health} 
					curLevel={this.state.Level}
					nextLevel={this.state.NextLevel} 
					curWeapon={this.state.Weapon}
					curMap={this.state.CurMap}
					 />
					
				<GameBoard />
			</div>
		)
	}
}