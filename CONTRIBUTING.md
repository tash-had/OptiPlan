# Setup
- Install [json-server](https://github.com/typicode/json-server): `npm install -g json-server`

- Install dependencies: Navigate to the root, `OptiPlan/`, and run `npm install`

- In a terminal window, navigate to `mock-api` and run `sh start-optiplan.sh`

- In a terminal window, navigate to `mock-api` and run `sh start-griddy.sh`(**only required if you plan on using the search**)

- In a terminal window, run `npm install -g typescript`

# For API Development 
- In a seperate terminal window, run `npm run start` from the root.
- Ignore any mongo-related errors in the terminal.
- You can now write in JS or TS 

# For UI Development
- In a seperate terminal window, run `npm run start:ui` from the root. 
- You can write HTML/CSS/JS/TS files in `ui/` and everytime you save, your TypeScript will be compiled and you will be able to go to `ui-build/index.html` to run the webpage. 

- Remember to add your typescript files with a `.js` extension when declaring them in your HTML `<script></script>` tags. 

- The HTML file in `ui/` is hidden (ie. named `.index.html`) to prevent you from accidentally opening `ui/index.html` instead of `ui-build/index.html`

# Tests
- To run tests, go to the root directory and run `sh test/test.sh`. 

- To open the Cypress dashboard, run from the root directory: `sh test/test.sh open`

