ionic cordova plugin add cordova-plugin-nativestorage --save-dev
ionic cordova plugin add cordova-plugin-vibration --save-dev
ionic cordova plugin add cordova-plugin-nativeaudio --save-dev
ionic cordova plugin add cordova-plugin-tts --save-dev
ionic cordova plugin add cordova-plugin-googleplus --save-dev
ionic cordova plugin add cordova-plugin-statusbar --save-dev
# Requirements
* Nodejs > version 6
* cordova version 6
* ionic version 2
* npm
* gulp
* sass
* "Android sdk" for install on Android device + adb

# Install
## Web
* `npm install`
* `ionic serve`

## Android
* `npm install`
* `cordova prepare`
* `cordova run android`

# Deploy Web
* `ionic build browser --prod` Contents generated in **www** folder
