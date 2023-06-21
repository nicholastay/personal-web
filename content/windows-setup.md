---
title: Windows setup
---

Not ideal but using it for gaming on the desktop. I use Education edition which seems to come with the least crap.

## General

- Firefox
- Windows Terminal
- MSYS2
- PowerToys
- MusicBee
- ShareX
- VMware Workstation Player (vbox kinda sucks imo)

## Tweaks

Group Policy

- Computer Configuration -> Administrative Templates -> Windows Components -> Windows Update -> Manage updates offered from Windows Update -> Do not include drivers with Windows Updates: Enabled
  - IMPORTANT! After [my experiences on 2023-06-21](/2023/06/21/windows-update-drivers/).
- Computer Configuration -> Administrative Templates -> Windows Components -> Data Collection and Preview Builds
  - -> Allow Telemetry: 0 - Security (for Windows 10)
  - -> Allow Diagnostic Data: Diagnostic data off (for Windows 11)
  - (Note: I use Education edition which allows these to be set to the lowest like this)
