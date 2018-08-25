# Setup for dev
- Install [json-server](https://github.com/typicode/json-server): `npm install -g json-server`

- Install dependencies: Navigate to the root, `OptiPlan/`, and run `npm install`

- In a terminal window, navigate to `mock-api` and run `sh start-optiplan.sh`

- In a terminal window, navigate to `mock-api` and run `sh start-griddy.sh`(**only required if you plan on using the search**)

- In another terminal window, run `npm run start` from the root.

- To run tests, go to the root directory and run `sh test/test.sh`. 
- To open the Cypress dashboard, run from the root directory: `sh test/test.sh open`
