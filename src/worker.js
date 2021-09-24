import updateData from './lib/update_data';

setInterval(async () => {
  await updateData()
}, 1000 * 60 * 5);


