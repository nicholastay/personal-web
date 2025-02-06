---
title: "mysqld got signal 6 ... InnoDB give my data back!"
date: 2025-02-06T23:08:00+11:00
tags:
    - linux
    - database
---

The other weekend I was back in Melbourne (for Chinese New Year -- happy new year!) and was extracting some data off a dead BTRFS (*I know, this was probably done to myself*) RAID 1'd Proxmox setup.

Probably due to an unclean shutdown and/or filesystem woes, my MariaDB setup (in an Alpine LXC, for Nextcloud) got corrupted. Unfortunately, remaining backups were also months old, given I was relying on my university storage for it (haha), and all I had was an old copy of the setup on my old 'server'.

To be honest, the old backup was probably enough, but I decided to take the challenge on vs MySQL -- I use it enough at work to warrant messing with it.

---

## Preparation

So, the first step (after some simple attempts on the original LXC itself) was copying off the data to a more stable environment to work on (who knows how else LXC could be screwing with things).

- I decided to simply use a Rocky Linux VM that was already lying around.
- Originally, I tried using the MariaDB in the system repos, but that didn't help, and so eventually switched to the [MariaDB-official dnf repo](https://mariadb.com/kb/en/yum/) (\*more to come here :D)
    - This was to try installing the latest versions and thinking maybe a later InnoDB engine would be more kind. 
    - If you're going to do this, ensure the official `mariadb-server` package is removed, then replace it with `MariaDB-server` with the new repo in place.

## Initial attempts: InnoDB force-recovery modes

So, at first...

- I had copied the data as-it-was into `/root/ncsql`.
- Then, just tried firing the database back up with the newer MariaDB, simply in the foreground (no need to mess with systemd/etc!) with: `mysqld_safe --datadir /root/ncsql --user root`.
    - The `--user root` in my case was simply out of laziness -- I don't care for security given this is a rescue operation, in a disposable VM, and the files were owned by root given how I copied them across
    - The dreaded 'mysqld got signal 6' then arrived -- process in foreground just stopped, and a stackdump with the message appeared in the log file. If we follow their instructions first, we would try starting with the various [InnoDB recovery modes](https://mariadb.com/kb/en/innodb-recovery-modes/) (i.e. from my understanding, relaxing invariants to hopefully 'just' load things back).
- Increasingly to the `mysqld_safe` command line, add the `--innodb-force-recovery 1` flag and value, slowly increasing until the maximum of 6.

If your database fires up OK here with one of these modes -- good news! It 'just' worked. Jump to the dump+restore section below.

But, if you're like me, there's more fun to be had...

## Force-recovery failed, now what...

So, after a recovery level of 2, all the way to 6, I started getting 'mysqld got signal 11' now, with much worse looking stack dumps.

Even MariaDB itself was thinking this could be a software bug of itself, given how corrupted things were.

*(This was the point where originally, I tried copying it off to the VM, trying newer MariaDB versions, etc. Until all of that didn't work, and I scoured around for what others could have done.)*

I then stumbled across this [older XAMPP related crashed MySQL StackOverflow post+answer](https://stackoverflow.com/a/16720185). After a bunch more related reading, my understanding of the key data files are:

- The database you're interested in has a bunch of `*.frm` and `*.ibd` files. These are the table metadata, and InnoDB data files respectively
- `ibdata1` has very important InnoDB metadata, a must-have
- `ib_logfile0, ib_logfile1...` are the InnoDB redo logs, and are for recovering transactions when database crashes
    - These log files seem like in some cases, you can delete them, but risk losing those last few transactions / left in a weirder state

## Recovery time

With the above key-files in hand, you may be thinking we could Frankenstein something together -- and that's of course what I tried (and spoiler, it worked!). Here's what I did...

- Initialised a fresh MySQL data directory, simply by starting the MariaDB service: `systemctl start mariadb`
    - I just used the default spot because this was essentially a fresh VM; on Rocky, this is `/var/lib/mysql`
    - The systemd service unit has a pre-start to create these defaults, so I lazily utilised it. You could probably use `mysql_install_db` too.
- Confirmed things were working by just running (as root, of course): `mysql` - should connect just fine.
- Stopped the MariaDB service: `systemctl stop mariadb`
- Transplanted the aforementioned folders and files in to the fresh data location, `/var/lib/mysql/data`: `<database folder>` (in my case, `nextcloud`), `ibdata1`, `ib_logfile0`, `ib_logfile1`
- Started up MariaDB, this time in the foreground to more easily troubleshoot: `mysqld_safe --user root`.
- Shortly after launching, it crashed, but in the log file it said my MariaDB version was *too new(!)* to recover from the given files. I hadn't seen this message before now (signs of recovery attempts! hope!), so I followed its guidance and downgraded.
    - In my case, this meant going from the latest '11.rolling' repo (`https://rpm.mariadb.org/11.rolling/rhel/$releasever/$basearch`; repo file in `yum.repos.d` and contents originally installed from `https://mirror.mariadb.org/yum/11.rolling/rocky9-amd64/MariaDB.repo`)
    - ... to the suggested highest version from the logs of '10.6'. I simply replaced the '11.rolling' with this in the repo file, uninstalled and reinstalled MariaDB
- After starting back up (`mysqld_safe`), it was still unhappy with signal 6 -- no worry for now, we still have the force modes to go through
- Upon starting back up with `mysqld_safe --user root --innodb-force-recovery 2` (usually starting from 1 and going up like before, but this is what worked from me) -- we're in! No crashes!

It is quite interesting to me that this worked though, and how MySQL could not do this recovery itself. The files were there!

(That said, I will say: the data looks *mostly* there to me. But there's no telling what could have been subtly missing.)

If this still didn't work for you, I'm pretty sure it's just game over.

## Dump + restore

Obviously, you shouldn't run MariaDB in this state, with the recovery modes on and probably a bunch of safety checks switched off.

The easiest and recommended way to recover is to simply take a database dump (backup), then restore. Simply, this is:

- Take the backup (in another terminal session): `mysqldump --all-databases > /root/backup.sql` (or if you want just dump a single database)
- Stop MariaDB (with `mysqladmin shutdown`)
- Move away (or if you're confident, remove) the transplanted stuff, i.e. `/var/lib/mysql`
- Reinitialise the database (or in the simple case as per before, just fire up the systemd service) and start MariaDB back up
- Restore the backup: `mysql < /root/backup.sql`

... and that should be it! Your database should be back, with hopefully the data intact.

## Ending remarks

Whilst this worked, I would not rely on this being the case at all. **Take backups!** Don't be lazy like me, and keep putting it off.

This should also speak to the fragility (of the data; although it was kind of on me for the filesystem stuff -- I will say I did turn off CoW for this subvolume) and opaqueness (of the error messages) of MySQL.

Going forward, I see myself switching over to PostgreSQL. The backups should also be much better, with their `*.pgdump` format.

(I always found it silly that MySQL's only way of backing up was SQL queries serialised... very inefficient to the point where if you don't need anything special, backing up to CSV and restoring that is faster, due to not having to parse queries!)

Hope this can help someone though, if it does come down to it!
