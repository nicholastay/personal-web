# Nick's website

This is the source code behind my website, located at: https://nick.tay.blue/

**NOTE**: As this is a personal site, all pull requests will be rejected.

* For any comments relating to a blog post, please use the comment section below the post itself (should link up to a GitHub Discussion in the [comments category](https://github.com/nicholastay/personal-web/discussions/categories/blog-comments))
* For any website issues (e.g. compatibility, rendering, etc), please do [file an issue against the repo](https://github.com/nicholastay/personal-web/issues) - much appreciated! As usual, any business or security inquiries should be sent to my email.
* For any website ideas, these should go under the [Ideas section in Discussions](https://github.com/nicholastay/personal-web/discussions/categories/ideas), although please don't be offended if they're ignored or rejected :)

## Running locally

Ensure [Hugo](https://gohugo.io/) is installed (on Fedora, it is in DNF).

``` sh
$ git clone https://github.com/nicholastay/personal-web.git
$ git lfs pull
$ hugo server --bind 0.0.0.0
# Serves on all interfaces, port 1313, with hot reload.
```

## Licence

As described on the website:

```
Text content and images marked with '^' on this site is licensed under CC-BY-SA-4.0; code behind it is licensed under the BSD-2-Clause. All rights reserved to other images unless otherwise stated. 
```

Code licence can be found under LICENCE.CODE, content licence can be found under LICENCE.TEXT-CONTENT; both files can be found in the root of the repository.
