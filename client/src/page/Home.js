"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const CoinList_1 = __importDefault(require("../components/CoinList"));
function App() {
    const [coins, setCoins] = (0, react_1.useState)([]);
    const [notifications, setNotifications] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(function () {
        axios_1.default.get('http://localhost:8000/api/coin').then(({ data }) => {
            setCoins(data);
        });
        axios_1.default.get('http://localhost:8000/api/notification').then(({ data }) => {
            setNotifications(data);
        });
    }, []);
    return (<div className="container-fluid">
			<div className="row">
				<div className="col-9">
					<div className="h3">Coins</div>
					<CoinList_1.default coins={coins}></CoinList_1.default>
				</div>
				<div className="col-3">
					<div className="h3">Notifications</div>
					<ul className="list-group">
						{notifications.map((notification) => (<li className="list-group-item">
									{notification.description}
								</li>))}
					</ul>
				</div>
			</div>
			<div className="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
				<div className="d-flex">
					<div className="toast-body">
						Hello, world! This is a toast message.
					</div>
					<button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
				</div>
			</div>
		</div>);
}
exports.default = App;
