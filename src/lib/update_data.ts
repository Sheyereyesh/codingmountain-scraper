import get_coin_list, { CoinInterface } from '../lib/get_coin_list';
import Coin from '../models/Coin';
import WatchList from '../models/WatchList';
import Notification from '../models/Notification';

export default async function updateData() {
	const coins: CoinInterface[] = await get_coin_list();
	coins.forEach((coin) => {
		Coin.findOrCreate({
			where: {
				name: coin.name
			},
			defaults: coin
		}).then(async ([data]) => {
			const price = await data.getPrice();
			if (!price) {
				await data.createPrice({
					price: coin.price,
					market_cap: coin.market_cap,
					change: coin.change
				});
			} else {
				price.price = coin.price;
				price.market_cap = coin.market_cap;
				price.change = coin.change;
				await price.save();
			}
			const watchListItem = await WatchList.findOne({
				where: { coin_id: data.id }
			});

			if (
				!!watchListItem &&
				(watchListItem.max_price < coin.price ||
					watchListItem.min_price > coin.price)
			) {
				await Notification.create({
					coin_id: data.id,
					description: `${data.code} is on the move, The Price has changed by ${coin.change} in 24 hr to $${coin.price}`
				});
			}
		});
	});
}
