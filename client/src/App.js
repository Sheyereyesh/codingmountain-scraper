"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./page/Home"));
const WatchList_1 = __importDefault(require("./page/WatchList"));
const navbar_1 = __importDefault(require("./components/navbar"));
function App() {
    return (<div>
			<react_router_dom_1.BrowserRouter>
				<navbar_1.default />
				<react_router_dom_1.Switch>
					<react_router_dom_1.Route path="/" exact>
						<Home_1.default />
					</react_router_dom_1.Route>
					<react_router_dom_1.Route path="/watch_list">
						<WatchList_1.default />
					</react_router_dom_1.Route>
				</react_router_dom_1.Switch>
			</react_router_dom_1.BrowserRouter>
		</div>);
}
exports.default = App;
