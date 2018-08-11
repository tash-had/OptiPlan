# Release Instructions 
1 - Uncomment Mock API URL from api/services/search-service.js

2- Remove `ui/js/mocks.js` and its corresponding script tag in`ui/index.html` and `css/mock.css` aswell as its `link` tag in `index.html`

3 - Remove the `mock-api` folder (make sure it's not on the prod server)

4 - Remove `renderjson` script tag from index.html 

# Setup for dev 
1- In a terminal window, navigate to `mock-api` and run `sh start-optiplan.sh` 

2- In a terminal window, navigate to `mock-api` and run `sh start-griddy.sh`(*only required if you plan on using the search*)

3- In another terminal window, run `npm run start`




