# jose-rodrigues.info


## Getting started

The website is built with [Solid](https://github.com/solidjs/solid).

### Prerequisites

- [yarn](https://yarnpkg.com/getting-started/install)

### Install

1. Clone the project locally: `git clone https://github.com/solidjs/solid-site`
2. Change directory into your local copy: `cd solid-site`
3. Install the dependencies: `yarn install`

### Available commands

- `yarn install`: Install the dependencies
- `yarn dev`: Start the dev server
- `yarn build`: Build the project
- `yarn format`: Format the whole project with prettier

### PWA Testing

Solid Site supports PWA and worker auto updating powered by Vite PWA Plugin. When testing `run yarn https-preview`. Running it the first time will ask to install the certificate if not yet done. Then open your Chrome and press F12 > Network Tab > browse to https://localhost. Wait until the network requests with gears at the begining stops downloading the SW precache, then on the same Network Tab just change `No throttling` option to `Offline`. All pages should work by pressing F5 (do not do a hard refresh Crtl + F5 as it will force the browser to go to the server and the Chrome Dinosaur will appear).
