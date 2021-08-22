# UNFINISHED PROJECT - Web client for 'Diplomacy' boardgame

## Game
- [Diplomacy](https://en.wikipedia.org/wiki/Diplomacy_(game))

## Abandoned Project
- this project is unfinished and currently abandoned. Devs are most welcome to fork and play around with the code. The codebase has grown large and isn't documented as it is supposed to be. If any questions, let me know, I'm happy to help.


## Set up
- React, Bootstrapped with [Create React App](https://github.com/facebook/create-react-app), listens to port 3232
- consumes data from Rest API in the backend
- global state: context-api, custom hooks (useRootState(),  useRootDispatch())
- interactive map / SVG
- prop-types, eslint-airbnb
- all functional with hooks / no React class components

## What is missing? / Todos
- showing changing ownerships of zones on scrolling back and forwards in history. Finished prototyping the logic, needs more testing and extended to scroll n-turns. => reducerUI.js (starting line 591), BoardTurnModeBack.jsx, BoardTurnModeForward.jsx
- styling of overview lists
- In game messaging
- extended GM functions
- refacturing, restructring, documenting...

## Current Features
- auth (JWT)
- GM: setup, start and proceed
- User: subscribe to game, enter orders, display game positions
- UI: Change, customize, import and export colors of theme and UI elements
- Multi lang (i18next)

## Dev Notes
- The amount of API calls from client to backend is relatively high, most of all when game positions are displayed (see gameStartupProc.js). Resulting in a high number of re-renders on arrival of API responses. => Using a state management lib (i.e. Redux, Zustand) or using a query language for front- and backend (i.e. GraphQL) might improve overall performance.
- Fetched data from API calls are cached in the global state (naming: data<Endpoint>|<selector>) in order to avoid re-fetching data during same sessions. (Before executing the fetch, it is checked if this data is present in the state. If yes, the fetch returns the cached data. If not, the call to the backend API is fired and its response cached) => In order to force a re-fetch, delete the cached state or don't use the standard caller (apiCall.js).
- Data needed to display the map and game positions has two sources: 1) the logic of the map (neighbouring, type of zones such as land, coast or sea). This data is provided by the backend API. 2) Data needed to visualize the map (SVG shapes, labels, colors) is provided by a static file (mapconfig.json).