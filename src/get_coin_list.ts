import Puppeteer from 'puppeteer';

interface Coin {
	coin_image_url: string;
	coin_name: string;
	coin_code: string;
	coin_price: number;
	coin_market_cap: string;
	coin_change: string;
}

export default async function get_coin_list() {
	const browser = await Puppeteer.launch({ headless: false, devtools: true });
	const page = await browser.newPage();
	await page.goto('https://coinranking.com');
	const coin_list: Coin[] = await page.evaluate(() => {
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
				coin_image_url: coin_image_url,
				coin_name: coin_name.replace(/[\n]\s+/g, ''),
				coin_code: coin_code.replace(/[\n\t\r\s]/g, ''),
				coin_price: Number(coin_price.replace(/[^0-9.-]+/g, '')),
				coin_market_cap: coin_market_cap.replace(/[\n]\s+/g, ''),
				coin_change: coin_change.replace(/[\n]\s+/g, '')
			};
		});
	});
	return coin_list;
}
