---
title: Windows setup
---

Note: I don't really use Windows anymore. This is just here for reference if I ever need to again for gaming.

I prefer to use Education edition which seems to come with the least crap.

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

- Disable Windows Update driver updates: Computer Configuration -> Administrative Templates -> Windows Components -> Windows Update
  - (Windows 10) Do not include drivers with Windows Updates: Enabled
  - (Windows 11) -> Manage updates offered from Windows Update; Do not include drivers with Windows Updates: Enabled
  - (IMPORTANT! After [my experiences on 2023-06-21](/2023/06/21/windows-update-drivers/).)
- Reduce Microsoft data collection: Computer Configuration -> Administrative Templates -> Windows Components -> Data Collection and Preview Builds
  - (Windows 10) Allow Telemetry: 0 - Security
  - (Windows 11) Allow Diagnostic Data: Diagnostic data off
  - (Note: I use Education edition which allows these to be set to the lowest like this)

## Settings

AMD Graphics

- Various games where it looks 'stuttery'
    - Games -> Add 64 exe -> Disable FreeSync
    - (Xiaomi's display also has bad brightness flicker with variable refresh rate, so turning it off when super unstable can help a lot)
