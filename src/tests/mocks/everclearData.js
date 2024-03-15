export const everclearData = {
  drinks: [
    {
      strDrink: 'Berry Deadly',
      strDrinkThumb: 'https://www.thecocktaildb.com//images//media//drink//zk74k21593351065.jpg',
      idDrink: '12876',
    },
    {
      strDrink: 'Brain Fart',
      strDrinkThumb: 'https://www.thecocktaildb.com//images//media//drink//rz5aun1504389701.jpg',
      idDrink: '17120',
    },
    {
      strDrink: 'Danbooka',
      strDrinkThumb: 'https://www.thecocktaildb.com//images//media//drink//vurrxr1441246074.jpg',
      idDrink: '15409',
    },
    {
      strDrink: 'Pink Penocha',
      strDrinkThumb: 'https://www.thecocktaildb.com//images//media//drink//6vigjx1503564007.jpg',
      idDrink: '16992',
    },
  ],
};

export const mockEverClearFetch = () => Promise.resolve({
  status: 200,
  ok: true,
  json: () => Promise.resolve(everclearData),
});
