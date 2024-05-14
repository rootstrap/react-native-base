<p align="center">
  <img src="https://camo.githubusercontent.com/2a2696626c8fce8df0706969bb11303a11751f22b55e87ffc969925a046169c5/68747470733a2f2f73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f726f6f7473747261702e636f6d2f696d672f72732e706e67" width="100" alt="project-logo">
    <h1 align="center">React Native Base</h1>
🔥 A React Native starter kit Built with TypeScript, React Navigation, React Query, i18n, and zustand.
<br> 
<br> 


<img src="https://github.com/rootstrap/react-native-base/workflows/tests/badge.svg" style="flat-square&color=0080ff" alt="test-work-flow">	<img src="https://img.shields.io/github/languages/top/rootstrap/react-native-base?style=flat-square&color=0080ff" alt="repo-top-language">	<img src="https://img.shields.io/github/stars/rootstrap/react-native-base?style=flat-square&logo=github&logoColor=white&color=0080ff" alt="last-commit">	<img src="https://img.shields.io/github/issues/rootstrap/react-native-base?style=flat-square&logo=github&logoColor=white&color=0080ff" alt="repo-issues">[![Code Climate](https://api.codeclimate.com/v1/badges/8bb29bcea21bb5dda316/maintainability)](https://codeclimate.com/github/rootstrap/react-native-base/maintainability)
	

## Libraries
- [React Navigation](https://reactnavigation.org/)
- [React Query](https://react-query.tanstack.com/)
- [i18next](https://www.i18next.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Jest](https://jestjs.io/)
- [Axios](https://axios-http.com/docs/intro)
- [React Native MMKV](https://github.com/mrousavy/react-native-mmkv)
- [React Native Config](https://github.com/lugg/react-native-config)
- [React Native Bootsplash](https://github.com/zoontek/react-native-bootsplash)
---

## Features

- 📱 Latest React Native version, we are aware of the changes and improvements that RN Team is making and we are working to keep up with them.
- 📲 TypeScript to reduced bugs and improve code quality.
- 💾 VS Code Recommended Extensions to improve your development experience.
- 📋 Schemes: iOS custom schemes to build different environments.
- 🤖 Flavors for Android to build apps for different environments.
- ⚙️ React Native Config for environment variables.
- 🧑‍💻 Code Quality to format, lint, and test your code.
- 💻 Pre-commit actions to validate TypeScript code quality staged files and catch errors before committing.
- 🔧 Testing is done with Jest and React Native Testing Library.
- 🌍 Localization with i18next for localization.
- 💡 Dark Mode Support already implemented, as well as for the Splash Screen.
- 🚢 Navigation already configured.
- 🚀 Fast Folder Structure to boost the creation of new components.
- 📝 Custom scripts to bump build version using SemVer and to rename application.
---

## Why React Native Base?

Starting a react native project is often difficult and time consuming, because we need to set up a lot of dependencies and configurations, that almost every time would be the same or at least very similar for every project.

Here at Rootstrap we've been working and iterating over this project for a couple of years pulling together the best practices and tools to build high-quality React Native applications, and we think that this template will help you get started quickly and efficiently.

---

## Getting Started

System Requirements:

- React Native Environment: [Check official docs](https://reactnative.dev/docs/environment-setup)

### Installation

> 1. Clone the react-native-base repository:
>
> ```console
> $ git clone https://github.com/rootstrap/react-native-base
> ```
>
> 2. Change to the project directory:
>
> ```console
> $ cd react-native-base
> ```
>
> 3. Install the dependencies:
>
> ```console
> $ yarn install
> $ cd ios && pod install
> or
> $ npx pod-install
> ```

### Run your application on 🤖 Android or 🍎 iOS

<h4>We have flavors for Android and schemes for iOS to manage different environments</h4>
<p align="left">
You can easily run and build both platforms using the commands below:</p>

>
> ```console
> $ yarn ios:dev 
> $ yarn ios:qa
> $ yarn ios:release:qa
> $ yarn android:dev
> $ yarn android:qa
> $ yarn android:release:qa
> ```
> Check the package.json to see the full list of commands

### Tests

> Run the test suite using the command below:
>
> ```console
> $ yarn test
> ```

### Bump version

> Bump the version of the application using the command below:
>
> ```console
> $ yarn bump
> ```

Here you will be prompted to select the environment and the version you want to bump.

### Rename application

> Rename the application using the command below:
>
> ```console
> $ yarn rename
> ```

---

## Using Fast Folder Structure with our template

There's a folder named .fttemplates where you'll find a template to be used with the extension [vscode-fast-folder-structure](https://marketplace.visualstudio.com/items?itemName=Huuums.vscode-fast-folder-structure) to create components faster.

Then, you can create components by clicking on the Create new templated folder button in the context menu.

https://user-images.githubusercontent.com/11773865/216385411-9e152929-e6f7-41a2-a22c-5312509acbd4.mov


## Contributing

These template is open source, and at the moment is being developed by the Rootstrap team. We are always looking for contributors to help us improve the project and make it even better.

Also, if you need to built a custom React Native application, you can contact us at [rootstrap.com/contact](https://www.rootstrap.com/contact) to further discuss your project and how we can help you to achieve your goals.

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/rootstrap/react-native-base/issues)**: Submit bugs found or log feature requests for the `react-native-base` project.
- **[Submit Pull Requests](https://github.com/rootstrap/react-native-base/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/rootstrap/react-native-base/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/rootstrap/react-native-base
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/rootstrap/react-native-base/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=rootstrap/react-native-base">
   </a>
</p>
</details>

---

## License

This project is protected under the [MIT](https://choosealicense.com/licenses/mit/) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/mit/) file.

---

## Credits

[](https://github.com/rootstrap/react-native-base#credits)

React Native Base is maintained by [Rootstrap](http://www.rootstrap.com/) with the help of our [contributors](https://github.com/rootstrap/react-native-base/contributors).

[![](https://camo.githubusercontent.com/2a2696626c8fce8df0706969bb11303a11751f22b55e87ffc969925a046169c5/68747470733a2f2f73332d75732d776573742d312e616d617a6f6e6177732e636f6d2f726f6f7473747261702e636f6d2f696d672f72732e706e67)](http://www.rootstrap.com/)
