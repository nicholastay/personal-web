---
title: "PPPoE, IPv6-over-IPv4 and packet loss"
date: 2022-05-16T11:28:01+10:00
tags:
    - ipv6
    - router
---

A bit ago I wanted to mess with IPv6 in my homelab, but my ISP still doesn't support it (*cough* TPG please). So, I resorted to setting up a block through the [Hurricane Electric (HE) Tunnelbroker](https://tunnelbroker.net/).

Setup was pretty straight-forward in OPNsense, setting up the GIF interface [as documented](https://docs.opnsense.org/manual/how-tos/ipv6_tunnelbroker.html). However, then I faced a pretty weird issue.

The tunnel only seemed to be half working(?) -- I could ping `ipv6.google.com`, but couldn't ping anything else (or sometimes, it might have gone through with massive packet loss). This sort of weird behaviour is always so hard to debug...

But, after some reading, here's the fix:

1. In OPNsense, configure the **IPv6 tunnel interface MTU** as something suitable, e.g. I use 1452 and it seems to work well
	- I read that the PPP header is 8 bytes, then the IPv4 header is 20 bytes, so this should be subtracted to make room
	- From my understanding, it then makes sense that the encapsulated IPv6 traffic must fit inside the transmission unit used for PPPoE. TPG's MTU is 1480, and when checking the MTU used for HE, it was also 1480...
2. Update the MTU in the **HE tunnel 'Advanced'** area
	- I missed this step and was wondering why it still didn't work (or rather, why it seemed to only work one way/weirdly)

Pretty simple, but it still feels like documentation/knowledge in this area is still rather hard to navigate. If I run into anything else in this space I'll be sure to post it up here!

After this, it was all pretty smooth-sailing to complete my IPv6 certification to 'Sage' level on HE :D (will update on if I get that t-shirt :P)

![My HE IPv6 certification certificate!](//ipv6.he.net/certification/create_badge.php?pass_name=nickt7&badge=2 "Hurricane Electric IPv6 Certification Badge for nickt7")