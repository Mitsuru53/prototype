const createColumns = function(restaurant) {
  let columnDiv = document.createElement('div');
  columnDiv.classList.add('col-sm-4');

  let cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  columnDiv.append(cardDiv);

  let img = document.createElement('img');
  img.classList.add('card-img-top');
  img.setAttribute('src', restaurant.image_url);

  cardDiv.append(img);

  let cardBodyDiv = document.createElement('div');
  cardBodyDiv.classList.add('card-body');

  cardDiv.append(cardBodyDiv);

  let cardTitle = document.createElement('h5');
  cardTitle.classList.add('card-title');
  cardTitle.textContent = restaurant.name

  cardBodyDiv.append(cardTitle)

  let cardText = document.createElement('p');
  cardText.classList.add('card-text');

  cardText.textContent = restaurant.pr
  cardBodyDiv.append(cardText);

  let link = document.createElement('a');
  link.classList.add('btn');
  link.classList.add('btn-primary');
  link.href = restaurant.url;
  link.setAttribute('target', '_blank');
  link.textContent = 'ぐるなび'

  cardBodyDiv.append(link);

  return columnDiv;
}
