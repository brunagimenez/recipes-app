const alert = 'Sorry, we haven\'t found any recipes for these filters.';

export const ingredientApi = async (ingrediente) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
  const data = await response.json();
  if (data.meals === null) {
    global.alert(alert);
  } else {
    return data;
  }
};

export const nameApi = async (nome) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
  const data = await response.json();
  if (data.meals === null) {
    global.alert(alert);
  } else {
    return data;
  }
};

export const firstLetterApi = async (primeiraLetra) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
  const data = await response.json();
  if (data.meals === null) {
    global.alert(alert);
  } else {
    return data;
  }
};
