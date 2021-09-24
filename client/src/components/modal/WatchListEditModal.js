"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchListEditModal = exports.WatchListEditModalButton = void 0;
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_toastify_1 = require("react-toastify");
function WatchListEditModalButton(props) {
    return (<button className="btn btn-primary" data-bs-target="#watchlistEdit" data-bs-toggle="modal" type="button" onClick={props.onClick}>
			Edit
		</button>);
}
exports.WatchListEditModalButton = WatchListEditModalButton;
function WatchListEditModal(props) {
    var _a, _b, _c;
    const [max_price, setMax_price] = (0, react_1.useState)('');
    const [min_price, setMin_price] = (0, react_1.useState)('');
    const [max_price_error, setMax_price_error] = (0, react_1.useState)('');
    const [min_price_error, setMin_price_error] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        if (props.coin) {
            setMax_price(props.coin.watch_list.max_price.toString());
            setMin_price(props.coin.watch_list.min_price.toString());
        }
    }, [props.coin]);
    function onSubmit(e) {
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
        axios_1.default
            .put('http://localhost:8000/api/watch_list/' +
            props.coin.watch_list.id, {
            max_price: max_price,
            min_price: min_price
        })
            .then(function ({ data }) {
            react_toastify_1.toast.success('Saved', {
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
    return (<div className="modal fade" id="watchlistEdit" aria-labelledby="watchlistEditLabel" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="watchlistEditLabel">
							Edit
						</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
										<td>{(_a = props.coin) === null || _a === void 0 ? void 0 : _a.name}</td>
										<td>{(_b = props.coin) === null || _b === void 0 ? void 0 : _b.code}</td>
										<td>{(_c = props.coin) === null || _c === void 0 ? void 0 : _c.price.price}</td>
									</tr>
								</tbody>
							</table>
							<div className="mb-3">
								<label htmlFor="maxPrice" className="form-label">
									Max Price
								</label>
								<input type="text" className={'form-control ' +
            (max_price_error ? 'is-invalid' : '')} id="maxPrice" value={max_price} onChange={(e) => {
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
								<input type="text" className={'form-control ' +
            (min_price_error ? 'is-invalid' : '')} id="minPrice" value={min_price} onChange={(e) => {
            console.log(e.target.value);
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
							Save changes
						</button>
					</div>
				</div>
			</div>

			<react_toastify_1.ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
		</div>);
}
exports.WatchListEditModal = WatchListEditModal;
