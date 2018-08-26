# Release Instructions
1 - Uncomment Mock API URL from api/services/search-service.js and update `SEARCH_COURSE_API` in `search.js`

2- Remove `ui/js/mocks.js` and its corresponding script tag in`ui/index.html` and `css/mock.css` aswell as its `link` tag in `index.html`

3 - Remove the `mock-api` folder (make sure it's not on the prod server)

4 - Remove `renderjson` script tag from index.html
