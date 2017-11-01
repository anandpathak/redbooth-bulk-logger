# FrontEnd

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.


##configaration and  Variables

Rename `app.settings.js.default` to app.settings.js inside src/app folder and then replaces the variables

## Usage: 

This is a front-end part for an application to bulk log into redbooth task. 

##Step: 

 - Run the application and open the front-end in browser
 - Make sure font-end is connected to back-end and APIs are working 
 - Autharize application to redbooth
 - add the logs in the text format in a format like 
 
 ```
 	<author>|YYYY-mm-dd|<comment message>|<hours of work (Integer | Float) >|<redboth task id>
 ```
 - you can generate these logs from git command 
 ```
 	git log --author=<author_name> --date=local --after="YYYY-mm-ddTHH:MM:SS-00:00" --pretty=format:%aN'|'%ci'|'%s' '%b'|<hr>|<taskID>' 
 ```