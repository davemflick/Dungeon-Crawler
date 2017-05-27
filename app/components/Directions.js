import React from 'react';

export default class Directions extends React.Component{
	render(){
		return(
			<div className="directions">
				<ul>
					<li className="dirItem">Traverse all four levels and protect your yard!</li>
					<li className="dirItem">Collect 'Toys' to use as weapons.</li>
					<li className="dirItem">Each level has a new 'Toy' to increase damage to enemies.</li>
					<li className="dirItem">To battle enemies, just keep ramming them.</li>
					<li className="dirItem">Enemies are the cats and the evil neighbor kid.</li>
					<li className="dirItem">Collect 'Food Bowls' to increase health.</li>
					<li className="dirItem">The higher your Character Level, the more damage you cause.</li>
				</ul>
			</div>
		)
	}
}