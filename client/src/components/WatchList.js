"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const WatchListEditModal_1 = require("./modal/WatchListEditModal");
const react_toastify_1 = require("react-toastify");
function WatchList(props) {
    const [editCoin, setEditCoin] = (0, react_1.useState)(undefined);
    function onDelete(id) {
        axios_1.default
            .delete('http://localhost:8000/api/watch_list/' + id)
            .then(function () {
            props.refreshList();
            react_toastify_1.toast.success('Deleted', {
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
					{props.coins.map((coin) => (<tr key={coin.id}>
							<td>
								<img src={coin.image} className="coin-image" alt={coin.name}/>
								<span>{coin.name}</span>
							</td>
							<td>{coin.code}</td>
							<td>{coin.price.price}</td>
							<td>{coin.watch_list.max_price}</td>
							<td>{coin.watch_list.min_price}</td>
							<td>
								<WatchListEditModal_1.WatchListEditModalButton onClick={() => setEditCoin(coin)}/>
								<button className="btn btn-danger" onClick={() => onDelete(coin.watch_list.id)}>
									delete
								</button>
							</td>
						</tr>))}
				</tbody>
			</table>
			<react_toastify_1.ToastContainer position="top-left" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
			<WatchListEditModal_1.WatchListEditModal coin={editCoin} onSubmit={props.refreshList}/>
		</>);
}
exports.default = WatchList;
