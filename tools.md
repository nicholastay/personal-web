---
layout: default
title: Programs and Tools I Use
---

## OS setup

I prefer a Linux system, preferably a **Fedora** or **Arch Linux** for the workstation, and **RHEL-based** or **Debian** for the server.

Occasionally I do have no choice but to use Windows (e.g. for gaming), and can administer Windows Server (proprietary enterprise tools, or sometimes AD is just the better tool for now).

## Workstation programs

These are the programs I elect to use, regardless of what I'm doing/what OS.

- BROWSER: Mozilla Firefox
	- Extensions: uBlock Origin, ViolentMonkey, Stylus, Vimium
- EDITOR: Emacs ([Doom](https://github.com/hlissner/doom-emacs)), neovim
- DOCS: LaTeX (+ latexmk), Pandoc / LibreOffice (when absolutely needed)
	- (Microsoft Office when absolutely, *absolutely* required, but typically over RDP)
- PASSWORDS: KeePassXC

### Linux

At the moment I'm personally running [Fedora, i3 spin](https://spins.fedoraproject.org/en/i3/). Previously used Arch Linux.

- WM: i3
- MUSIC: mpd (+ ncmpcpp)
- SHELL: zsh
	- \*POSIX-compliant shell scripts where possible.
- TERM: Alacritty
- PDF: Zathura (+ mupdf)
- Other key tools:
	- IBus (libpinyin, libhangul)
	- dunst
	- dmenu
	- ranger
- Running my [dotfiles](https://github.com/nicholastay/dotfiles)
- [(Fedora setup notes)](https://gist.github.com/nicholastay/7d4cd6a7352f2a3911a99e982d78c092)

### macOS

I'm using macOS for work at the moment.

- SHELL: zsh
- MUSIC: Streaming off my [Navidrome](https://www.navidrome.org/) server
- TERM: Terminal.app
- PKG: Homebrew
- Other key tools:
	- [Amphetamine](https://apps.apple.com/us/app/amphetamine/id937984704?mt=12) (keep awake)
	- [Hidden Bar](https://github.com/dwarvesf/hidden) (hide icons to a 'tray')
	- [Alfred](https://www.alfredapp.com/) (better search)
	- [Easy Move+Resize](https://github.com/dmarcotte/easy-move-resize) (cmd+ctrl drag)
	- [UnnaturalScrollWheels](https://github.com/ther0n/UnnaturalScrollWheels) (external mouse 'correct' scroll + acceleration profile)
- Running my ["lite" dotfiles](https://gitlab.com/nicholastay/dotlite)

On my personal MacBook, I have a bit more control over things like SIP and feel more free to install what I want, so I used these too.

- WM: [yabai](https://github.com/koekeishiya/yabai) (+ skhd)
- MUSIC: mpd
- PDF: Skim

### Windows

This is just me doing my best.

- MUSIC: MusicBee
- PDF: SumatraPDF
- TERM: Windows Terminal
- SHELL: (Git) bash

## Server programs

Services I run include:

- Nginx
- Samba
- Git
- Nextcloud
- Pihole
- Wireguard
- Jellyfin (media server)
- Navidrome (music server)

Some of these are managed via Docker.

### Upcoming server

I'm planning/currently experimenting with an overhaul to an even more virtualised setup, with LXC and actual VMs rather than Docker containers. Some details:

- OS: Proxmox VE 6.3
- VMs/LXCs in testing include:
	- trueno: OPNsense VM
	- latte: macOS Catalina VM
	- midnight: Arch Linux LXC with headless display + VNC, for screen capture
	- winter: Windows Server 2019 VM
	- peninsula: 'bastion' VM
	- and more...