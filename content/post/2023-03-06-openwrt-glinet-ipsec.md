---
title: "OpenWRT GL.iNet router, (double) NAT + IPsec troubles"
date: 2023-03-06T17:47:35+01:00
tags:
    - router
---

Recently, I was travelling and got myself a GL.iNet travel router -- the GL-SFT1200 Opal to be specific. It was the usual hotel Wi-Fi being horrible and Ethernet being much better -- I'm talking 3-5mbps and 55-70mbps better! (More explanation later, I want to cut to the chase.)

I usually use an IKEv2 VPN to get back to some of my infrastructure (I know, WireGuard is usually easier to cut through firewalls, but IKE is native on mobile). However, the connection established and logs in just fine (logs on the other end see two-way communication), but traffic just wouldn't flow. Wi-Fi Calling(!) also wasn't working -- I am acutely aware that this feature also relies on IPsec, so what's the problem?

Well, after hours of research and trying many various firewall rules, it turned out to just be this:

```
# SSH into your router...
$ vi /etc/config/firewall

config defaults
    ...
    option flow_offloading '1'
    option flow_offloading_hw '0'
```

Then, reboot the router for good measure (required for me); or at least run `/etc/init.d/firewall reload`.

What does this do? It switches off Hardware Flow Offloading (but software is fine). You can switch both off, the important one is that the hardware acceleration is off, but I found my VPNs worked fine with software one on, and the network was slightly more performant. The GL.iNet interface's "Hardware Acceleration" setting switches both these options off.

All along, it turned out that the hardware NAT (as far as I understand) was the problem! It was probably doing something "wrong" to my packets... but I don't fully understand why. If anyone knows better, I would love to know :)

---

So, context. I'm going to keep it a habit to leave the rambly context at the end to avoid becoming one of those terrible cooking websites.

I was running the travel router in Double NAT -- something that most people just say not to do, but seeing as I'm plugging my router into a public network, I'd prefer all my devices to live behind my own perimeter, in case I did want to expose something. Some hotels' firewalls also block inter-device communication, and I sometimes like to copy things over Wi-Fi, so that proves very inconvenient. If I had a Chromecast I'd also want it to behind my own borders.

So, IPsec/Wi-Fi Calling -- fairly important to me since it is useful to be reachable 'domestically' (my travel SIM here only supports data). And, as far as I understood NAT-T should do its job, even behind a double NAT. Putting the router into bridge mode also made it work right away, so something was definitely amiss. Researching for hours yielded nothing, until I looked for potential issues with VPNs, NAT, and not specifically OpenWRT. Hopefully this posts saves someones' time!

Switching the HW flow offloading off allowed me to connect to my personal IKEv2 VPN and verify it was working correctly right away. It was hard to verify if Wi-Fi Calling was working though, since the phone would have tried many times to establish the connection, doing something to the router already with its finicky NAT-ing -- which is why restarting the router was important too -- I knew my VPN was working, but Wi-Fi calling just would not establish until restarting. It caused me to think something else was also wrong, only to apply the age-old "have you turned it off and on again" and find out that was the remedy.

For the Android users, some research about Wi-Fi Calling yielded that on pfSense, the UDP timeout may also have to be adjusted for Android (I only tested on iPhone) -- for those who may need it, the `net.netfilter.nf_conntrack_udp_timeout_stream` sysctl option raised to 900 may prove useful (please let me know if it is or isn't).

Hope this helps (and saves someone heaps of time)!
