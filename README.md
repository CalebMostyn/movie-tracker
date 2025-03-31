# Movie Tracker
Letterboxd-based Tracker for Movie Enthusiasts

# Usage
Enter a [Letterboxd](letterboxd.com) username and a goal for how many movies you'd like to watch this year to see some statistics on your progress. You'll see the days per movie required to meet your goal, how many days we are into the current year, as well as how many movies you need to catch up to the proper pace.

Films watched this year is based on Letterboxd diary entries, which keeps a count of the number of unique films you have watched this calendar year. This includes rewatches, but does not include movies you have rewatched within the same calendar year.

# Requirements
Requires Node.js as well as some packages.

With the `npm` package manager, you can run:
```bash
npm install puppeteer express cors
```

# Setup
Since the Letterboxd API is not available openly, let alone for personal projects, data is retreived from the actual Letterboxd web page of the user. [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is not suitable as the values needed are populated by JavaScript, hence the need for Node.js.

The Node.js server provides a pseudo-api for fetching the rendered page such that relevent data can be retreived. To setup the server:
```bash
./run-server.sh <-v> <port_num>
```
The `-v` designates verbose output from the script, and the port number can also be optionally specified. The default port number, however is 3000, and this is hardcoded into the HTML.

To turn off the server:
```bash
./kill-server.sh
```

This however assumes that you only have one Node.js server running with the title `server.js`, so if that is not the case, you may want to kill the process manually.