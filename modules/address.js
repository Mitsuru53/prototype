const getCity = address => {
  let cities = getCitiesArray(address);
  let city_quantity = getCitiesQuantity(cities);
  return cities[city_quantity];
}

const getCitiesArray = address => address.split('、')

const getCitiesQuantity = cities =>  Math.floor(Math.random() * cities.length);

module.exports = { getCity: getCity };
