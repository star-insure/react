# Star Insure - React
A library of shared components for Star Insure React + Inertia.js projects.

## Installation
```
npm install @star-insure/react
```

Make sure you update the `tailwind.config.js` file so it doesn't purge classes from this package.
```json
module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@star-insure/react/**/*.{js,ts,jsx,tsx}",
      ],
    ...
}
```

## Development
```bash
npm start
```
### Testing
```
npm run test
```

## Publishing to NPM
Suggest that you use [np](https://github.com/sindresorhus/np) for publishing.

From the command line just run:
```
np
```
