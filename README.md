# Motion

Motion is a bicycle rental web application and management system built for
Adam Smith's portfolio. You can rent bikes anytime within 3 - 4 months from
today's date. Any updates such as ratings or administrative adjustments are
automatically saved to the cloud. You can filter results with ease. To use
the management system you must be logged in as a manager.

## Table Of Contents
- Install Application
- Browser Compatibility
- View Live Web App
- Demo Credentials
- Project Overview
- Project Structure
- Contact Information

## Install Application

To install this application you must have Node.js version 14, 15, 16, 17, or
18 and NPM version 8 installed on your computer. To install use the following
command.

```sh
cd <repo-root>
npm install
```

## Browser Compatibility

The Motion application has only been tested using Chrome v105 at this moment.
Further browser testing is on the to-do list. Internet Explorer will not be
supported at any time for this application. Also at present Firefox is known
to not offer enough memory capacity for the history state object.

## View Live Web App

To view the live Motion web application locally use one of the following
commands.

1. To start the web server, launch a browser, visit the home page, and
  automatically close the server when you close the browser use the following
  command. Note that the dependency used to launch the browser has exhibited
  bugs. Use command 2 or 3 if that is your experience.

  ```sh
  cd <repo-root>
  npm run open
  ```

2. To start the web server, launch a browser, visit the home page, and keep
  the server running even after you close the browser (i.e. an interrupt
  signal will be required to close the server) use the following command. Note
  that the dependency used to launch the browser has occasionally failed. Use
  command 3 if that is your experience.

  ```sh
  cd <repo-root>
  npm run open-p
  ```

3. To just start the web server (an interrupt signal will be required to close
  the server) use the following command. You will need to manually open a web
  browser and navigate to `http://localhost:8080` to view the application.

  ```sh
  cd <repo-root>
  npm run srv
  ```

## Demo Credentials

You can use the following login credentials to login as a manager.

```
Email: foo@bar.com
Password: 00000000
```

You can use the following login credentials to login as a user.

```
Email: hello@world.com
Password: 00000000
```

## Project Overview

I built the totality of this framework and its supporting infrastructure this
week specifically for this project. I often build custom architectural pieces
to support the specific needs that my project entails. I have a short list of
preferred libraries and tools that I use on all of my projects. I have
actually authored many of them myself.

For all of my many recent projects I do not use any dynamic asset creation. It
causes an enormous hit on server performance and user experience. The hard
work of pushing the load to the front-end is well worth the cost.

When reviewing my code you will discover thorough use of many data structures
to gain a significant performance advantage. For example I used a custom
structure based of the suffix tree to instantly return any matching partials
of all user names or emails as you type. You will also notice that the url is
constantly modified to give you the chance to share and save results.

I believe in granting users an instantaneous experience when interacting with
applications. I am careful to use as many optimizations as I can. I hope you
appreciate my work. Thanks for reading.

## Project Structure

This project employs various structures per each resource. The main
directories represent the base. They are:
- `act`
  This is the tasks directory. It contains [act](https://github.com/imaginate/act)
  tasks that handle building, linting, loading, and testing the application.
- `src`
  This directory contains the source code and configuration settings for the
  application. It is separated into global and page based resources. It is
  important to note that the pages tree is automatically parsed to create the
  server routes and resource assignment. Each page must have a Handlebars base
  template that should load any shared partials automatically, a root Sass
  stylesheet, a main React app, and an [OnlyData](https://github.com/imaginate/onlydata)
  configuration file that exports its results to Handlebars, Sass, the server,
  and the tasks. The underscores preceding directory names prevents them from
  becoming server routes. Feel free to ask any questions for clarity.
- `srv`
  This directory contains the server's resources. They include the server's
  configuration and launch script as well as the compiled HTML pages, the
  database's initial starting data, and the API methods.
- `www`
  This directory contains the compiled CSS and JavaScript assets. Any images
  or other public resources would go here.
- `test`
  This directory is a required one for all of my projects, but unfortunately I
  did not have the time to use it. I reach for 100% test coverage for all of
  my projects. I use Mocha, Chai, Istanbul, and Cypress for most of my
  projects.

## Contact Information

Please message me, Adam Smith, at imagineadamsmith@gmail.com or call me at
469-613-8188 with any questions you may have about this project or otherwise.
