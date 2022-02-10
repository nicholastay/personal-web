---
layout: post
title: "Fresh tomatoes? Yes!: Belkin F7D3402v1 router firmware hacking"
date: 2021-06-24 11:16:29 +1000
tags: router
---

So I got the FreshTomato firmware on my Belkin F7D3402v1 modem/router combo working! (albeit with some caveats for now) Here's how I did it. (source patch available at the end)

## Background

I've always wanted to try a modded firmware router, but it seemed like I never had the right model - we would always just have some random model that we got for cheap from a store, or whatever the ISP gave. When I came across [a video on YouTube](https://www.youtube.com/watch?v=qDb0Wgm5sk0) about custom firmwares, I got reminded of this and decided to check out the one featured in that video: [FreshTomato](http://freshtomato.org/).

When I checked out their supported routers, what interested me was that some Belkin routers were supported - I happened to have a Belkin N300 router lying around. However, it's an old modem/router combo, from my ADSL2 days...

From a quick search around online, it seemed like usually modem/router combos weren't supported - but I felt no reason for this, and I could just repurpose one of the ports as the WAN, given I just wanted to use this as just a router now (for fun only - I've got an ISP-provided ac router and even an OPNsense VM).

## Fresh Tomato?

So I saw that the Belkin F7D3302v1 was supported - it looked similar, and apparently had the same Broadcom BCM4718 SoC inside.

However, upon downloading the F7D3302 firmware, it wouldn't flash. Didn't think it'd be this easy. The Belkin upload screen would instantly fail and not even try to flash, so it must be some sort of signature issue.

Looks like I had to get a dev environment up. I spun up a Debian VM, grabbed the MIPS repo for FreshTomato and followed the instructions as given by the dev: <https://bitbucket.org/pedro311/freshtomato-mips/>

## First attempt

Having a quick poke around, it seemed to me the right 'release' to use was the `src-rt` one, as the `TRX_MAGIC_` definitions were in `src-rt/include/trxhdr.h`.

Looking at the Makefile, it seemed like the 'TRX magic' bytes were what I needed for the F7D3402. Hmm, how to figure this one out...

Luckily, I had found [an old blog post](https://ddscentral.org/2012/06/f7d3402_replacing_dd-wrt_with_openwrt/) regarding some hacking being done on the F7D3402 by DDS Central. They detailed some patches they had applied to the kernel, swapping out the `TRX_MAGIC` value for `0x00017517`. Great, this is what I needed

So I found the line for F7D3302 in the Makefile, and added in this value for another image. It also seemed like the `r2f` make profile was the right one as it built Belkin images, so I gave that a shot.

...and, it did flash... but then the device was stuck and bricked.

## CFE to the rescue

So I tried the 30/30/30 (hold reset 30s, 30s off, 30s on with button pressed) to no avail... admittedly I should have tried this first to ensure I have a recovery mode.

But, then I decided to try the same with the WPS button on the front, and it worked! I was able to connect over HTTP to 192.168.2.1, and the CFE mini server appeared to allow me to flash a binary again.

## More digging

`grep --include=\*.c --include=\*.h -Ri F7D3302`

My first thing to try was to check anywhere in the source that the F7D3302 could be referenced, and probably update those to be able to use the F7D3402.

After a bit of searching around on Bitbucket (to make it quicker to click around commits), I noticed there was another branch, `mips-RT-AC`. In the `src-rt` folder here, there seemed to be a specific build profile for `f7d`, as well as more features enabled - I decided to work on this branch instead.

## Patching the code

Needless to say, this was a tedious process for me, given my inexperience here and just throwing things at the wall and seeing what sticks. This honestly took a while due to this, and it's probably pretty self-explanatory with the patch at the end of this post.

When I flashed the first working build, had the 5 minute wait, and then the LED lit up orange... I guess that's the moment we all do this for. But then it was identified as a Belkin F5D8235-4 v3... I must have messed up the code somewhere, and one of the ports showed up as active - must be that file with the 'vlan ports' set wrong.

Turns out the `boardrev` wasn't the same as the F7D3302, but the F5D8235-4 v3, 1100. Once that was fixed, it identified itself properly, and everywhere which used the `MODEL_F7D3402` enum value to check for the model worked properly.

## Points/caveats

A few interesting things/things I haven't been able to figure out (I'll probably edit this as I find more):

- 4 LAN ports still show up, but I've reassigned one of them to be WAN.
	- WAN port is the top port, just under the RJ11 jack (I had actually got lucky when changing the vlan port settings, that '3' happened to be the top one, which is what I wanted).
	- LAN0-2 are the next three, top to bottom.
- 5GHz doesn't work. The interface doesn't even show up in SSH.

## Patch

So all my work up to now can be applied with the following patch. Note I had worked on top of commit `069046ba70465c6bb91a3b870629b9d3223419c9`, and the patch file is in `git format-patch` format, with my working steps.

Patch: [fresh-tomato-f7d3402.patch](/static/fresh-tomato-f7d3402.patch)