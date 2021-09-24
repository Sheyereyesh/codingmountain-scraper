import Puppeteer from 'puppeteer';

export interface CoinInterface {
	image: string;
	name: string;
	code: string;
	price: number;
	market_cap: string;
	change: string;
}

export default async function get_coin_list() {
	const browser = await Puppeteer.launch({ headless: false, devtools: true });
	const page = await browser.newPage();
	await page.goto('https://coinranking.com');
	const coin_list: CoinInterface[] = await page.evaluate(() => {
		const coin_table_rows = Array.from(
			document.querySelectorAll<HTMLTableRowElement>(
				'.coins-page .table .table__body tr:not(.table__row--ad)'
			)
		);
		return coin_table_rows.map((row) => {
			const coin_row_data = row.querySelectorAll('td');
			const coin_image_url =
				coin_row_data[0].querySelector<HTMLImageElement>(
					'.profile__logo-background img'
				)!.src;
			const coin_name = coin_row_data[0].querySelector<HTMLAnchorElement>(
				'.profile__name a'
			)!.textContent as string;
			const coin_code = coin_row_data[0].querySelector<HTMLSpanElement>(
				'.profile__name .profile__subtitle'
			)!.textContent as string;
			const coin_price = coin_row_data[1].querySelector<HTMLDivElement>(
				'.valuta'
			)!.textContent as string;
			const coin_market_cap =
				coin_row_data[2].querySelector<HTMLDivElement>('.valuta')!
					.textContent as string;
			const coin_change = coin_row_data[3].querySelector<HTMLDivElement>(
				'.change'
			)!.textContent as string;
			return {
				image: coin_image_url,
				name: coin_name.replace(/[\n]\s+/g, ''),
				code: coin_code.replace(/[\n\t\r\s]/g, ''),
				price: Number(coin_price.replace(/[^0-9.-]+/g, '')),
				market_cap: coin_market_cap.replace(/[\n]\s+/g, ''),
				change: coin_change.replace(/[\n]\s+/g, '')
			};
		});
	});
	browser.close();
	return coin_list;
}
