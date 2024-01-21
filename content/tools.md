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
	- (Microsoft Office when absolutely, *absolutely* required)

### Linux

My main home desktop setup at the moment.

- DISTRO: Fedora (KDE Plasma Desktop spin)
    - Planning for next time to use Fedora Everything instead (too much random preinstalled stuff)
- DE: KDE Plasma
    - I am still lazy for my home desktop and will probably stick with Plasma though
    - For laptop I might go back to sway, if not on a MacBook anymore
- MUSIC: Quod Libet
- SHELL: zsh
- TERM: Kitty
- [Tracked dotfiles](https://github.com/nicholastay/dotcafe) (KDE is just too hard to VCS)
- [(Fedora setup notes)](/fedora-setup/)

### macOS

I'm using macOS for both personal laptop and work at the moment.

- SHELL: zsh
- MUSIC: Streaming off my [Navidrome](https://www.navidrome.org/) server
- TERM: iTerm2
- PKG: Homebrew
- Other key tools:
	- [Amphetamine](https://apps.apple.com/us/app/amphetamine/id937984704?mt=12) (keep awake)
	- [Hidden Bar](https://github.com/dwarvesf/hidden) (hide icons to a 'tray'... would be great if it worked better with the notch though)
	- [Easy Move+Resize](https://github.com/dmarcotte/easy-move-resize) (cmd+ctrl drag)
	- [UnnaturalScrollWheels](https://github.com/ther0n/UnnaturalScrollWheels) (external mouse 'correct' scroll + acceleration profile)
- [Mac dotfiles](https://gitlab.com/nicholastay/dotmac)

### Windows

This is just me doing my best.

- MUSIC: MusicBee
- TERM: Windows Terminal
- SHELL: MSYS2

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
