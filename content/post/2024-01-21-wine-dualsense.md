---
title: "Wine + 'proper' DualSense (PS5) controller support via hidraw"
date: 2024-01-06T23:16:08+11:00
tags:
    - linux
    - wine
---

Well, I'm already back at it again with a Wine post -- it's working pretty well for games, I'm so glad I took the plunge to just switch over to Linux!

I use a DualSense controller with Genshin Impact, and wanted to get it to work right. Specifically, by default, we run into Xbox controller prompts in-game, no DualSense features (such as gyro aim) and no haptics. I knew from Windows that support definitely exists for all of these, so let's fix it up! 

This guide will probably work for similar games with such native PS controller support. Tested with wine-ge-proton8-25 in Bottles at time of writing, on Fedora 39 KDE.

## Enabling/allowing hidraw

By default, Proton has SDL enabled and hidraw disabled -- I believe this is for Steam Input to function reliably. We don't want this now, so let's switch it back on.

1. Ensure Valve’s udev rules are installed: `sudo dnf install steam-devices` ([RPMFusion](https://rpmfusion.org/Configuration) package)
    - (This comes with rules for common controller/joystick devices to allow hidraw access)
    - Reload udev if not already installed + replug controller
    - `sudo udevadm control --reload-rules && sudo udevadm trigger`
1. Launch the registry editor in the relevant Wine prefix
    1. Navigate to `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\winebus`
    1. Set `DisableHidraw` to `0`

That's it, the PS prompts and gyro controls should now work in Genshin.

## Haptics support

This is (obviously) optional, but the more tricky part, with less info online around about it.

The main issue is that the PS5 controller uses its audio device for haptics (back 2 channels of the 4 channel surround), and games look for this audio device by name. The name of the device is different under Linux, so we need to trick it by renaming.

Under Fedora 39's default config, the audio session manager is WirePlumber for PipeWire. So, in `~/.config/wireplumber/main.lua.d/60-dualsense.lua`, we can create a custom rule:

```
rule = {
	matches = {
		{
			{ "node.name", "matches", "*Sony_Interactive_Entertainment_Wireless_Controller*" },
		},
	},
	apply_properties = {
		["node.description"] = "Wireless Controller",
	},
}

table.insert(alsa_monitor.rules,rule)
```

...then reboot, et voilà.

(You may also need to ensure the 'Profile' for the device is set to 'Analog Surround 4.0 Output', and volume is at 100% + unmuted. This is easiest done via pavucontrol.)

---

## Bonus: using hidraw with any device

You can fairly easily use the same approach to use any device over hidraw even if Valve's udev rules don't have the device you want to use. This could be useful for certain joysticks that you don't want going through Wine's SDL layer.

You can create your own udev rule in a similar vain to Valve's ones in `/usr/lib/udev/rules.d/60-steam-input.rules`. This will look something like e.g. `/etc/udev/rules.d/60-my-device.rules` (you can use `lsusb` to fetch ids):

```
# My cool device
KERNEL=="hidraw*", ATTRS{idVendor}=="<VID>", ATTRS{idProduct}=="<PID>", MODE="0660", TAG+="uaccess"
```

...and reload udev + replug as usual.

Under Proton, they have a whitelist for what devices it allows for hidraw (the PS5 controller is on there by default). Since this is a custom device, you will then need to modify any launch script / bottle environment variables to include `PROTON_ENABLE_HIDRAW=0x<VID>/0x<PID>` (all caps) and this should get it through the whitelist. (or, even better, if it's a common device, [consider upstreaming to Valve](https://github.com/ValveSoftware/wine/blob/26425af97506e119f76d636ecc95d647e91afa83/dlls/winebus.sys/unixlib.c#L133)!)

---

## References

- Controllers under Proton: https://github.com/ValveSoftware/Proton/blob/proton_8.0/docs/CONTROLLERS.md
- DualSense 'advanced features' work: https://github.com/ValveSoftware/Proton/issues/5900
- Renaming devices with WirePlumber: https://wiki.archlinux.org/title/WirePlumber#Changing_a_device/node_property
