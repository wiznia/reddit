## Code Test

Built with [create-react-app](https://github.com/facebook/create-react-app)

[Demo](https://reddit-wiznia.netlify.com)

### Development process

1. Coded the main components, added the Redux store
2. Added the redux fetch service and main actions and reducers
3. Added redux local storage for persistance and refactored components
4. Added dismiss posts implementation
5. Added dismiss all implementation
6. Added react-swipeable to handle the drawer like behavior
7. Implemented sidebar drag functionality
8. Final touches and readme file

### Main Files

- App Component - Global file which holds the posts
- Post Component - Single Post component
- Actions - File containing all the actions used
- Reducers - File containing all the reducers used
- Services - File that handles the Reddit fetch service

### Installation notes

1. Clone the repository

```sh
$ git clone https://reddit-wiznia.netlify.com
```

2. Install necessary dependencies

```sh
$ npm install
```

3. Start the server

```sh
$ npm start
```
