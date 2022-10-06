# Motion
Motion is a fake bicycle rental application and management system built for
Adam Smith's portfolio. You can rent bikes anytime within 3 - 4 months from
today's date. Any updates such as ratings or administrative adjustments are
automatically saved to the cloud. You can filter results with ease. To use the
management system you must be logged in as a manager.

## Table Of Contents
- Install Application
- View Live Web App
- Project Overview
- Project Structure
- Contact Information

## Install Application
To install this application you must first have Node.js and NPM installed on
your computer. Next run the following command.

```sh
cd <repo-root>
npm install
```

## View Live Web App
To start a local web server instance and launch your primary browser for
viewing and interacting with the app, use the following command. The web
server will automatically shut down when you close the browser. Please note
that this app has been built and tested using Chrome v105 and is not
guaranteed for any other browser. Firefox is known to not support enough
memory capacity for the history state object.

```sh
cd <repo-root>
npm run open
```

Please use the following login credentials to login as a manager. Please note
that I ran out of time to complete all of the manager functionality. I covered
the breadth of all types of functionalty requested such as view, filter, edit,
delete, login, register, etc.

Email: foo@bar.com
Password: 00000000

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
