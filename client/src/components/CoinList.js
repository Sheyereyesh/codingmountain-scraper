"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CoinList(props) {
    return (<>
			<table className="table">
				<thead>
					<tr>
						<th>Coin</th>
						<th>Code</th>
						<th>Price</th>
						<th>Market Cap</th>
						<th>24h</th>
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
							<td>{coin.price.market_cap}</td>
							<td>{coin.price.change}</td>
						</tr>))}
				</tbody>
			</table>
		</>);
}
exports.default = CoinList;
