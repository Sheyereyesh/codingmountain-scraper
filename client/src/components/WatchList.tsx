import axios from 'axios';
import { useState } from 'react';
import { WatchListCoin } from '../types/WatchList';
import {
	WatchListEditModal,
	WatchListEditModalButton
} from './modal/WatchListEditModal';
import { ToastContainer, toast } from 'react-toastify';

interface WatchListProps {
	coins: WatchListCoin[];
	refreshList: () => any;
}

export default function WatchList(props: WatchListProps) {
	const [editCoin, setEditCoin] = useState<WatchListCoin | undefined>(
		undefined
	);

	function onDelete(id: number) {
		axios
			.delete('http://localhost:8000/api/watch_list/' + id)
			.then(function () {
				props.refreshList();
				toast.success('Deleted', {
					position: 'top-left',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
			})
			.catch((error) => {
				toast.error('Something went wrong', {
					position: 'top-left',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
			});
	}

	return (
		<>
			<table className="table">
				<thead>
					<tr>
						<th>Coin</th>
						<th>Code</th>
						<th>Price</th>
						<th>Max Price</th>
						<th>Min Price</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{props.coins.map((coin) => (
						<tr key={coin.id}>
							<td>
								<img
									src={coin.image}
									className="coin-image"
									alt={coin.name}
								/>
								<span>{coin.name}</span>
							</td>
							<td>{coin.code}</td>
							<td>{coin.price.price}</td>
							<td>{coin.watch_list.max_price}</td>
							<td>{coin.watch_list.min_price}</td>
							<td>
								<WatchListEditModalButton
									onClick={() => setEditCoin(coin)}
								/>
								<button
									className="btn btn-danger"
									onClick={() => onDelete(coin.watch_list.id)}
								>
									delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<ToastContainer
				position="top-left"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<WatchListEditModal coin={editCoin} onSubmit={props.refreshList} />
		</>
	);
}
