import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './containers/Main'



class App extends React.Component{

	render() {
		return (
			<div className="fullPageContainer" >
				<Header />
				<Main />
				<Footer />
			</div>
		)
	}
}


ReactDOM.render(<App />, document.getElementById('app'))