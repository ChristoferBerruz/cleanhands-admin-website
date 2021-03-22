# Cleanhands Admin App

## Introduction

This is the adminwebsite application for the cleanhands system.

## Tech stack

Proudly built using React and Bulma CSS.

## Bulma vs Bootstrap

Bulma is implemented are pure CSS classes. Hence, it is perfect as a pure style layer on top of a React Application.
Differently from Bootstrap, there is no Javascript nor JQuery. This has limitations: no carousels or accordions.
However, React provides enough capabilities to implement those.

If you are coming from Bootstrap, please check out how [Bootstrap classes translate to Bulma classes.](https://bulma.io/alternative-to-bootstrap/)

## Prettier

This project use prettier for code formatting and make it prettier. Please download the Prettier [VSCode extension.](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

**Important**: Enforce that prettier should only be active if a prettier config file is in folder. This will prevent prettier from formatting other projects.

Please add the following in your VSCode settings.json

```code
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode",
"prettier.requireConfig": true,
```

## Learn More

This website template was created using [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
