# Release Instructions
1 - Uncomment Mock API URL from 
- `api/services/search-service.js` 
- `ui/services/search.js`
- `ui/models/course.js`

2- Remove `ui-build/scripts/mocks.js` and its corresponding `script` tag in`ui-build/index.html` and `css/mock.css` aswell as its `link` tag in `index.html`

3 - Remove the `mock-api` folder (make sure it's not on the prod server)

4 - Remove `renderjson` script tag from index.html
