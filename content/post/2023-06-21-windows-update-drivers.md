---
title: "Windows Update, go away! Don't touch my drivers"
date: 2023-06-21T19:19:11+10:00
tags:
    - windows
---

This is regarding the "Advanced Micro Devices, Inc. - Display - 31.0.22000.11023 (2)" update on Windows 11.

TL;DR Windows Update kept screwing with my drivers -- now it will never have the privilege of doing so again on [any future setup of mine](/windows-setup/). Also my best friend is DDU (and it always has been).

Group Policy Setting:
```
gpedit.msc -> Computer Configuration -> Administrative Templates -> Windows Components -> Windows Update.
    - Windows 11: -> Manage updates offered from Windows Update. Do not include drivers with Windows Updates: Enabled.
    - Windows 10: Do not include drivers with Windows Update: Enabled.
```

{{< rawhtml >}}<a download="goawaydriverupdates.reg" href="data:text/plain;base64,V2luZG93cyBSZWdpc3RyeSBFZGl0b3IgVmVyc2lvbiA1LjAwDQoNCltIS0VZX0xPQ0FMX01BQ0hJTkVcU09GVFdBUkVcUG9saWNpZXNcTWljcm9zb2Z0XFdpbmRvd3NcV2luZG93c1VwZGF0ZV0NCiJFeGNsdWRlV1VEcml2ZXJzSW5RdWFsaXR5VXBkYXRlIj1kd29yZDowMDAwMDAwMQ0K">One-click .reg file</a>{{< /rawhtml >}} - content below:
```
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows\WindowsUpdate]
"ExcludeWUDriversInQualityUpdate"=dword:00000001
```
*(also useful if you're unfortunate enough to be on a 'Home' version; thanks to [this great tool 'GPS' for the reference key](https://gpsearch.azurewebsites.net/#13437), note I tested only on W10)*

---

So I was working from home today and switching the display configs of my monitors between 'Extend' and 'Second screen only'. Until upon doing so, would black screen my whole computer until a hard reset... what?

Upon coming back up, I would be thrown back to the Microsoft Basic Display driver with no second monitor anymore. In an attempt to fix this, I tried to install the latest, fresh drivers from AMD. It would say the install finished but there was some issue...

In Device Manager the GPU was then showing as disabled. Upon trying to re-enable, it would error out and an AMD dialog would come up saying so too.

Then it was time to try [DDU](https://www.guru3d.com/files-details/display-driver-uninstaller-download.html). This did the trick as expected, and reinstalling the AMD driver again fixed everything.

... Only to happen again, **twice**! Then I noticed Windows Update was doing some driver changes.

![Windows Update screen on Windows 11 showing multiple reinstallations of the AMD GPU driver](/static/post-img/202306-wupdate.jpg "Windows Update... *waves fist*{{< cc >}}")

---

*(slightly ranty)*

It seems that Windows kept trying to apply some AMD GPU driver version, only to keep \*\*\*\*ing my computer, where when I touched display settings it would completely break to a full black screen.

Honestly, it's pretty insane that I had to nuke the driver with DDU to un\*\*\*\* it all and let everything install as usual again. Even worse, it even installed weirdly on my third un\*\*\*\*-ing of it and I had to install twice.

![AMD GPU Software: "Windows Update may have automatically replaced your AMD Graphics driver ... not compatible ..."](/static/post-img/202306-radeon.jpg "Oh dear... even AMD doesn't approve.{{< cc >}}")

I suspect this kept happening on switching driver settings as Windows Update was applying the driver in the background **while I'm using the PC** but wasn't fully taking effect until I changed display settings.

WTF is Microsoft doing? Don't touch my drivers, they're key to standard operation. Particularly if it's going to be applied during regular operation without a restart, and potentially ending up in a bad state.

---

*Updates after initial publishing:*

- 2025-01-27: Added Windows 10 gpedit location & 1-click registry location, given I stopped using Windows 11 too
