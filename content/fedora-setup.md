---
title: Fedora setup
---

Done with Fedora 39 *KDE spin* on my desktop. Kind of a build log. Since I don't do much productive things nowadays, this is optimised around laziness and not-actually-a-nice tiling-fancy-thing. See [my older Fedora setup build log thing](/fedora-setup-i3/) for that.

## Initial setup (Anaconda)

LVM, using Custom. / (root) with the default 70G, /home with the rest. EFI partitions left as is, /boot and /boot/efi.

Hostname is set, admin user for self is set up.

## Post install

### KDE settings

- Mouse: Flat acceleration curve
- Keyboard:
  - Hardware: Delay 200ms, Rate 45/s
  - Advanced: Configure keyboard options checked. Caps Lock behavior -> Make Caps Lock an additional Esc
- Night Color: Sunset/sunrise at current location

### DNF config and update

Tune settings to be faster before update. `sudo vi /etc/dnf/dnf.conf`

```
max_parallel_downloads=10
fastestmirror=True
deltarpm=1
install_weak_deps=False
```

Then `sudo dnf update` to grab the latest updates.

### Key packages

Install with dnf:

```
$ sudo dnf install \
    neovim \
    git \
    kitty
```

### Usual packages

My COPR repo:

```
$ sudo dnf copr enable nicholastay/nexpkg
```

Good to have RPMFusion so can get extra multimedia things and more:

```
$ sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

Install with dnf:

```
# Multimedia, swap to use RPMFusion versions (freeworld/nonfree)
$ sudo dnf install @Multimedia --best --allowerasing

# General Tools
$ sudo dnf install \
    @'Development Tools' \
    zsh \
    zsh-syntax-highlighting \
    zsh-autosuggestions \
    mpv \
    ripgrep

# My COPR
$ sudo dnf install \
    belluzj-fantasque-sans-mono-fonts \
    passgen
```

### Flatpak Flathub

I use this for annoying off-the-shelf type of apps:

```
$ flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

# At time of writing, the main mirror (Fastly CDN) was being really bad on my internet.
# I only found a China alternative, which was funnily enough, faster. Here it is in case.
$ sudo flatpak remote-modify flathub --url=https://mirror.sjtu.edu.cn/flathub
```

Misc apps:

```
$ flatpak install \
    com.discordapp.Discord \
    org.signal.Signal
```

### AppImage

Occasionally things will be distributed this way and it's whatever. I use AppImageLauncher to integrate it into KDE launcher: https://github.com/TheAssassin/AppImageLauncher/releases - install RPM, then double clicking AppImage files will prompt to register.

- Bitwarden: No official flatpak and I don't want to use a password manager without it being legit - https://vault.bitwarden.com/download/?app=desktop&platform=linux

### Install dotfiles

TODO: Git repo

### Set shell

The Zoomer Shell

```
$ chsh -s /bin/zsh $USER
```

### Set up CJK input

I sometimes have a need to type all 3 of Chinese/Japanese/Korean. Under Wayland, IBus seems to suck (had issues such as key repeat breaking, bad UI/hotkey, etc). So I use Fcitx5, and haven't had a problem!

(fcitx5 = input itself, kcm-fcitx5 = KDE integration, then Chinese / Korean (Hangul) / Japanese (Anthy))

```
$ sudo dnf install \
    fcitx5 \
    kcm-fcitx5 \
    fcitx5-chinese-addons \
    fcitx5-hangul \
    fcitx5-anthy
```

Then, in Settings:

- Input Devices -> Virtual Keyboard: Fcitx 5
- Regional Settings -> Input Method (Fcitx 5)
    - Add Input Method:
        - 简体中文 (中文) - Pinyin
        - Korean - Hangul
        - Japanese - Anthy
    - Global Options:
        - Trigger Input Method: Switch to Super+Space
        - Temporarily switch between: Add Right Alt
        - Remove 'Group' hotkeys

## Misc notes

Other useful tips/tricks/utilities, I guess.

### Audio EQ/Effects

For my mic, I want compressor and EQ to help. `sudo dnf install easyeffects`

### Installing fonts

Place fonts (OTF recommended) into `~/.local/share/fonts`, then reload with `fc-cache -fv`.

### Disabling GRUB boot menu

When another OS is detected via the prober, it will force showing boot menu every time. We can tell system to ignore this:

```
$ sudo grub2-editenv - set menu_auto_hide=2

# Verify
$ sudo grub2-editenv - list
```

### Wake-on-LAN

I typically shut down my PC, but have a server to hop back into the network and sometimes want to wake my PC to do something. NetworkManager has a way to enable WoL for a connection:

```
$ nmcli connection modify 'Wired connection 1' 802-3-ethernet.wake-on-lan magic
```

Then, reboot **twice** (it starts working on the second shutdown -- Arch's wiki was, of course, right!).

## Game notes

Various stuff to get game things working

#### WineASIO with PipeWire JACK

See post, http://nick.tay.blue/2024/01/06/wineasio

#### Connect PS5 (DualSense) controller 'raw' in WINE/Proton

(For Genshin Impact in WINE, showing the correct icons. Probably would work for other games who want the 'raw' controller, i.e. in Windows it would work without any sort of XInput wrapping, just the PS Now driver.)

1. Ensure Valve's udev rules are installed: `sudo dnf install steam-devices` (RPMFusion package)
    - Then, reload udev if not already restarted / replug controller
    - (These include HIDRAW udev rules, particularly ones for the DualSense/DualShock)
1. Open the registry for the relevant prefix, and set `HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\winebus\DisableHidraw` to 0
    - (I believe this is enabled by default in vanilla WINE, but is disabled in Proton due to expectation to use Steam Input. I use Wine-GE.)
