---
title: Fedora setup
---

Done with Fedora 35 *i3 spin* on X230 laptop. Kind of a build log.

## Initial setup (Anaconda)

BTRFS with subvolumes, using Custom. Encryption with LUKS2 enabled.

- /
- /home
- /var
- /var/log
- /usr/local
- /opt

Then EFI partitions left as is, /boot and /boot/efi.

Hostname is set, admin user for self is set up.

## Post install

Few things to do before getting dotfiles in.

### DNF config and update

Tune settings to be faster before update. `sudo vi /etc/dnf/dnf.conf`

```
max_parallel_downloads=10
fastestmirror=True
deltarpm=1
```

Then `sudo dnf update` to grab the latest updates.

### Key packages

Install with dnf:

- neovim
- git
- picom
- xrdb
- xset
- xinput
- alacritty
- google-noto-sans-fonts
  - Noto Sans CJK is included but not just Sans, so for the font to work properly as a default ensure this is installed
- light-locker

COPR packages (`sudo dnf copr enable <copr-repo>`):

- atim/i3status-rust
  - i3status-rust
    - There is i3status-rs on the official Fedora repo, but it is not up to date. 
- nicholastay/nexpkg
  - belluzj-fantasque-sans-mono-fonts
	- This is the main monospace font used.


### dotfiles

```sh
$ git clone --bare https://github.com/nicholastay/dotfiles.git ~/.dotfiles.git
$ rm .bashrc .bash_profile .config/i3/config
$ git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME checkout

$ source ~/.bashrc
$ d config --local status.showUntrackedFiles no
$ jg # Jumptool generate aliases
```

Probably want to set git user info at `~/.config/git/user`:

```
[user]
    email = <email>
    name = <full name>
```

### Extra packages

Good to have RPMFusion so can get extra multimedia things and more:

```sh
$ sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

Install with dnf:

- NetworkManager-tui
  - Why doesn't Fedora come with this, but does with nm-applet?
- zsh
  - zsh-syntax-highlighting
  - zsh-autosuggestions
  - `chsh -s /bin/zsh $USER`
- fzf
- emacs
  - Doom Emacs
  - (with dotfiles, use `ln -sfn .emacs.d.lite .emacs.d` in homedir to switch to lite)
```sh
$ git clone --depth 1 https://github.com/hlissner/doom-emacs ~/.emacs.d.doom
$ ln -sfn .emacs.d.doom .emacs.d # (should already be done by dotfiles)
$ ~/.emacs.d/bin/doom install
```
- keepassxc
- maim
- xclip
- xdotool
- google-noto-serif-fonts
- arc-theme
- ranger
- mpv
- sxiv
  - There is feh already but I prefer sxiv
- gnome-calculator
  - yeah, could use bc/python but this is just nice to have for quick calcs
- simplescreenrecorder
  - there's probably a better solution here, but this works for now 
- redshift + redshift-gtk
  - f.lux-like night colour overlay
- ffmpeg
- nextcloud-client
  - libgnome-keyring - **make sure this is installed or auth won't be saved properly!**
- wireguard-tools
  - Helper script is `wgvpn`, put config in `/etc/wireguard/wg0.conf` as usual

DNF groups (`sudo dnf groupinstall <group name>`):

- `'Development Tools'`
- `'Multimedia'` (needs RPMFusion)

COPR additions:

- nicholastay/nexpkg
  - dragon-drop-git
  - ueberzug
  - passgen

pywal can be grabbed from pip.

NoMachine server & client: https://www.nomachine.com/download/download&id=3, NoMachine client only: https://www.nomachine.com/download/download&id=14

### CJK input and fonts

For input, the installer should handle ibus with pinyin + hangul on install (I think if add KR and CN during wizard). Otherwise, ensure these are installed:

- ibus
- ibus-libpinyin
- ibus-hangul

If it doesn't work, use im-chooser to change to ibus (I don't know why setting just in .profile isn't good enough, had to use .config/imsettings to set it in dotfiles so it should just work with the dotfiles now).

For fonts, grab from dnf. Mostly my preference since Noto Sans CJK already comes with the system, or else is for monospace usage.

- Chinese
  - wqy-zenhei-fonts
- Korean
  - naver-nanum-gothic-fonts
  - naver-nanum-gothic-coding-fonts
  - naver-nanum-myeongjo-fonts

### Programming

Rust

- rust
- cargo
- rust-src
  - Needed for analysis to work properly on std lib
- rust-analyzer
  - For completion
```sh
$ curl -L https://github.com/rust-analyzer/rust-analyzer/releases/latest/download/rust-analyzer-x86_64-unknown-linux-gnu.gz | gunzip -c - > ~/.local/bin/rust-analyzer
$ chmod +x ~/.local/bin/rust-analyzer
```

C

- clang-tools-extra
  - Comes with clangd for completion

## Laptop-specific

dnf packages:

- tlp
  - Remember to enable service
- powertop
  - Only used to monitor power draw, not using savings features (left for TLP)

### ThinkPad-specific

At least on my X230...

tlp

- acpi_call akmod recommended
  - Ensure rpmfusion installed
```sh
$ sudo dnf install https://repo.linrunner.de/fedora/tlp/repos/releases/tlp-release.fc$(rpm -E %fedora).noarch.rpm
$ sudo dnf install kernel-devel akmod-acpi_call
```

## Misc notes

Other useful tips/tricks, I guess.

### Installing fonts

Place fonts (OTF recommended) into `~/.local/share/fonts`, then reload with `fc-cache -fv`.