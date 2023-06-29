# Full-stack app

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Full-stack app contains:

1. back-end server based on NodeJS, mongoDB...
2. front-end client based on React...

Client app allows you:

- to authorize user (sign-up/login/logout)
- to read list of posts from fake back-end server (https://jsonplaceholder.typicode.com/).

Use the `README.md` to get started.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

Full-stack app is based on front-end client:

[![React][React.js]][React-url].

Back-end server is done with [json-server](https://www.npmjs.com/package/json-server)

[![RestfulAPI][Restfulapi.net]][Restfulapi-url]

Another frameworks/libraries used in project:

[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![Typescript][Typescriptlang.org]][Typescript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/yarski25/react-basics.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Run test back-end server

   ```sh
   npm run dev
   ```

   _default port 4000 `package.json`_

   ```js
   "dev": "nodemon index.js"
   ```

4. Run front-end

   ```sh
   npm start
   ```

   _to change default port just change `package.json`_

   ```js
   "start": "react-scripts start --port 3000"
   ```

5. Enjoy full stack app :smile:

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Typescriptlang.org]: https://img.shields.io/badge/typescript-3399FF?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Restfulapi.net]: https://img.shields.io/badge/Rest-api-20232A?style=for-the-badge&logo=rest-api&logoColor=61DAFB
[Restfulapi-url]: https://restfulapi.net/
