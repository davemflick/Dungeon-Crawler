import React from 'react';

export default class Directions extends React.Component{
	render(){
		return(
			<div className="directions">
				<h2> Instructions </h2>
				<ul>
					<li className="dirItem">Traverse all four levels and protect your yard!</li>
					<li className="dirItem">Collect 'Toys' to use as weapons.</li>
					<li className="dirItem">Each level has a new 'Toy' to increase damage to enemies.</li>
					<li className="dirItem">To battle enemies, just keep ramming them.</li>
					<li className="dirItem">Enemies are the cats and the evil neighbor kid.</li>
					<li className="dirItem">Collect 'Food Bowls' to increase health.</li>
					<li className="dirItem">The higher your Character Level, the more damage you cause.</li>
					<li className="dirItem">Defeat the evil neighbor kid to win the game.</li>
					<li className="dirItem">Now, go and protect your yard!</li>
				</ul>
			</div>
		)
	}
}