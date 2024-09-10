// Function to fetch and display People
function fetchPeople() {
    fetch('https://swapi.dev/api/people/')
      .then(response => response.json())
      .then(data => {
        const peopleList = document.getElementById('people-list');
        peopleList.innerHTML = ''; // Clear previous data
        data.results.forEach(person => {
          const personDiv = document.createElement('div');
          personDiv.innerHTML = `
            <h3>${person.name}</h3>
            <p>Height: ${person.height}</p>
            <p>Mass: ${person.mass}</p>
            <p>Gender: ${person.gender}</p>
            <p>Birth Year: ${person.birth_year}</p>
          `;
          peopleList.appendChild(personDiv);
        });
      })
      .catch(error => console.error('Error fetching people:', error));
  }
  
  // Function to fetch and display Planets
  function fetchPlanets() {
    fetch('https://swapi.dev/api/planets/')
      .then(response => response.json())
      .then(data => {
        const planetsList = document.getElementById('planets-list');
        planetsList.innerHTML = ''; // Clear previous data
        data.results.forEach(planet => {
          const planetDiv = document.createElement('div');
          planetDiv.innerHTML = `
            <h3>${planet.name}</h3>
            <p>Climate: ${planet.climate}</p>
            <p>Terrain: ${planet.terrain}</p>
            <p>Population: ${planet.population}</p>
          `;
          planetsList.appendChild(planetDiv);
        });
      })
      .catch(error => console.error('Error fetching planets:', error));
  }
  
  // Function to fetch and display Starships
  function fetchStarships() {
    fetch('https://swapi.dev/api/starships/')
      .then(response => response.json())
      .then(data => {
        const starshipsList = document.getElementById('starships-list');
        starshipsList.innerHTML = ''; // Clear previous data
        data.results.forEach(starship => {
          const starshipDiv = document.createElement('div');
          starshipDiv.innerHTML = `
            <h3>${starship.name}</h3>
            <p>Model: ${starship.model}</p>
            <p>Manufacturer: ${starship.manufacturer}</p>
            <p>Cost: ${starship.cost_in_credits} credits</p>
            <p>Starship Class: ${starship.starship_class}</p>
          `;
          starshipsList.appendChild(starshipDiv);
        });
      })
      .catch(error => console.error('Error fetching starships:', error));
  }
  
  // Function to fetch and display Films
  function fetchFilms() {
    fetch('https://swapi.dev/api/films/')
      .then(response => response.json())
      .then(data => {
        const filmsList = document.getElementById('films-list');
        filmsList.innerHTML = ''; // Clear previous data
        data.results.forEach(film => {
          const filmDiv = document.createElement('div');
          filmDiv.innerHTML = `
            <h3>${film.title}</h3>
            <p>Director: ${film.director}</p>
            <p>Producer: ${film.producer}</p>
            <p>Release Date: ${film.release_date}</p>
            <p>Opening Crawl: ${film.opening_crawl.substring(0, 200)}...</p> <!-- First 200 characters -->
          `;
          filmsList.appendChild(filmDiv);
        });
      })
      .catch(error => console.error('Error fetching films:', error));
  }
  
  // Fetch data on page load
  document.addEventListener('DOMContentLoaded', () => {
    fetchPeople();
    fetchPlanets();
    fetchStarships();
    fetchFilms();
  });
  