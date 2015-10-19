# Atlasboard OpenHAB Package
Using Atlasboard as a base this is a collection of jobs and widgets to create a dash board for you home and integration with OpenHAB

**NOTE**
Wiki updates are in progress and this will be moved. 

<https://github.com/sytone/atlasboard-openhab-package/wiki>

## Installation (If you know how Atlasboard Works)

From the root directory of your **recently created wallboard**, you just need to type:

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
git init
git commit --message inital
git submodule add https://github.com/sytone/atlasboard-openhab-package.git packages/openhab
```
Start the Dashboard on the port you want (3333 below)
```
atlasboard start 3333
```

Open a browser and naviagte to [http://localhost:3333/](http://localhost:3333/)


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

