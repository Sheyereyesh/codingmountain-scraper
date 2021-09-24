interface Coin {
	id: number;
	name: string;
	image: string;
	code: string;
	price: {
		market_cap: string;
		price: number;
		change: string;
	};
}

interface CoinListProps {
	coins: Coin[];
}

export default function CoinList(props: CoinListProps) {
	return (
		<>
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
							<td>{coin.price.market_cap}</td>
							<td>{coin.price.change}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
