---
title: "iOS, web views and privacy"
date: 2022-09-13T19:10:34+10:00
tags:
    - ios
    - privacy
    - website
---

If you were linked to this page from a banner above, the browser you are using *may* be unsafe.

It is likely that you are browsing from a mobile social media client, such as Facebook, which have been shown to inject privacy-invading scripts. I recommend that you 'open in an external browser', such as Safari to avoid tracking - not just for this website, but going forward as well.

Otherwise, you may be on a mobile third-party browser - which should be OK, as they rely on injecting scripts to add additional behaviour. Other benign cases include running some extensions or userscripts - as long as you are aware, those should be OK.

For more details and some journey through this, keep reading below.

Stay safe!

*(This section was prepended on 2026-11-21 following adding a link to this site from the banner, and making the banner a lot smaller for some benign cases.)*

---

Recently I've been developing for iOS as part of my job, and working with `WKWebView`. Fun times. (and lots of memory pressure troubles.)

While it can be a great tool when required, and can enable cross-talk between native-land and web-land, this actually can be a con within itself. I came across [a post by Felix Krause](https://krausefx.com/blog/announcing-inappbrowsercom-see-what-javascript-commands-get-executed-in-an-in-app-browser), detailing how this JavaScript capability can be abused.

Therefore, as part of my site being a very simple one, which should not having any JavaScript executing by itself, I realised I could employ a similar technique as Felix's proof of concept website, and play a part in making users aware of potential privacy implications.

Give it a try -- visit this website via the in-built browser on iOS Facebook Messenger, Instagram, and others -- and you should see a warning like so (if the apps are still being pesky):

![Privacy warning as displayed on this website in a potentially invasive browser (Instagram), including 'The browser you are using may be unsafe...'](/static/post-img/202209-privacy-warning.jpg "Privacy warning on this site when opening in Instagram in-app browser")

As mentioned in the reference post, it isn't foolproof and can be worked around -- but, I still think it's a valuable step in raising awareness (but also for myself to check if some app is being a bad boy!).

**Let this be a lesson to all of us to not trust in-app browsers on iOS!** Use the 'Open in Safari' option whenever possible!

You can find a copy of the script [in the assets folder of this site](/assets/privacy-protect.js), and use it as a reference for your own if you're interested on building something similar for your site -- rest assured it is licensed under the usual BSD-2-Clause.

---

To Apple: please implement something like 'app-bound domains', i.e. whitelist of sites that an app can inject into.

To iOS app developers: please just use `SFSafariViewController` :(

---

*Update 2026-11-21*: I found a `mouseMove` event handler being added, but it was just a uBlock Origin script that appears to try stop clipboard hijacking. Nevertheless, I've made it easier to try track down the cause now. If you see a warning, each attempted (and subsequently blocked) injection will be logged to the console. The banner up top has also been made less noisy, I think I've made enough point by putting a slim but scary yellow sign. Happy hacking!