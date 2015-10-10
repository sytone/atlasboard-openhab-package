# Atlasboard OpenHAB Package
Using Atlasboard as a base this is a collection of jobs and widgets to create a dash board for you home and integration with OpenHAB


## Installation

From the root directory of your **recently created wallboard**, you just need to type:

    git submodule add https://github.com/sytone/atlasboard-openhab-package.git packages/openhab

to import the package as **git submodule** and use any of the widgets and jobs in this package (check the example dashboard **openhab** to see how).

See also: [Package-Atlassian](https://bitbucket.org/atlassian/atlasboard/wiki/Package-Atlassian)

## Available Widgets

### Clock
Shows the date and time. Really, thats all...

![](screenshots/clock.png?raw=true)

#### Configuration
```JSON
  "clock" : {
    "interval": 10000,
    "hideTitle": true,
    "title": "Current Time",
    "dateFormat": "yyyy/mm/dd",
	  "timeFormat": "h:MM TT",
	  "timeZone": 8
	}
```

