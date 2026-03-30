# Joomla Content Plugin – Auto Title
This repository contains a Joomla content plugin developed as part of a Google Summer of Code (GSoC) test task.

## Overview
The **Auto Title** plugin automatically pre-fills the article title field with a configurable default value when creating a new article in the Joomla administrator interface. This helps streamline content creation and ensures consistency for new articles.

## Features
- Adds a plugin parameter to set the default article title (`autotitle_text`).
- Integrates with the Joomla admin article form.
- Uses Joomla's AJAX interface (`com_ajax`) to fetch and prefill the title.
- Only fills the title if the field is empty and the article is new.
- Fully respects manual user input—your title is never overwritten.

## Installation & Usage
1. Install the plugin ZIP file via the Joomla administrator.
2. Enable the **Content - Auto Title** plugin.
3. Set your preferred default title in the plugin settings.
4. Go to **Content → Articles → New** to create a new article.
5. The title field will be prefilled with your default value if left empty.

## File Structure
- `autotitle.xml` – Plugin manifest.
- `services/provider.php` – Service provider for dependency injection.
- `src/Extension/Autotitle.php` – Main plugin logic.
- `language/en-GB/plg_content_autotitle.ini` – Language strings.
- `language/en-GB/plg_content_autotitle.sys.ini` – System language strings.

## Testing
- The plugin has been manually tested for correct behavior in the Joomla admin.
- To test: install, enable, configure, and create a new article as described above.

## License
This project is licensed under the GNU General Public License v2.0 or later.
Joomla! CMS™
====================

Build Status
------------

| Actions                                                                                                                                         | PHP                                                                           | Node                                                                                 | npm                                                                              |
|-------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| [![Build Status](https://github.com/joomla/joomla-cms/actions/workflows/ci.yml/badge.svg?branch=5.4-dev)](https://github.com/joomla/joomla-cms) | [![PHP](https://img.shields.io/badge/PHP-V8.1.0-green)](https://www.php.net/) | [![node-lts](https://img.shields.io/badge/Node-V20.0-green)](https://nodejs.org/en/) | [![npm](https://img.shields.io/badge/npm-v10.1.0-green)](https://nodejs.org/en/) |

Overview
---------------------
* This is the source of Joomla! 5.x.
* Joomla's [Official website](https://www.joomla.org).
* Joomla! 5.4 [version history](https://docs.joomla.org/Special:MyLanguage/Joomla_5.4_version_history).
* Detailed changes are in the [changelog](https://github.com/joomla/joomla-cms/commits/5.4-dev).

What is Joomla?
---------------------
* [Joomla!](https://www.joomla.org/about-joomla.html) is a **Content Management System** (CMS) which enables you to build websites and powerful online applications.
* It is a simple and powerful web server application which requires a server with PHP and either MySQL, MariaDB or PostgreSQL to run. You can find [full technical requirements here](https://downloads.joomla.org/technical-requirements).
* Joomla! is **free and Open Source software** distributed under the GNU General Public License version 2 or later.

Looking for an installable package?
---------------------
Joomla is not installable out of the box from this repository, please use:
- For the latest stable package: https://downloads.joomla.org
- For a nightly package: https://developer.joomla.org/nightly-builds.html

How to get a working installation from the source
---------------------
For detailed instructions please visit https://docs.joomla.org/Special:MyLanguage/J5.x:Setting_Up_Your_Local_Environment

You will need:
- PHP - basically the same as you need for running a Joomla Site, but you need the cli (command line interface) Version (see https://docs.joomla.org/Special:MyLanguage/Configuring_a_LAMPP_server_for_PHP_development)
- Composer - for managing Joomla's PHP Dependencies. For help installing composer please read the documentation at https://getcomposer.org/doc/00-intro.md
- Node.js - for compiling Joomla's Javascript and SASS files. For help installing Node.js please follow the instructions available on https://nodejs.org/en/
- Git - for version management. Download from here https://git-scm.com/downloads (MacOS users can also use Brew and Linux users can use the built-in package manager, eg apt, yum, etc).

**Steps to setup the local environment:**
- Clone the repository:
```bash
git clone https://github.com/joomla/joomla-cms.git
```
- Go to the joomla-cms folder:
```bash
cd joomla-cms
```
- Go to the 5.4-dev branch:
```bash
git checkout 5.4-dev
```
- Install all the needed composer packages:
```bash
composer install
```
- Install all the needed npm packages:
```bash
npm ci
```

**Things to be aware of when pulling:**
Joomla creates a cache of the namespaces of its extensions in `JOOMLA_ROOT/administrator/cache/autoload_psr4.php`. If
extensions are created, deleted or removed in git then this file needs to be recreated. You can simply delete the file
and it will be regenerated on the next call to Joomla.

Do you want to improve Joomla?
--------------------
* Where to [request a feature](https://issues.joomla.org)?
* How do you [report a bug](https://docs.joomla.org/Special:MyLanguage/Filing_bugs_and_issues) on the [Issue Tracker](https://issues.joomla.org)?
* How to [submit code](https://manual.joomla.org/docs/get-started/git/) to the Joomla CMS using a Pull Request?
* Get Involved: Joomla! is community developed software. [Join the community](https://volunteers.joomla.org).
* Documentation for [Developers](https://manual.joomla.org/).
* Documentation for [Web designers](https://docs.joomla.org/Special:MyLanguage/Web_designers).
* Provide a translation for Joomla: [Joomla Crowdin Project](https://joomla.crowdin.com/cms)

Which branch should my Pull Request target?
--------------------
Using a simple classification keeps the project **stable**, **transparent**, and **easy** for everyone to contribute.

| Type of change | What it means | Target branch |
|---|---|---|
| **Bug / Patch release** | The change fixes an actual error. The software crashes, produces the wrong result, or behaves contrary to its specification. It can be resolved without large‑scale refactoring or new functionality. | **[5.4-dev](https://github.com/joomla/joomla-cms/tree/5.4-dev)** (6.0-dev) **\*** |
| **Feature / Minor release** | Anything that isn’t a strict bug – new behavior, refactoring, performance improvements, enhancements, UI tweaks, etc. These changes are bundled together for the next minor version. | **[6.1-dev](https://github.com/joomla/joomla-cms/tree/6.1-dev)** |

**\*** All bugs that already exist in version 5.4.x should be fixed in `5.4-dev`. Only bugs that are introduced for the first time in version 6.0.x should target the [`6.0-dev`](https://github.com/joomla/joomla-cms/tree/6.0-dev) branch.

A member of the maintainer or bug squad team confirms the classification and sets the appropriate labels when a PR is opened. If a PR is opened in the wrong branch, a maintainer will simply ask you to retarget it to the proper branch.


Copyright
---------------------
* (C) 2005 Open Source Matters, Inc. <https://www.joomla.org>
* Distributed under the GNU General Public License version 2 or later
* See [License details](https://docs.joomla.org/Special:MyLanguage/Joomla_Licenses)
