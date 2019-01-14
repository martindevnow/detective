# detective


## Game Flow
- User loads the website
  - View: Home/Scenarios
- User selects a scenario to play
  - View: Scenario
  - State: Initialize
- Display scenario description and whatnot
- Move user to starting location (usually the police office)
  - View: Location
  - State: Set location
  - Actions: Talk to people
- [During Interrogation]
  - Can ask about other people
  - Can ask about any evidence provided in the initial setup
  

Triggers
Triggers are game changing events that can occur during the game, they themselves can be tripped in a variety of ways.

- Time based
  - These will trigger once a certain time passes. Because some actions take more time, these need to be checked after each action is taken
- Location based
  - These can trigger when a user enters or exits an area. Because of this, these need to be checked each time the user changes location. (Check for exit-trigger related to the location being left and enter-triggers related to the location being entered.)
- Question Based
  - The core function of this game is asking questions. Some of these should be based on what the detective *should* know. As such, we can give the detective an item (`s` or `i` items) to remind them about it. This also allows the detective to ask specific questions about something they learned (but don't know fully).
  - i.e.) The detective finds a photo. We give them the item card so they can ask about it. Once they ask the **right** person, we then set a `trigger` flag to discovered so now we can track the fact that the detective knows more about the photo. Now, when they ask people about the photo, they context has changed.
- Time Delay
  - These are triggers that will become active a certian time delay after another event occurs. Similar to time based, these need to be checked regularly to ensure this trigger is flipped at the right time.
- 



## ToDo:

change
`            echo 'export IMAGE_NAME=detective' >> $BASH_ENV` 
to 
`            echo "export PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[\",]//g' | tr -d '[[:space:]]')" >> $BASH_ENV`
but extract the package name..


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



