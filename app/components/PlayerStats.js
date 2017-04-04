import React from 'react';


export default class PlayerStats extends React.Component{

	render() {
		return (
			<div className="playerStatsContainer">
				<h3>Player Stats</h3>
				<div className="stat">
				<h4>Health:</h4>
				<p id="currentHealth">{this.props.curHealth}</p>
				</div>
				<div className="stat">
				<h4>Character Level:</h4>
				<p id="currentLevel">{this.props.curLevel}</p>
				</div>
				<div className="stat">
				<h4>Next Level:</h4>
				<p id="nextLevel">{`${this.props.nextLevel} XP`}</p>
				</div>
				<div className="stat">
				<h4>Weapon:</h4>
				<p id="currentWeapon">{this.props.curWeapon}</p>
				</div>
				<div className="stat">
				<h4>Map:</h4>
				<p id="mapState">{this.props.curMap}</p>
				</div>
			</div>
		)
	}
}