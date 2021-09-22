import get_coin_list from './get_coin_list';

setInterval(async () => {
  const coin_list = await get_coin_list();
  console.log(coin_list);
}, 20000);


