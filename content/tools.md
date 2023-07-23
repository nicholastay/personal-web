---
title: Programs and Tools I Use
toc: true
---

## OS setup

I prefer a Linux system, preferably a **Fedora** or **Arch Linux** for the workstation, and **RHEL-based** or **Debian** for the server.

Occasionally I do have no choice but to use Windows (e.g. for gaming), and can administer Windows Server (proprietary enterprise tools, or sometimes AD is just the better tool for now).

## Workstation programs

These are the programs I elect to use, regardless of what I'm doing/what OS.

- BROWSER: Mozilla Firefox
	- Extensions: uBlock Origin, ViolentMonkey, Stylus, Vimium
- EDITOR: neovim / Sublime Text / VS Code
- PASSWORDS: Bitwarden + self-hosted Vaultwarden
- DOCS: LaTeX (+ latexmk), Pandoc / LibreOffice (when absolutely needed)
	- (Microsoft Office when absolutely, *absolutely* required, but typically over RDP)

### macOS

I'm using macOS for both personal laptop and work at the moment.

- SHELL: zsh
- MUSIC: Streaming off my [Navidrome](https://www.navidrome.org/) server
- TERM: iTerm2
- PKG: Homebrew
- Other key tools:
	- [Amphetamine](https://apps.apple.com/us/app/amphetamine/id937984704?mt=12) (keep awake)
	- [Hidden Bar](https://github.com/dwarvesf/hidden) (hide icons to a 'tray'... would be great if it worked better with the notch though)
	- [Alfred](https://www.alfredapp.com/) (better search)
	- [Easy Move+Resize](https://github.com/dmarcotte/easy-move-resize) (cmd+ctrl drag)
	- [UnnaturalScrollWheels](https://github.com/ther0n/UnnaturalScrollWheels) (external mouse 'correct' scroll + acceleration profile)
- Running my [Mac dotfiles](https://gitlab.com/nicholastay/dotmac)

### Windows

This is just me doing my best.

- MUSIC: MusicBee
- PDF: SumatraPDF
- TERM: Windows Terminal
- SHELL: (Git) bash

### Linux

Having a bit of a break from Linux workstation, given I only have my MacBook and desktop. But, if I was running it, it'd probably be Fedora with the below setup.

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
- [(Fedora setup notes)](/fedora-setup/)

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
