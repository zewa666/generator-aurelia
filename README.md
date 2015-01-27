# generator-aurelia

This is a Yeoman Generator for the [Skeleton App](https://github.com/aurelia/skeleton-navigation) of the [Aurelia](http://www.aurelia.io/) platform. It sets up a standard navigation-style app using gulp to build your ES6 code with the 6to5 compiler. Karma/Jasmine testing is also configured.

For more info please visit the official site: http://www.aurelia.io/


## Running The App

1. Verify that Yeoman is installed

  ```shell
  npm install -g yo
  ```
2. Install this generator

  ```shell
  npm install -g generator-aurelia
  ```
3. Create a new project folder and move into it in the terminal

  ```shell
  mkdir YOUR_PROJECT_NAME
  cd YOUR_PROJECT_NAME
  ```
4. Execute the following command

  ```shell
  yo aurelia
  ```
5. Install the apps NodeJS dependencies

  ```shell
  npm install
  ```
6. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
7. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g jspm
  ```
  > **Note:** jspm queries GitHub to install semver packages, but GitHub has a rate limit on anonymous API requests. It is advised that you configure jspm with your GitHub credentials in order to avoid problems. You can do this by executing `jspm endpoint config github` and following the prompts.
8. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```
  >**Note:** Windows users, if you experience an error of "unknown command unzip" you can solve this problem by doing `npm install -g unzip` and then re-running `jspm install`.
9. To run the app, execute the following command:

  ```shell
  gulp watch
  ```
10. Browse to [http://localhost:9000](http://localhost:9000) to see the app. You can make changes in the code found under `src` and the browser should auto-refresh itself as you save files.


## Creating a new page
In order to create a new Aurelia Page just enter the following command inside your project root:

  ```shell
  yo aurelia:page YOURPAGENAME
  ```

This will create a View and ViewModel with the given name inside the ```./src``` folder

## Credits
Thanks to Addy Osmani for his awesome [generator-boilerplate](https://github.com/addyosmani/generator-boilerplate) repo.
