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
			XP: 0,
			NextLevel: 100,
			Weapon: 'None',
			CurMap: 1,
			gameOver: "none",
			viewTop: -220,
			viewLeft: -200,
			vK: 0,
			hK: 0,
			enemyCat: 40,
			enemyKid: 580,
			won: 0,
			results: "You've Killed the Dog.....Jerk",
		}

		this.increaseHealth = this.increaseHealth.bind(this);
		this.upgradeWeapon = this.upgradeWeapon.bind(this);
		this.incMap = this.incMap.bind(this);
		this.attackCat = this.attackCat.bind(this);
		this.attackKid = this.attackKid.bind(this);
		this.incLevel = this.incLevel.bind(this);
		this.replaceCatHealth = this.replaceCatHealth.bind(this);
		this.youWin = this.youWin.bind(this);
		this.incXP = this.incXP.bind(this);
	}

	incMap() {
		this.state.CurMap += 1;
		this.setState(this.state);
	}

	increaseHealth () {
		this.state.Health += 25;
		this.setState(this.state);
	}

	incXP () {
		if (this.state.Level < 4) {
			return this.state.NextLevel + " XP"
		} else {
			return "Top Level";
		}
	}

	upgradeWeapon () {
		let map = this.state.CurMap;
		if(map === 1){
			this.state.Weapon = 'Tennis Ball';
		} else if (map === 2) {
			this.state.Weapon = "Rubber Duck";
		} else if (map === 3) {
			this.state.Weapon = "Mr. Bear";
		} else if (map === 4) {
			this.state.Weapon = "Squeekers";
		}
		this.setState(this.state)
	}

	randomNum() {
		let num = Math.floor(Math.random() * 5);
		return num;
	}

	incLevel () {
		let xp = this.state.NextLevel;
		let level = this.state.Level;
		if(xp <= 0 ) {
			if (level == 1){
				this.state.Level = 2;
				this.state.NextLevel = 150;
				this.state.Health +=30;
			} else if ( level == 2 ) {
				this.state.Level = 3;
				this.state.NextLevel = 180;
				this.state.Health +=45;
			} else if ( level == 3 ) {
				this.state.Level = 4;
				this.state.NextLevel = 0;
				this.state.Health += 45;
			}
			
		}
		this.setState(this.state);
	}

	checkDamageGiven () {
		let damage = 4;
		let level = this.state.Level;
		let toy = this.state.Weapon;
		if (level === 1) {damage += 0}
		else if(level == 2) {damage += 10}
		else if(level == 3) {damage += 20}
		else if(level == 4) {damage += 30}
		if(toy === "None") {damage += 0}
		else if (toy == 'Tennis Ball') { damage += 9}
		else if (toy === 'Rubber Duck') { damage += 17}
		else if (toy === "Mr. Bear") {damage += 25}
		else if (toy === "Squeekers") {damage += 33}
		return damage;
	}



	attackCat () {
		let cat = this.state.enemyCat;
		let level = this.state.Level;
		if(level === 1){
			this.state.enemyCat -= this.checkDamageGiven();
			this.state.NextLevel -= 8;
			this.state.Health = this.state.Health - (12 + this.randomNum())
		} else if(level === 2) {
			this.state.enemyCat -= this.checkDamageGiven();
			this.state.NextLevel -= 12;
			this.state.Health = this.state.Health - (9 + this.randomNum())
		} else if(level === 3) {
			this.state.enemyCat -= this.checkDamageGiven();
			this.state.NextLevel -= 16;
			this.state.Health = this.state.Health - (5 + this.randomNum())
		} else if(level === 4) {
			this.state.enemyCat -= this.checkDamageGiven();
			this.state.Health = this.state.Health - (1 + this.randomNum())
		}
		this.setState(this.state);
		this.checkHealth();
	}

	attackKid () {
		let kid = this.state.enemyKid;
		let level = this.state.Level;
		if(level === 1){
			this.state.enemyKid -= this.checkDamageGiven();
			this.state.NextLevel -= 8;
			this.state.Health = this.state.Health - (30 + this.randomNum())
		} else if(level === 2) {
			this.state.enemyKid -= this.checkDamageGiven();
			this.state.NextLevel -= 12;
			this.state.Health = this.state.Health - (25 + this.randomNum())
		} else if(level === 3) {
			this.state.enemyKid -= this.checkDamageGiven();
			this.state.NextLevel -= 16;
			this.state.Health = this.state.Health - (20 + this.randomNum())
		} else if(level === 4) {
			this.state.enemyKid -= this.checkDamageGiven();
			this.state.NextLevel -= 20;
			this.state.Health = this.state.Health - (15 + this.randomNum())
		}
		this.setState(this.state);
		this.checkHealth();
	}

	replaceCatHealth () {
		if(this.state.enemyCat <= 0){
			this.setState( {enemyCat: 40,})
		}
	}

	checkHealth () {
		if (this.state.Health <=0) {
			this.state.gameOver = 'block';
			this.state.Health = 0;
			this.state.curMap = 1
			this.setState(this.state)
			}
	}

	youWin () {
		this.setState({
			viewTop: -220,
			viewLeft: -200,
			vK: 0,
			hK: 0,
			gameOver: "block",
			curMap: 1,
			results: "You've Defeated the Evil Neighbor Kid!",
		});
	}

	restartGame () {
		this.setState({
			Health: 100,
			Level: 1,
			XP: 0,
			NextLevel: 100,
			Weapon: 'None',
			CurMap: 1,
			gameOver: "none",
			viewTop: -220,
			viewLeft: -200,
			vK: 0,
			hK: 0,
			enemyCat: 40,
			enemyKid: 550,
			won: 0,
			results: "You've Killed the Dog.....Jerk",
		})
	}

	render() {
		return (
			<div className="mainContainer" >
				<PlayerStats 
					curHealth={this.state.Health} 
					curLevel={this.state.Level}
					nextLevel={this.incXP} 
					curWeapon={this.state.Weapon}
					curMap={this.state.CurMap}
					 />
				<div className="gameOver" ref="gameOver" style={{display: this.state.gameOver}}>
					<div className="popUp">
						<h2>{this.state.results}</h2>
						<button className="playAgain" onClick={this.restartGame.bind(this)}>Play Again</button>
					</div>
				</div>
				<Maps health={this.state.Health}
					  incHealth={this.increaseHealth}
					  weapon={this.state.Weapon}
					  upgradeWeapon={this.upgradeWeapon}
					  incMap={this.incMap}
					  curMap={this.state.CurMap}
					  attackCat={this.attackCat}
					  viewLeft={this.state.viewLeft}
					  viewTop={this.state.viewTop}
					  vK={this.state.vK}
					  hK={this.state.hK}
					  incLevel={this.incLevel}
					  enemyCat={this.state.enemyCat}
					  enemyKid={this.state.enemyKid}
					  fixCat={this.replaceCatHealth}
					  attackKid={this.attackKid}
					  winner={this.youWin}
					  won={this.state.won}
					  />
			</div>
		)
	}
}