---
title: "Back to GitHub Pages we go"
date: 2023-07-22T17:46:48+10:00
tags:
    - website
    - github
    - hugo
    - cloud
---

Well, we're back to GitHub Pages.

But why? For a few reasons, but all centred around how Cloudflare Pages felt pretty restrictive, or even *prescriptive* in the way they allow users to set up hosting. The two things always on my mind were: enforcing 'non-ugly' URLs and not allowing plain HTTP.

Apart from that, I just don't particularly like hosting my small, personal stuff on Cloudflare all too much anyway, seeing that more of the web is centralising on Cloudflare, when more of it really should be decentralised.

Why now? Well, I moved to Cloudflare Pages originally since it let me easily use Hugo, as per [my original blog post here](/2022/02/17/hugo/). But today I found out while playing around with GitHub's settings, however, that Pages now supports using GitHub Actions as a builder, and publish artifacts that way, similar to GitLab's offering.

---

I thought this was great and I could move back now -- I never liked the ideas of pushing built artifacts as source code to the repo under a 'docs' folder.

So, I got started and threw together an Actions workflow file.

...

![A screenshot of the GitHub commit CI status, with the build step taking 7s and the deploy step taking 8s](/static/post-img/202307-ghactions.jpg "A total of 15s, about the same as Cloudflare!{{< cc >}}")

And sure enough, the build took about just as long, and it's working as intended (if you're able to read this post).

You can view the GitHub Actions workflow file here: https://github.com/nicholastay/personal-web/blob/master/.github/workflows/build.yaml

Simply, I took a few reference GitHub Actions files, along with Hugo's [updated guide](https://gohugo.io/hosting-and-deployment/hosting-on-github/), and stripped it down to the bare requirements. (The official given reference had so much extra crud! I don't want your sass-jamstack-nodejs nonsense, just stitch together some static HTML, please. [*stares at Jekyll*](/2022/02/17/hugo/))

Overall, it wasn't too bad to pick up, and was a great excuse to finally try out GitHub's own CI. I had only used TeamCity and GitLab CI at work before, so this was another tool in the arsenal!

---

Now, back to your weird old browser programming, with TLS out of the way.

([no, I'm serious.](/2022/02/10/redesign/) -- this was broken after moving to Cloudflare due to its enforcement of HTTPS/TLS)

*(I've also done a bit of improvement work to the site in the meantime! There's a dark theme based on your browser settings now, and the Life timeline no longer relies on JS/AJAX. Hooray!)*
