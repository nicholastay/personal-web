---
title: "Looking back at my music listening (feat. Last.fm & SQL)"
date: 2023-07-16T15:57:08+10:00
tags:
    - music
    - database
---

*(I threw this together a while ago, but figured I should move it from a private GitHub gist to a public post!)*

[Last.fm](https://last.fm) is pretty cool. It allows me to use my own library (or really, any provider!) whilst keeping track of what I listen to. For some reason I like tracking things like this, so I can look back and see what I was doing at a past point (such as with TV shows, I use Trakt).

However, what if Last.fm goes away one day? Also, what if I want to run my own custom queries/insights against my data?

> (Third-year uni) Me: Of course, just stash all this in my own SQL database! Then, I can run whatever query I want to pull the insights I'd like.

Well, indeed, the me who was nearing the end of his databases uni unit found a way to do that back then, and it's pretty cool just to have. (I'm still figuring out what's the best way to visualise, etc.)

---

I decided on MariaDB(/MySQL) since it was just what I had on my home server, but it really could have been anything (today, I'd probably use PostgreSQL)... anything but Oracle though (it's what my uni used...)!

Here's the schemas I went with:

```sql
create table music_plays (
	dt datetime,
	artist varchar(255),
	title varchar(255),
	album varchar(255)
);
alter table music_plays add primary key (dt,artist,title);
```

The three items are primary keys so on a reimport, if there happens to be duplicates, they will be skipped.

---

Then, fetching the data. Well, I found this tool allows me to easily export off Last.fm my plays into a CSV: https://mainstream.ghan.nl/scrobbles.html

From here MySQL makes it super easy to load this in, with:

```sql
load data local infile '/home/nick/scrobbles-<...>.csv'
into table music_plays
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\r\n'
ignore 1 lines
(@unixts,@dummy,artist,@dummy,album,@dummy,title,@dummy)
set dt = from_unixtime(@unixts);
```

This can then be run for whatever subsequent updates. `select UNIX_TIMESTAMP(MAX(dt)) from music_plays;` might be a handy query to avoid re-scraping everything with the above tool.

---

As an extension, I wanted to also have my local music library's contents in another table, to perform joins against the play data for extended metadata (for now, only 'language'). (Later, I found that this isn't perfect since sometimes Last.fm renames around things, though!)

My music player of choice on Windows in MusicBee, and the "Additional Tagging and Reporting Tools" plugin seems to get the job done: Tools -> Additional Tagging and Reporting Tools -> Library Reports.

From here I could choose the tags I wanted and output as a CSV too, and load that into my table in MySQL:

```sql
create table music (
	artist varchar(255),
	title varchar(255),
	album varchar(255),
	album_artist varchar(255),
	lang_tag char(5)
);
alter table music add primary key (artist,title,album);

load data local infile '/home/nick/track-list.csv'
into table music
fields terminated by ','
optionally enclosed by '"'
lines terminated by '\r\n'
ignore 1 lines
(artist,title,album,album_artist,@lang_tag)
set lang_tag=nullif(@lang_tag,'');
```

---

Now, as previously mentioned, not only do I have a local save of my play data from Last.fm, but also the ability to query into the data!

For example, what prompted me to do a fresh import (and subsequently reminded me to formalise this into a blog post), was that I noticed I broke 100k scrobbles the other day. But what was my 100,000th play? Easy, with MySQL! (note, 99999 since it's 0-indexed with `offset`):

```
MariaDB [nick]> select * from music_plays order by dt asc limit 1 offset 99999;
+---------------------+---------+--------------+--------------+
| dt                  | artist  | title        | album        |
+---------------------+---------+--------------+--------------+
| 2023-07-09 20:03:47 | YOASOBI | アイドル     | アイドル     |
+---------------------+---------+--------------+--------------+
```

Ah, of course it's YOASOBI's IDOL, the song that's stuck in my head after watching the anime for it, just as for everyone else who did...

Anyway, I'd love to do more with the data, but I'm just not very good at this / creative. Would be curious to see what others can do with their data though!

(As a note, I'm also backing up my Trakt data, for much of the same reason. Maybe I should also load it in to a database at some point too!)
