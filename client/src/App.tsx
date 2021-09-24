import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './page/Home';
import WatchList from './page/WatchList';
import Navbar from './components/navbar';

export default function App() {
	return (
		<div>
			<Router>
				<Navbar />
				<Switch>
					<Route path="/" exact>
						<Home />
					</Route>
					<Route path="/watch_list">
						<WatchList />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}
