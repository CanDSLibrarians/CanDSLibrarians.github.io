# Canadian DS Librarians Community of Practice

## Editing

All of the website's content lives in the `content` directory, which is structured like so:

* `content/`
   * `meetups/`: (folder for all meetups, organized by year)
       * `2021_meetup.md`
       * `2022_meetup.md`
       * +++
    * `workshops/` (folder for all workshop series, organized by year)
       * `2023_workshops.md`
       * +++
    * `_index.md` (the homepage)

These folders dictate the categories for the top navigation dropdown menu.

Each page is a Markdown file, which should contain a YAML header that, at minimum, specifies a title, the date originally authored/published, and a draft flag:

```yaml
---
# This is the main title for the page 
# (both rendered and in metadata)
title: "Fall 2021 Meetup" 

# An ISO-8601 date 
# (YYYY-MM-DD and YYYY-MM-DD:THH:MM:SS 
# are also valid)
date: 2021-10-21T10:34:54-04:00 

# Set to true to prevent page from
# rendering on the live site
draft: false 
---
``` 


### Google Sheets

This site also provides the custom shortcode `googlesheet`, which converts and embeds a googlesheet into the page (this is updated per page refresh, not per site build).

To use the Googlesheet shortcode, make sure your Google Sheet is published to the web (read only). Once published, use the `googlesheet` shortcode, add a space, and then paste the (fairly gnarly) Google public sheet id string like so (note the angle brackets after each pair of curly braces):

```md
Here is a table of stuff:

{{< googlesheet 2PACX-1vQoZAI6lGUQZn-Uua04jlkaf0sejm6yrcTpuoUKaRbcHy2huADW9CL2UYO4TorEXCSymVje >}}


And another table:

{{< googlesheet 290c0x-1VJoDMPPZIS-UPOPJ888sasjem72mdDSDjvns-sd0EJDNV9rnx0do3mcOMCNT9ep
>}}

```

## Deploying

Each push to this repository should trigger a rebuild of the static website, thanks to GitHub Actions. The configuration for the deployment workflow is in `.github/workflows/build.yaml`, which is a slightly simplified but more-or-less verbatim copy of what Hugo's documentation provides. 

## Building locally

After cloning the repository and navigating into the directory, you can just use the `hugo` command, which will build the site locally.

To test and develop, use `hugo serve` — this will start a local server (probably at localhost:1313) that responds to any changes you make

## Dependencies and customizations 

This site uses panr's [Terminal Theme](https://github.com/panr/hugo-theme-terminal/); for safety's sake, we use a static copy of the theme, the assets (and license) for which can be found in the `/themes/terminal/` directory. Customizations to this theme are in the `/layouts/` directory. These include:

* `partials/`:
    * `extended_head.html`: Appends custom CSS and JavaScript to each page
    * `footer.html`: Overwrites the theme's footer to give additional content before the real footer block so to avoid redundancy
    * `header.html`: Overwrites the theme's menu structure to make for a cleaner, albeit less complex, menu system that automatically updates and lists subpages in reverse chronological order (see also `partials/menu.html`) 
    * `menu.html`: Departs from standard Hugo logic of menu creation to group pages first by category (i.e. subdirectory under `content/`) and then lists each page in reverse chronological order. This obviates Hugo's own processing and handling of menus (especially within the configuration), but is a bit more straight-forward and automatic for this site's purposes
    * `partials/mobile-menu.html`: Ibid., but for mobile
* `shortcodes/`
    * `googlesheet.html`: A custom shortcode/function for the DSLibs site that renders a Google Sheet as a formatted table on any page (see above). Rendering of this sheet relies on PapaParse.js, which is also stashed in this repository. 