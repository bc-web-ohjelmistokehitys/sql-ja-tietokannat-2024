# Tech Radar

We are going to build a nice tech radar.

## Tech Requirements

### postgresql

- Mac: `brew install postgresql@16` and follow instructions carefully.
- Windows: [via WSL](https://learn.microsoft.com/en-us/windows/wsl/install) and then follow the specific instruction of your Linux distro
- Linux: from your distro's package manager. Ubuntu: `sudo apt install postgresql` or something like that. Google!

### node.js

You should install node from something that handles your versioning. I personally use NVM at work, and it's been good.

- https://github.com/nvm-sh/nvm

If this is **not possible** (I do not yet know if it is, because in MacOS you need to have Xcode installed, and I don't know whether you do), we shall improvise and grab it from brew. But ONLY if the NVM route fails, and if the nvm route fails, we should try to make it work later on.

- `brew install node`

This will install the current (22.x, at the writing time 2024-08-27) version of Node.
