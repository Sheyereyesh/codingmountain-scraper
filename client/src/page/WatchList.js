"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const WatchList_1 = __importDefault(require("../components/WatchList"));
const WatchListAddModal_1 = require("../components/modal/WatchListAddModal");
function WatchListPage() {
    const [coins, setCoins] = (0, react_1.useState)([]);
    function refreshCoins() {
        axios_1.default.get('http://localhost:8000/api/coin').then(({ data }) => {
            setCoins(data);
        });
    }
    (0, react_1.useEffect)(refreshCoins, []);
    return (<>
			<div className="container">
				<div className="row">
					<div className="d-flex justify-content-between">
						<div className="h3">Watch List</div>
						<div>
							<WatchListAddModal_1.WatchListAddModal coins={coins.filter((coin) => !coin.watch_list)} onSubmit={() => refreshCoins()}/>
						</div>
					</div>
					<WatchList_1.default coins={coins.filter((coin) => !!coin.watch_list)} refreshList={refreshCoins}/>
				</div>
			</div>
		</>);
}
exports.default = WatchListPage;
