# Motion

Motion is a bicycle rental web application and management system built for
Adam Smith's portfolio. You can rent bikes anytime within 3 - 4 months from
today's date. Any updates such as ratings or administrative adjustments are
automatically saved to the cloud. You can filter results with ease. To use
the management system you must be logged in as a manager.

### Please Note

This **project is not completed** at this time. I do have much completed
functionality to review, but I have not optimized the the front-end or
back-end, completed the front-end styling and images, completed all of the
pages and API calls, added numerous fundamental security features, thoroughly
tested the application and API, and cleaned up the source code (e.g.
eliminated duplicate code, improved namespace choices, improved
documentation). I also am using plain JSON files for my database to keep the
required programs limited to only Node.js and NPM as well as to avoid the
complications that arise when configuring a database across different OSs.

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

I designed a simple framework for this project. I used, as is standard for my
projects, a limited number of highly reliable dependencies which reduces bugs,
improves security, and increases performance for the application, the server,
and the devops pipelines. All needs of HTML generation are passed to the
front-end (i.e. all server resources are static files). The decision to use
static web resources enables public caching, CDN utilization, and static file
servers which drastically reduce the latency of responses for user requests.
Beyond simple static file delivery the server is also responsible for a user
and manager API whose sole job is to get data from and update data within the
database.

When reviewing the React applications you will discover thorough use of many
complex data structures which offer a significant performance advantage for
filtering the bikes, users, and reservations. For example I used a custom
structure based on the suffix tree to instantly return any matching partials
of all user names or emails as you type. You will also notice added usability
features such as a url that is constantly updated with the application's
current state which gives you a chance to share and save searches as well as
to add each search result to your web's navigable history.

I believe in giving users an instantaneous experience when interacting with
applications as often as possible. As a result I lean towards availability and
eventual consistency for front-end and back-end architecture. I am careful to
use as many front-end and back-end optimizations as I can. I also am careful
to consider the security implications of every decision. I hope you appreciate
my work. Thanks for reading.

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
