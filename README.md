(in project directory)

```
mkdir android/app/src/main/assets
```

```
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

```
react-native run-android
```

script in package.json to run step 2 and 3

```
"android-linux": "react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res && react-native run-android"
```

run script

```
npm run android-linux
```

https://stackoverflow.com/questions/44446523/unable-to-load-script-from-assets-index-android-bundle-on-windows

require ==> npm install react-native-screens react-native-safe-area-context

npx react-native log-android
