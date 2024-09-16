# Star Wars API Explorer
https://medinabytes.github.io/Star-Wars-API-Explorer/Star%20Wars%20Explorer%20Encyclopedia/index.html

## Overview

The Star Wars API Explorer is a web application that provides an interactive way to explore various aspects of the Star Wars universe. Using the Star Wars APIs, users can search for and view information about characters, planets, starships, films, species, and vehicles.

## Technologies Used

- **HTML**: For structuring the web application.
- **CSS**: For styling and responsive design.
- **JavaScript**: For dynamic content loading and interactivity.
- **FontAwesome**: For icons representing categories.
- **SWAPI (Star Wars API)**: Provides data on Star Wars characters, planets, starships, films, species, and vehicles.
- **StarWars-API**: Provides additional detailed images for characters.

## Features

- **Category Sidebar**: Displays categories with relevant icons.
- **Search Functionality**: Search across all categories to filter results.
- **Detail View**: Click on an item to view detailed information.
- **Responsive Design**: Ensures a seamless experience across various devices.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MedinaBytes/Star-Wars-API-Explorer.git
   cd Star-Wars-API-Explorer
   ```

2. **Open `index.html` in a Web Browser**: Simply double-click `index.html` to open it in your default web browser.

## Usage

1. **Explore Categories**: Click on a category in the sidebar to fetch and view data related to that category.
2. **Search for Items**: Use the search bar to find items across all categories. Results will be displayed in the details section.
3. **View Details**: Click on an item in the results list to see detailed information.

## Code Structure

- **index.html**: The main HTML file for the application structure.
- **styles.css**: Contains styles for layout and responsiveness.
- **script.js**: Manages data fetching, user interactions, and UI updates.

## Key Code Snippets

### JavaScript Initialization

```javascript
async function initializeCategories() {
  const categoriesDiv = document.getElementById('categories');
  categoriesDiv.innerHTML = ''; // Clear previous categories if any

  for (const [category, iconClass] of Object.entries(categoryIcons)) {
    const categoryLink = document.createElement('div');
    categoryLink.className = 'category-link';
    categoryLink.dataset.category = category;

    const icon = document.createElement('i');
    icon.className = iconClass;
    categoryLink.appendChild(icon);

    const categoryName = document.createElement('span');
    categoryName.textContent = capitalizeFirstLetter(category);
    categoryLink.appendChild(categoryName);

    categoryLink.addEventListener('click', () => fetchCategoryData(category));

    categoriesDiv.appendChild(categoryLink);
  }
}
```

### CSS Styling

```css
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Star Jedi', sans-serif; /* Star Wars themed font */
}

.container {
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 100px);
}

.header {
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
}

.sidebar {
  width: 250px;
  background-color: #2c2c2c;
  color: #fff;
}

.category-link {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.category-link i {
  margin-right: 10px;
}

.footer {
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  width: 100%;
}
```

## Contributing

Feel free to fork the repository and submit a pull request with any improvements or fixes. Contributions and feedback are always welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project was part of a challenge by [Retos de Programación](https://retosdeprogramacion.com/roadmap) and [Mouredev](https://github.com/mouredev).

## Contact

For any questions or issues, please reach out to [jonathan.medinalabrador@gmail.com](mailto:jonathan.medinalabrador@gmail.com).
