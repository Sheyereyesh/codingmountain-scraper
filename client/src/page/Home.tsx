import { useEffect, useState } from 'react';
import axios from 'axios';

import CoinList from '../components/CoinList';

function App() {
	const [coins, setCoins] = useState([]);
	const [notifications, setNotifications] = useState([]);
	useEffect(function () {
		axios.get('http://localhost:8000/api/coin').then(({ data }) => {
			setCoins(data);
		});
		axios.get('http://localhost:8000/api/notification').then(({ data }) => {
			setNotifications(data);
		});
	}, []);

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-9">
					<div className="h3">Coins</div>
					<CoinList coins={coins}></CoinList>
				</div>
				<div className="col-3">
					<div className="h3">Notifications</div>
					<ul className="list-group">
						{notifications.map(
							(notification: { description: string }) => (
								<li className="list-group-item">
									{notification.description}
								</li>
							)
						)}
					</ul>
				</div>
			</div>
			<div
				className="toast align-items-center"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				<div className="d-flex">
					<div className="toast-body">
						Hello, world! This is a toast message.
					</div>
					<button
						type="button"
						className="btn-close me-2 m-auto"
						data-bs-dismiss="toast"
						aria-label="Close"
					></button>
				</div>
			</div>
		</div>
	);
}

export default App;
