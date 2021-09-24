export interface WatchListCoin {
	id: number;
	name: string;
	image: string;
	code: string;
	price: { price: number };
	watch_list: {
		id: number;
		coin_id: number;
		max_price: number;
		min_price: number;
	};
}
