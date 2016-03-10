# Atlasboard OpenHAB Package
Using Atlasboard as a base this is a collection of jobs and widgets to create a dash board for you home and integration with OpenHAB

**NOTE**
Wiki updates are in progress and this will be moved. 

<https://github.com/sytone/atlasboard-openhab-package/wiki>

## Installation (If you know how Atlasboard Works)

From the root directory of your **recently created wallboard**, you just need to type:

    git clone https://github.com/sytone/atlasboard-openhab-package.git packages/openhab

If you are working on atlasboard code as well you can pull in as sub module.

    git submodule add https://github.com/sytone/atlasboard-openhab-package.git packages/openhab

to import the package as **git submodule** and use any of the widgets and jobs in this package (check the example dashboard **openhab** to see how).

See also: [Package-Atlassian](https://bitbucket.org/atlassian/atlasboard/wiki/Package-Atlassian)
## Full Installation 
* Install Node.js
* Install Python
* Install Visual Studio Express if on windows to deal with python C++ complie... Yes I know...

Install Atlasboard by opening the npm console and running the following command.
``` 
npm install -g atlasboard 
```
NOTE: Add --msvs_version=2015 to the command above ifyou are running Visual Studio Communitiy 2015 edition. Its free so use it!

ANOTHER NOTE: If you get path to long do the following. 
	
> 1. Open notepad in Administrator mode. 
> 2. Go to location [nodejs installation directory]\node_modules\npm
> 3. Open file "npmrc" and change prefix=c:\npm 
> 4. Save the file.


Navigate to the directory you want the dashboard in. 
``` 
atlasboard new cooldashboardname 
```
Change to the root of the new dashboard and get this repo as a submodule.
```
cd cooldashboardname
```
If you just want this dashboard:

    git clone https://github.com/sytone/atlasboard-openhab-package.git packages/openhab

If you are working on atlasboard code as well you can pull in as sub module:
```
git init
git commit --message inital
git submodule add https://github.com/sytone/atlasboard-openhab-package.git packages/openhab
```

Start the Dashboard on the port you want (3000 below)
```
atlasboard start 
```

Open a browser and naviagte to [http://localhost:3000/](http://localhost:3000/)

## Screen Shots

Not much at the moment. :)

![](screenshots/SimpleSwitchesPage.png?raw=true)

## Available Widgets

### OpenHAB Item - Switch Configuration
This widget is backed by the openhab-bridge job. 

![](screenshots/openhabitem-switch.png?raw=true)

#### Dashboard Configuration
In the widgets collection.
```JSON
      {"row" : 2, "col" : 1, "width" : 1, "height" : 1, 
        "widget" : "openhabitem",   "job" : "openhab-bridge",  "config": "openhab-officelamp"},
```
In the config section.
```JSON
    "openhab-officelamp" : {
      "openhabSimpleAuth": "simplekeycheck",
      "itemType": "Switch",
      "itemName": "Light_FF_Office_Lamp_ISY", 
      "itemLabel": "Office Lamp", 
      "itemBody" : "%s",
      "displayImageBase": "",
      "displayLabel": true,
      "interval": 5000,
      "openHabRestEndpoint": "http://homeinterchange:8080/"
```      
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

