import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { WatchListCoin } from '../../types/WatchList';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

interface WatchListEditModalProps {
	coin: WatchListCoin | undefined;
	onSubmit: (coin: WatchListCoin) => any;
}

interface WatchListEditModalButtonProps {
	onClick: () => any;
}

export function WatchListEditModalButton(props: WatchListEditModalButtonProps) {
	return (
		<button
			className="btn btn-primary"
			data-bs-target="#watchlistEdit"
			data-bs-toggle="modal"
			type="button"
			onClick={props.onClick}
		>
			Edit
		</button>
	);
}

export function WatchListEditModal(props: WatchListEditModalProps) {
	const [max_price, setMax_price] = useState('');
	const [min_price, setMin_price] = useState('');
	const [max_price_error, setMax_price_error] = useState('');
	const [min_price_error, setMin_price_error] = useState('');

	useEffect(() => {
		if (props.coin) {
			setMax_price(props.coin.watch_list.max_price.toString());
			setMin_price(props.coin.watch_list.min_price.toString());
		}
	}, [props.coin]);

	function onSubmit(e: FormEvent) {
		if (!props.coin) {
			return;
		}

		let should_submit_form = true;
		setMax_price_error('');
		setMin_price_error('');
		if (!max_price) {
			setMax_price_error('enter max price');
			should_submit_form = false;
		}

		if (!min_price) {
			setMin_price_error('enter min price');
			should_submit_form = false;
		}

		if (min_price >= max_price) {
			setMin_price_error('min price should be lower that max price');
			should_submit_form = false;
		}
		if (!should_submit_form) {
			return;
		}

		axios
			.put(
				'http://localhost:8000/api/watch_list/' +
					props.coin.watch_list.id,
				{
					max_price: max_price,
					min_price: min_price
				}
			)
			.then(function ({ data }) {
				toast.success('Saved', {
					position: 'top-left',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
				props.onSubmit(data);
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
		<div
			className="modal fade"
			id="watchlistEdit"
			aria-labelledby="watchlistEditLabel"
			aria-hidden="true"
		>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="watchlistEditLabel">
							Edit
						</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<form>
							<table className="table">
								<thead>
									<tr>
										<th>Coin</th>
										<th>Code</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>{props.coin?.name}</td>
										<td>{props.coin?.code}</td>
										<td>{props.coin?.price.price}</td>
									</tr>
								</tbody>
							</table>
							<div className="mb-3">
								<label
									htmlFor="maxPrice"
									className="form-label"
								>
									Max Price
								</label>
								<input
									type="text"
									className={
										'form-control ' +
										(max_price_error ? 'is-invalid' : '')
									}
									id="maxPrice"
									value={max_price}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => {
										setMax_price(e.target.value);
									}}
								></input>
								<div className="invalid-feedback">
									{max_price_error}
								</div>
							</div>
							<div className="mb-3">
								<label
									htmlFor="maxPrice"
									className="form-label"
								>
									Min Price
								</label>
								<input
									type="text"
									className={
										'form-control ' +
										(min_price_error ? 'is-invalid' : '')
									}
									id="minPrice"
									value={min_price}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => {
										console.log(e.target.value);
										setMin_price(e.target.value);
									}}
								></input>
								<div className="invalid-feedback">
									{min_price_error}
								</div>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							data-bs-dismiss="modal"
						>
							Close
						</button>
						<button
							type="button"
							className="btn btn-primary"
							onClick={onSubmit}
						>
							Save changes
						</button>
					</div>
				</div>
			</div>

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
		</div>
	);
}
