"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchListAddModal = void 0;
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
function WatchListAddModal(props) {
    const [coin_input, setCoin_input] = (0, react_1.useState)(null);
    const [max_price, setMax_price] = (0, react_1.useState)('');
    const [min_price, setMin_price] = (0, react_1.useState)('');
    const [coin_input_error, setCoin_input_error] = (0, react_1.useState)('');
    const [max_price_error, setMax_price_error] = (0, react_1.useState)('');
    const [min_price_error, setMin_price_error] = (0, react_1.useState)('');
    function onSubmit(e) {
        let should_submit_form = true;
        setCoin_input_error('');
        setMax_price_error('');
        setMin_price_error('');
        if (!coin_input) {
            setCoin_input_error('select a coin');
            should_submit_form = false;
        }
        if (!max_price) {
            setMax_price_error('enter max price');
            should_submit_form = false;
        }
        if (!min_price) {
            setMin_price_error('enter min price');
            should_submit_form = false;
        }
        if (parseFloat(min_price) >= parseFloat(max_price)) {
            setMin_price_error('min price should be lower that max price');
            should_submit_form = false;
        }
        if (!should_submit_form) {
            return;
        }
        axios_1.default
            .post('http://localhost:8000/api/watch_list', {
            coin_id: coin_input,
            max_price: max_price,
            min_price: min_price
        })
            .then(function ({ data }) {
            setCoin_input(null);
            setMax_price('');
            setMin_price('');
            react_toastify_1.toast.success('Added to watch list', {
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
            react_toastify_1.toast.error('Something went wrong', {
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
    return (<>
			<button className="btn btn-primary" data-bs-target="#watchlistadd" data-bs-toggle="modal" type="button">
				Add
			</button>
			<div className="modal fade" id="watchlistadd" aria-labelledby="watchlistaddLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="watchlistaddLabel">
								Add Watch List
							</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="coin" className="form-label">
										coin
									</label>
									<select className={'form-control ' +
            (coin_input_error
                ? 'is-invalid'
                : '')} id="coin" onChange={(e) => setCoin_input(e.target.value)}>
										<option>select coin</option>
										{props.coins.map((coin) => (<option value={coin.id} selected={coin_input ==
                coin.id.toString()}>
												{coin.name}
											</option>))}
									</select>
									<div className="invalid-feedback">
										{coin_input_error}
									</div>
								</div>
								<div className="mb-3">
									<label htmlFor="maxPrice" className="form-label">
										Max Price
									</label>
									<input type="number" className={'form-control ' +
            (max_price_error
                ? 'is-invalid'
                : '')} id="maxPrice" value={max_price} onChange={(e) => {
            setMax_price(e.target.value);
        }}></input>
									<div className="invalid-feedback">
										{max_price_error}
									</div>
								</div>
								<div className="mb-3">
									<label htmlFor="maxPrice" className="form-label">
										Min Price
									</label>
									<input type="number" className={'form-control ' +
            (min_price_error
                ? 'is-invalid'
                : '')} id="minPrice" value={min_price} onChange={(e) => {
            setMin_price(e.target.value);
        }}></input>
									<div className="invalid-feedback">
										{min_price_error}
									</div>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							<button type="button" className="btn btn-primary" onClick={onSubmit}>
								Save
							</button>
						</div>
					</div>
				</div>
				<react_toastify_1.ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
			</div>
		</>);
}
exports.WatchListAddModal = WatchListAddModal;
