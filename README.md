# BookMarked!

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
\
![GitHub commit activity (main)](https://img.shields.io/github/commit-activity/m/Khaleelur-Rahman/BookMarked)
![GitHub contributors](https://img.shields.io/github/contributors/Khaleelur-Rahman/BookMarked)
![Static Badge](https://img.shields.io/badge/build-passing-brightgreen)
![Static Badge](https://img.shields.io/badge/repo%20status-active-brightgreen)
![Static Badge](https://img.shields.io/badge/netlify-deployed-blue)

![website-image](https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp)

### A Robust React.js Project that depicts the usage of a backend and database coupled with REST API Integration

## Table of Contents

&nbsp;1. [What is BookMarked!](#what-is-bookmarked)

&nbsp;2. [Why BookMarked!](#why-bookmarked)

&nbsp;3. [Description](#tech-stack)

&nbsp;4. [What does BookMarked! offer?](#what-does-bookmarked-offer)

&nbsp;5. [Working with the project locally](#working-with-the-project-locally)

&nbsp;6. [Running Tests](#running-tests)

&nbsp;7. [Demo](#demo)

&nbsp;8. [Screenshots](#screenshots)

&nbsp;9. [Contributing](#contributing)

&nbsp;10. [License](#license)

&nbsp;11. [Contact](#contact)

&nbsp;12. [Acknowledgements](#acknowledgements)

## What is BookMarked!

BookMarked! is a tool that can help you write reviews for books that you have read and to keep track of the books that you would like to read in the future, in just a few clicks.

## Why BookMarked!

Have you ever felt the pain of not remembering what books you have read and how the stories end?

Fret not, you are not alone!

BookMarked! was desgined to eradicate the pain of book lovers', like myself, who note down the books that they have read and give short reviews in their notebook or even in their phone. This is of course troublesome and not user attractive.

## Tech Stack

BookMarked! is a project that was built primarily around Javascript. The various frameworks and libraries used in this project are :

![My Skills](https://skills.thijs.gg/icons?i=react,js,css,tailwind,nodejs,git,netlify)

- **Frontend** - _[React.js](https://legacy.reactjs.org/docs/getting-started.html)_
- **Styling** - _[Tailwind CSS](https://tailwindcss.com/resources) and [vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)_
- **Backend** - _[Node.js](https://nodejs.org/it/docs)_
- **Database** - _[Firestore](https://firebase.google.com/docs/firestore)_
- **Authentication** - _[Firebase Authentication](https://firebase.google.com/docs/auth)_
- **Pop-up Notifications** - _[Toastify](https://fkhadra.github.io/react-toastify/introduction)_
- **Routing** - _[react-router-dom](https://reactrouter.com/en/main)_
- **API Requests** - _[axios](https://axios-http.com/docs/intro)_
- **Version Control** - _[git](https://git-scm.com/doc)_
- **Hosting** - _[netlify](https://docs.netlify.com/)_
- **Testing** - _[Jest](https://jestjs.io/docs/getting-started)_

## What does BookMarked! offer?

- Fully functional authentication
- Fully responsive
- Mobile-friendly
- Search books from a pool of 400 million books in over 500 languages
- Add books that you have read to readlist with a custom review and rating
- Add books to wishlist that you intend to read in the future
- View, edit and delete books' description
- View book details on google books website

## Working with the project locally

&nbsp;1. **Fork the repository:** Click the "Fork" button at the top right corner of this GitHub repository. This will create a copy of the project in your GitHub account.

\
 2. **Clone the repository:** Clone the forked repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/your-forked-repo.git
```

\
3. **Navigate to the project directory:** Move into the project directory using the following command:

```bash
cd your-forked-repo
```

\
4. **Install all the required dependencies:** Use npm to install all the necessary dependencies for the project:

```bash
npm install
```

\
5. **Create a database** ([firebase project](https://firebase.google.com/docs)): Navigate to https://console.firebase.google.com/u/0/
and follow the steps :

- Select Add project (if you already have an existing project) or Create a project (if this is your first project). Follow the prompts to add `project name` and `Google Analytics`. Click `create project` to start creating project.

- Once done, you will land on this page:
  ![landingPageFS](https://github.com/Khaleelur-Rahman/BookMarked/assets/111182931/020dd44e-8178-49a6-a9dc-37fa275d489e)

  Click on `Build` and then `Firestore Database`. Then, click `create database`.

- Select `start in production mode` and a `firestore location`
- If `cannot enable firestore for this project` error occurs, try to disable CORS in your browser.
- Once in the `Cloud Firestore page`, create two documents with auto-Ids `ToRead` :

| Field        | Type     |
| :----------- | :------- |
| `book`       | `map`    |
| `dateToRead` | `string` |
| `docID`      | `string` |
| `notes`      | `string` |
| `title`      | `string` |
| `userId`     | `string` |

and `Read` :

| Field           | Type     |
| :-------------- | :------- |
| `book`          | `map`    |
| `dateCompleted` | `string` |
| `description`   | `string` |
| `rating`        | `string` |
| `userId`        | `string` |

- Go to `project settings` and select `firebase to your webapp`. Take note of all the SDK's that is displayed:
  <img src="https://github.com/Khaleelur-Rahman/BookMarked/assets/111182931/2b345b56-5cda-4caf-975e-902d9594561e" width ="500" height="500">
- Set up authentication as email address and password and using gmail.

\
6. **REST API with Google Books** :

- Go to https://console.cloud.google.com/apis/dashboard and add a project
- Enable `books API` in google console
- Go to `credentials` to obtain `API Key`

\
7. **Create a `.env`** file at the root of the directory which looks something like this:
<img src ="https://github.com/Khaleelur-Rahman/BookMarked/assets/111182931/be8ebb82-9dbb-470a-91be-15063d3828e5" width ="500" height="500">
\
Add the relevant info into the file which were taken from steps 4 and 5.

\
8. **Run the project:** Start the development server and run the project locally using the following command:

```bash
npm run start
```

\
9. **View the project in the browser:** Once the project is running, open your web browser and go to http://localhost:3000/ to view the app. Any changes you make to the code will automatically be reflected in the browser.

Woohoo! You have successfully set up and started the React project on your local machine. Now you can start working on the project, make changes, and explore the codebase. Happy coding!

## Running Tests

![Static Badge](https://img.shields.io/badge/test-passing-brightgreen)

The project contains test cases to verify the functionality of various components using [Jest](https://jestjs.io/docs/getting-started). The test files are located in the `layouts` and `pages` folders.

To run tests, run the following command

```bash
  npm run test
```

Press `a` to run all the test cases or run the following command to run specific test files

```bash
  npm run  -- path_to_test_file
```

\
Feel free to add your own test cases and files :)

## Demo

https://bookmarkedproj.netlify.app

## Screenshots

![HomePage](https://github.com/Khaleelur-Rahman/BookMarked/blob/main/src/images/Screenshots_for_readme/HomePage.png)
![Login](https://github.com/Khaleelur-Rahman/BookMarked/blob/main/src/images/Screenshots_for_readme/Login.png)
![Booksearch](https://github.com/Khaleelur-Rahman/BookMarked/blob/main/blob/main/src/images/Screenshots_for_readme/Booksearch.png)
![booksearchResults](https://github.com/Khaleelur-Rahman/BookMarked/blob/main/src/images/Screenshots_for_readme/booksearchResults.png)
![readlist](https://github.com/Khaleelur-Rahman/BookMarked/blob/main/src/images/Screenshots_for_readme/readlist.png)
![WishlistReview](https://github.com/Khaleelur-Rahman/BookMarked/blob/main/src/images/Screenshots_for_readme/WishlistReview.png)
![wishlist](https://github.com/Khaleelur-Rahman/BookMarked/blob/main/src/images/Screenshots_for_readme/wishlist.png)

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

KHALEELUR RAHMAN:

[![linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/khaleelur-rahman-a79284262/)
[![gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](khaleelrrahman2002@gmail.com)

## Acknowledgements

- [Awesome Readme Templates](https://awesomeopensource.com/project/elangosundar/awesome-README-templates)
- [Awesome README](https://github.com/matiassingers/awesome-readme)
- [How to write a Good readme](https://bulldogjob.com/news/449-how-to-write-a-good-readme-for-your-github-project)
- [w3Schools](https://www.w3schools.com)
- [geeksforgeeks](https://www.geeksforgeeks.org/)
- [The Ultimate List of Web-Safe HTML and CSS Fonts](https://blog.hubspot.com/website/web-safe-html-css-fonts)
- [Malven's flexbox cheatsheet](https://flexbox.malven.co/)
