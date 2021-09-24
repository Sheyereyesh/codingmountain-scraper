import { useEffect, useState } from 'react';
import axios from 'axios';

import WatchList from '../components/WatchList';
import { WatchListCoin } from '../types/WatchList';
import { WatchListAddModal } from '../components/modal/WatchListAddModal';

export default function WatchListPage() {
	const [coins, setCoins] = useState<WatchListCoin[]>([]);

	function refreshCoins() {
		axios.get('http://localhost:8000/api/coin').then(({ data }) => {
			setCoins(data);
		});
	}

	useEffect(refreshCoins, []);

	return (
		<>
			<div className="container">
				<div className="row">
					<div className="d-flex justify-content-between">
						<div className="h3">Watch List</div>
						<div>
							<WatchListAddModal
								coins={coins.filter((coin) => !coin.watch_list)}
								onSubmit={() => refreshCoins()}
							/>
						</div>
					</div>
					<WatchList
						coins={coins.filter((coin) => !!coin.watch_list)}
						refreshList={refreshCoins}
					/>
				</div>
			</div>
		</>
	);
}
