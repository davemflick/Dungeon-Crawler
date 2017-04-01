import React from 'react';


export default class Header extends React.Component{

	render() {
		return (
			<div className="headerContainer">
				<h1 className="header">Escape the Yard</h1>
				<p className="description"> A Roguelike Dungeon Crawler Game </p>
			</div>
		)
	}
}