const swapiBaseUrl = 'https://swapi.dev/api/';
const starWarsApiUrl = 'https://rawcdn.githack.com/akabab/starwars-api/0.2.1/api/';

const categories = {
  people: 82,
  planets: 60,
  films: 6,
  species: 37,
  vehicles: 39,
  starships: 36
};

const characterImages = {}; // Store character images
let allItems = {}; // Store all items for search functionality

// Initialize categories in sidebar
async function initializeCategories() {
  const categoriesDiv = document.getElementById('categories');
  categoriesDiv.innerHTML = ''; // Clear previous categories if any

  for (const category of Object.keys(categories)) {
    const categoryLink = document.createElement('div');
    categoryLink.className = 'category-link';
    categoryLink.dataset.category = category;
    categoryLink.textContent = capitalizeFirstLetter(category);

    categoryLink.addEventListener('click', () => fetchCategoryData(category));

    categoriesDiv.appendChild(categoryLink);
  }

  await fetchCharacterImages(); // Fetch images on initialization
  await fetchAllCategoryData(); // Fetch all data for search functionality
}

// Fetch and store character images
async function fetchCharacterImages() {
  try {
    const response = await fetch(`${starWarsApiUrl}all.json`);
    if (!response.ok) throw new Error('Failed to fetch character images');
    const data = await response.json();

    data.forEach(character => {
      characterImages[character.name] = character.image;
    });
  } catch (error) {
    console.error('Error fetching character images:', error);
  }
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Fetch and display data for a specific category
async function fetchCategoryData(category) {
  const url = `${swapiBaseUrl}${category}/`;
  let results = [];
  let page = 1;
  let hasNextPage = true;

  try {
    while (hasNextPage && results.length < categories[category]) {
      const response = await fetch(`${url}?page=${page}`);
      if (!response.ok) throw new Error(`Failed to fetch ${category} data`);
      const data = await response.json();
      results = results.concat(data.results);
      hasNextPage = !!data.next;
      page++;
      if (results.length >= categories[category]) {
        results = results.slice(0, categories[category]);
        hasNextPage = false;
      }
    }
    allItems[category] = results; // Store items for search functionality
    populateSidebar(category, results);
  } catch (error) {
    console.error('Error fetching category data:', error);
  }
}

// Fetch and display data for all categories
async function fetchAllCategoryData() {
  const promises = Object.keys(categories).map(category => fetchCategoryData(category));
  await Promise.all(promises);
}

// Populate the sidebar with items for a specific category
function populateSidebar(category, items) {
  const sidebarContent = document.getElementById('sidebar-content');
  sidebarContent.innerHTML = '';

  const itemList = document.createElement('ul');

  items.forEach(item => {
    const itemLi = document.createElement('li');
    itemLi.textContent = item.name || item.title;
    itemLi.dataset.category = category;
    itemLi.dataset.url = item.url; // Storing URL as a unique identifier

    itemLi.addEventListener('click', () => fetchDetails(itemLi.dataset.category, itemLi.dataset.url));

    itemList.appendChild(itemLi);
  });

  sidebarContent.appendChild(itemList);
}

// Fetch details from a given URL
async function fetchDetail(url) {
  try {
    console.log(`Fetching details from: ${url}`); // Debugging statement
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch detail from ${url}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching detail:', error);
    return null;
  }
}

// Fetch and display details
async function fetchDetails(category, url) {
  try {
    console.log(`Fetching details for category: ${category}, URL: ${url}`); // Debugging statement
    const data = await fetchDetail(url);

    if (!data) {
      document.getElementById('detail-content').innerHTML = '<p>Unable to fetch details.</p>';
      return;
    }

    let content = '';

    switch (category) {
      case 'people':
        const homeworldName = await fetchDetail(data.homeworld).then(res => res.name);
        const speciesNames = await Promise.all(data.species.map(url => fetchDetail(url).then(res => res.name)));
        const image = characterImages[data.name] || 'default-image-url'; // Replace with a default image URL if necessary

        content = `
          <h3>${data.name}</h3>
          <img src="${image}" alt="${data.name}" style="width: 200px; height: auto;" />
          <p>Height: ${data.height}</p>
          <p>Mass: ${data.mass}</p>
          <p>Gender: ${data.gender}</p>
          <p>Birth Year: ${data.birth_year}</p>
          <p>Homeworld: ${homeworldName}</p>
          <p>Species: ${speciesNames.join(', ')}</p>
        `;
        break;

      case 'planets':
        content = `
          <h3>${data.name}</h3>
          <p>Climate: ${data.climate}</p>
          <p>Terrain: ${data.terrain}</p>
          <p>Population: ${data.population}</p>
        `;
        break;

      case 'starships':
        content = `
          <h3>${data.name}</h3>
          <p>Model: ${data.model}</p>
          <p>Manufacturer: ${data.manufacturer}</p>
          <p>Cost: ${data.cost_in_credits} credits</p>
          <p>Starship Class: ${data.starship_class}</p>
        `;
        break;

      case 'films':
        content = `
          <h3>${data.title}</h3>
          <p>Director: ${data.director}</p>
          <p>Producer: ${data.producer}</p>
          <p>Release Date: ${data.release_date}</p>
          <p>Opening Crawl: ${data.opening_crawl.substring(0, 200)}...</p>
        `;
        break;

      case 'species':
        content = `
          <h3>${data.name}</h3>
          <p>Classification: ${data.classification}</p>
          <p>Designation: ${data.designation}</p>
          <p>Average Height: ${data.average_height}</p>
          <p>Skin Colors: ${data.skin_colors}</p>
        `;
        break;

      case 'vehicles':
        content = `
          <h3>${data.name}</h3>
          <p>Model: ${data.model}</p>
          <p>Manufacturer: ${data.manufacturer}</p>
          <p>Cost: ${data.cost_in_credits} credits</p>
          <p>Vehicle Class: ${data.vehicle_class}</p>
        `;
        break;

      default:
        content = '<p>Details not available.</p>';
    }

    document.getElementById('detail-content').innerHTML = content;
  } catch (error) {
    console.error('Error fetching details:', error);
    document.getElementById('detail-content').innerHTML = '<p>Unable to fetch details.</p>';
  }
}

// Search across all categories
function searchAllCategories(query) {
  query = query.toLowerCase();
  const filteredItems = [];

  Object.keys(allItems).forEach(category => {
    filteredItems.push(...allItems[category].filter(item =>
      (item.name || item.title || '').toLowerCase().includes(query)
    ).map(item => ({
      ...item,
      category, // Include category information
    })));
  });

  populateSidebar('search', filteredItems);
}

// Handle search form input
document.getElementById('search-form').addEventListener('submit', event => {
  event.preventDefault(); // Prevent form from submitting the traditional way
  const query = document.getElementById('search-input').value;
  searchAllCategories(query);
});

// Handle category selection
document.querySelectorAll('.category-link').forEach(link => {
  link.addEventListener('click', () => {
    const category = link.dataset.category;
    fetchCategoryData(category);
  });
});

// Fetch data on page load
document.addEventListener('DOMContentLoaded', initializeCategories);
