# Project Name

Initial project description

## Principles, Docs and Methodologies

From the very beginning of the project, a clean architecture, well-decomposed code on the client side has been the ultimate objective. Especially reactivity and the reusability of the framework has been exploited to have a light and performant web app.

### Tools, conventions, design systems

- [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) have been used throught the development process for a clean and consistent versioning
- The project has been documented with the help of [jsdoc](https://jsdoc.app/)
- To have a clean reusability of components and a solid reusable structure, [atomic design](https://bradfrost.com/blog/post/atomic-web-design/) principles helped

## Steps to follow

## Project setup

Clone the repository to your local and run the available scripts provided below:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Explanations on version control and working as a team

After successfully setting up the project, the next step is to start working on it. Please follow the steps below:

- Accept the task assigned
- Read the description of the task
- Put it in-progress
- Create the remote branch out of develop.
  - Format: [type]/[project name]-[task id]-[description]
  - Sample: _bugfix/KKS-12-Button disable issue_
- Run `git pull` in the project directory
- Switch to the dedicated branch
- Implement your changes
- Commit frequently under the same branch. Do not collect a chunk of changes to commit.
- After you test your changes, please push your commits and create a pull request for the reviewer
- Your PR should be in this direction: _dedicated-branch -> develop_
- If anything goes wrong, please implement the requested changes in the same PR
- In each session, do not forget to synch your branch with the _develop_ branch
  - To do that, please merge `develop` branch into the `dedicated` branch
