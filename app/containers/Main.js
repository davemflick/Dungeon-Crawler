import React from 'react';
import ReactDOM, { render } from 'react-dom';
import PlayerStats from '../components/PlayerStats';
import Maps from '../components/Maps';


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

		this.increaseHealth = this.increaseHealth.bind(this);
		this.upgradeWeapon = this.upgradeWeapon.bind(this);
		this.incMap = this.incMap.bind(this);
	}

	incMap() {
		this.state.CurMap += 1;
		this.setState(this.state);
	}

	increaseHealth () {
		this.state.Health += 20;
		this.setState(this.state);
	}

	upgradeWeapon () {
		let level = this.state.Level;
		if(level === 1){
			this.state.Weapon = 'Tennis Ball';
		}
		this.setState(this.state)
	}

	render() {
		return (
			<div className="mainContainer" >
				<PlayerStats 
					curHealth={this.state.Health} 
					curLevel={this.state.Level}
					nextLevel={this.state.NextLevel} 
					curWeapon={this.state.Weapon}
					curMap={this.state.CurMap}
					 />
					
				<Maps health={this.state.Health}
					  incHealth={this.increaseHealth}
					  weapon={this.state.Weapon}
					  upgradeWeapon={this.upgradeWeapon}
					  incMap={this.incMap}/>
			</div>
		)
	}
}