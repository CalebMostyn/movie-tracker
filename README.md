# Movie Tracker
Letterboxd-based Tracker for Movie Enthusiasts

# Usage
Enter a [Letterboxd](https://letterboxd.com) username and a goal for how many movies you'd like to watch this year to see some statistics on your progress. You'll see the days per movie required to meet your goal, how many days we are into the current year, as well as how many movies you need to catch up to the proper pace.

Films watched this year is based on Letterboxd diary entries, which keeps a count of the number of unique films you have watched this calendar year. This includes rewatches, but does not include movies you have rewatched within the same calendar year.

# Requirements
Once cloned, this should be able to run easily if setup properly on Apache or a similar web-server software. Importantly, the server must support php, and the php will require `curl` for proper scraping of the Letterboxd website.