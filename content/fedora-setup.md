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

## Desktop utilities

For my mic, I want compressor and EQ to help. `sudo dnf install easyeffects`

## Misc notes

Other useful tips/tricks, I guess.

### Installing fonts

Place fonts (OTF recommended) into `~/.local/share/fonts`, then reload with `fc-cache -fv`.

### Disabling GRUB boot menu

When another OS is detected via the prober, it will force showing boot menu every time. We can tell system to ignore this:

```
$ sudo grub2-editenv - set menu_auto_hide=2

# Verify
$ sudo grub2-editenv - list
```
