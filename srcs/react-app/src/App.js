// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/navbar';

import Login from './components/login/login';
import Mylist from './components/booking/mylist';

function App() {
	return (
		<div className="App">
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header> */}
			<Navbar />
			<Login />
			
			
			
		</div>
	);
}

export default App;
