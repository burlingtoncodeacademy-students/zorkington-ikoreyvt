const readline = require("readline");
const readlineInterface = readline.createInterface(
  process.stdin,
  process.stdout
);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

let playerInventory = [];
let bladderLevel = 2;
let drunkness = 4;
let gamePoints = 0;

//defines the basic room
class Room {
  constructor(name, description, roomInventory = []) {
    this.name = name;
    this.description = description;
    this.inventory = roomInventory;
  }
  lookAround() {
    return this.description;
  }
}
// defines item class with methods that can be called upon to either interact with or pickup an item
class Item {
  constructor(name, description, useDescription, takeable, takeableDesc) {
    this.name = name;
    this.description = description;
    this.useDescription = useDescription;
    this.takeable = takeable;
    this.takeableDesc = takeableDesc;
  }
  // take method that will attempt to take an item and add to inventory. If the item is not takeable tell the user they cannot pickup the item
  take() {
    if (this.takeable) {
      playerInventory.push(this);
      console.log(`\n${this.takeableDesc}`);
    } else {
      console.log(`\n${this.takeableDesc}`);
    }
  }
  // use method that will allow a user to interact with the item and return its use description
  use() {
    return this.useDescription;
  }
}
// bar class that has a couple activities and one will have a karaoke machine
class Bar extends Room {
  constructor(name, description, roomInventory = [] /*activities*/) {
    super(name, description, roomInventory);
    //this.activities = activities; don't think this is necessary anymore
  }
  // drink method that will add to your drunkness, bladder level, and game points. if you reach drunkness of 12 you fail the game
  drink() {
    if (drunkness < 10) {
      drunkness += 3;
      bladderLevel += 1;
      gamePoints += 50;
    } else {
      console.log(
        `You've blacked out and thrown up all over yourself. You've been kicked out of the bar and are forced to walk home in shame. Game over.`
      );
      process.exit();
    }
  } // oh yes babyyyyy
  dance() {
    console.log(`\n(~‾o‾)~
    \n~(‾o‾)~
    \n~(‾o‾~)
    \n~(‾o‾)~
    \n(~‾o‾)~`);
    gamePoints += 60;
  }
}

let bed = new Item(
  "Bed",
  "Your bed is unmade as per usual.",
  `Mkay good night!`,
  false,
  "You cannot take your bed right now."
);

let wallet = new Item(
  "Wallet",
  "Your wallet which contains your license and your debit card.",
  "I'm not quite sure what I'd use this on.",
  true,
  "You put your wallet in your pocket."
);

let lighter = new Item(
  "Lighter",
  "A Bic lighter. When shaken you can hear it has fuel left.",
  "You light the lighter and hold for a few seconds. Fun!",
  true,
  "You take the lighter off the ground."
);

let atm = new Item(
  "ATM",
  "An ATM where you can withdraw cash that you have in your bank account.",
  "You've received your cash. Goodbye.",
  false,
  "You cannot take the ATM. That is illegal buddy."
);

let toilet = new Item(
  "Toilet",
  "A toilet where you can relieve yourself.",
  `You have taken a pee and definitely washed your hands.`,
  false,
  "WTF?? You can't take the toilet. Who even are you?"
);

let karaokeMachine = new Item(
  "Karaoke Machine",
  "A karaoke machine where you can sing a song",
  `ヾ('〇')ﾉ♪♪♪\nSWEEEEET CAROLINEEE!!!\n*BUM* *BUM* *BUM*\nGOOD TIMES NEVER SEEMED SO GOOD!!....`,
  false,
  "What? And ruin the fun for everyone else?"
);

let poolTable = new Item(
  "Pool Table",
  "Your standard pool table. Looks like someone left partway through a game.",
  "You have no one to play with. Big sad. ಥ_ಥ ",
  true,
  `You took the pool table. Are you seriously wearing cargo shorts?`
);

let tv = new Item(
  "TV",
  "A flat screen TV displays some sports stuff.",
  "*sports stuff* idk i dont care about sports in the slightest",
  false,
  "TV seems to be secured pretty good."
);

let money = new Item("Money", "An undisclosed amount of money.", "You'll have to use this elsewhere.", true, "You picked up the money.");

let apartment = new Room(
  "Apartment",
  "In your living room. From here you can go to the bathroom, closet, bedroom, or leave out the front door to Church St.",
  []
);

let closet = new Room(
  "Your Closet",
  "Nothing really in here except for a bunch of things you stored away thinking you may use at some point in the future but you don't so now you have amassed all this stuff for no reason. hah",
  []
);

let homeBathroom = new Room("Home Bathroom", "Your home throne.", [toilet]);

let bedroom = new Room(
  "Bedroom",
  "You're in your bedroom. Next to your bed is you nightstand, on top of which lies your wallet.",
  [wallet, bed]
);

let churchSt = new Room(
  "Church St",
  "A long cobblestone road whereon lies a handful of b tier bars. (JP's Pub, Red Square, Ake's Place)",
  [lighter]
);

let atmRoom = new Room(
  "atm room",
  "Within this room is an ATM. You can withdraw money from here.",
  [atm]
);

//start constructing the different bars with their own unique stamps and activities so they can't get into any bar with any stamp in inventory

let jpsStamp = new Item(
  "JP's Pub Stamp",
  "A little microphone stamped onto your right hand.",
  "This has no use besides entering JP's.",
  false,
  "You can't take that?"
);

let jpsBathroom = new Room(
  "JP's Bathroom",
  "Pretty small bathroom tbh. Single occupancy.",
  [toilet]
);

let jpsPub = new Bar(
  "JP's Pub",
  "Not the greatest bar around. There's a few TVs and a karaoke machine. You can grab a drink or have a little dance too.",
  [karaokeMachine, tv]
);

let akesStamp = new Item(
  "Ake's Stamp",
  "Seems to be a pool stick shaped stamp.",
  "Entering Ake's Place seems to be the only use for this here stamp.",
  false,
  "You can't take that?"
);

let akesBathroom = new Room(
  "Ake's Bathroom",
  "Definitely not the worst bathroom around. Thankfully there aren't any other obnoxious people in here with you.",
  [toilet]
);

let akesPlace = new Bar(
  "Ake's Place",
  "This bar is alright. The music isn't too loud and has a pool table. Looks like they're having a special on PBR tonight.",
  [poolTable]
);

let redStamp = new Item(
  "red square's stamp",
  "A small stamp in the shape of a square.",
  "Truly no use besides entering Red Square.",
  false,
  "You can't take that."
);

let redBathroom = new Room(
  "Red Square's bathroom",
  "A terribly designed bathroom that has almost zero privacy.",
  []
);

let redSquare = new Bar(
  "Red Square",
  "There are far too many people in here and the music is way to loud. But at least the music is good.",
  []
);

//start in your apartment(living room)
let currentRoom = apartment;

// lookup table to connect string entered to object
let roomLookup = {
  apartment: apartment,
  "home bathroom": homeBathroom,
  "living room": apartment,
  bedroom: bedroom,
  closet: closet,
  "church st": churchSt,
  "atm room": atmRoom,
  "ake's place": akesPlace,
  "ake's bathroom": akesBathroom,
  "red square": redSquare,
  "red square's bathroom": redBathroom,
  "jp's pub": jpsPub,
  "jp's bathroom": jpsBathroom,
};

// lookup table for items
let itemLookup = {
  wallet: wallet,
  lighter: lighter,
  atm: atm,
  bed: bed,
  toilet: toilet,
  money: money,
  "karaoke machine": karaokeMachine,
  "pool table": poolTable,
  tv: tv,
  "jp's stamp": jpsStamp,
  "ake's stamp": akesStamp,
  "red square stamp": redStamp,
};

// lookup table for allowable room transitions in the game
let roomTransitions = {
  apartment: [churchSt, homeBathroom, bedroom, closet],
  "home bathroom": [apartment],
  bedroom: [apartment],
  closet: [apartment],
  "church st": [apartment, atmRoom, redSquare, akesPlace, jpsPub],
  "atm room": [churchSt],
  "red square": [churchSt, redBathroom],
  "red square's bathroom": [redSquare],
  "jp's pub": [churchSt, jpsBathroom],
  "jp's bathroom": [jpsPub],
  "ake's place": [churchSt, akesBathroom],
  // removed place from bathroom to try and fix program crash
  "ake's bathroom": [akesPlace],
};
// function move between rooms
function changeRoom(newRoom) {
  //take a new room
  // check against undefined and say i don't know that if undefined
  if (roomTransitions[newRoom] === undefined) {
    console.log("I do not know that command. Please try again.");

    // else if the transition is invalid, tell the user they cannot do that
  } else if (!roomTransitions[newRoom].includes(currentRoom)) {
    console.log(`Sorry you cannot go to ${newRoom} from ${currentRoom.name}`);
    //now for the key checks aka stamps in inventory
  } else if (newRoom === "red square" && !playerInventory.includes(redStamp)) {
    if (playerInventory.includes(money)) {
      //update the current room
      currentRoom = roomLookup[newRoom];
      // put the red square stamp in their inventory
      playerInventory.push(redStamp);
      //let them know what room they are in and where they can go
      console.log(currentRoom.lookAround());
    } else {
      console.log(
        "Unless you already have our stamp you cannot enter without a cover charge."
      );
    }
  } else if (newRoom === "jp's pub" && !playerInventory.includes(jpsStamp)) {
    if (playerInventory.includes(money)) {
      //update the current room
      currentRoom = roomLookup[newRoom];
      // put the red square stamp in their inventory
      playerInventory.push(jpsStamp);
      //let them know what room they are in and where they can go
      console.log(currentRoom.lookAround());
    } else {
      console.log(
        "Unless you already have our stamp you cannot enter without a cover charge."
      );
    }
  } else if (
    newRoom === "ake's place" &&
    !playerInventory.includes(akesStamp)
  ) {
    if (playerInventory.includes(money)) {
      //update the current room
      currentRoom = roomLookup[newRoom];
      // put the red square stamp in their inventory
      playerInventory.push(akesStamp);
      //let them know what room they are in and where they can go
      console.log(currentRoom.lookAround());
    } else {
      console.log(
        "Unless you already have our stamp you cannot enter without a cover charge."
      );
    }
  } // if room change is valid, move to new room
  else {
    //update the current room
    currentRoom = roomLookup[newRoom];
    //let them know what room they are in and where they can go
    console.log(`\n${currentRoom.lookAround()}`);
  }
  return game();
}
// function for if the user tries to use something
function useItem(itemName) {
  // if item is undefined ask for input again
  if (itemLookup[itemName] === undefined) {
    console.log("I do not recognize this action. Please try again.");
    // if the item you try to use is not in the current room you can't use that
  } else if (
    !playerInventory.includes(itemLookup[itemName]) &&
    !roomLookup[currentRoom.name.toLowerCase()].inventory.includes(
      itemLookup[itemName]
    )
  ) {
    console.log(`There is no ${itemLookup[itemName].name} here!`);
    // if you don't have anything to pee out it won't use the toilet
  } else if (itemLookup[itemName] === toilet && bladderLevel === 0) {
    console.log("You have nothing left to pee! Let someone else take a turn.");
    // if you have to REALLY pee and you try to use red square bathroom, the line is too long and you lose by peeing pants
  } else if (
    roomLookup[currentRoom.name] === redBathroom &&
    bladderLevel === 8
  ) {
    console.log(
      "The line in the bathroom was too long and now you're a little piss baby. Game over!"
    );
    process.exit();
    // if the current room is atm and you have the wallet you can withdraw cash and it puts money in your inventory
  } else if (roomLookup[currentRoom.name] === atmRoom) {
    if (playerInventory.includes(wallet)) {
      console.log(itemLookup[itemName].use());
      playerInventory.push(money);
      // if you don't have wallet in your inventory you cannot withdraw money
    } else {
      console.log("You must have your debit card to access the ATM.");
    } //if there are no special cases, just print out the "use" of the item
  } else if (itemLookup[itemName] === bed) {
    console.log(itemLookup[itemName].use());
    console.log(`Your score was ${gamePoints}`)
    process.exit();
  } else {
    // reset bladder level to 0 and add points if toilet is used
    if (itemLookup[itemName] === toilet) {
      bladderLevel = 0;
      gamePoints += 35;
    } // add points if karaoke machine is used
    if (itemLookup[itemName] === karaokeMachine) {
      gamePoints += 110;
    }
    console.log(itemLookup[itemName].use());
  }
  return game();
}

// drop function that will drop the requested item into the
function drop(itemToDrop) {
  // first check if the item is in the player's inventory
  if (!playerInventory.includes(itemLookup[itemToDrop])) {
    // tell player they have no such item in their inventory
    console.log(`\nYou cannot drop what you do not have.`);
  } else if (
    itemLookup[itemToDrop] === redStamp ||
    itemLookup[itemToDrop] === akesStamp ||
    itemLookup[itemToDrop] === jpsStamp
  ) {
    // find the index of the item to pull from players inventory
    let indexOfItem = playerInventory.indexOf(itemLookup[itemToDrop]);
    // remove the item at the index provided and drop no where as it is being erased not dropped
    playerInventory.splice(indexOfItem, 1);

    console.log(`\nYou erased your ${itemLookup[itemToDrop].name}.`);
  } else {
    // find the index of the item to pull from players inventory
    let indexOfItem = playerInventory.indexOf(itemLookup[itemToDrop]);
    // remove the item at the index provided
    playerInventory.splice(indexOfItem, 1);
    // then drop the item into the room's inventory
    roomLookup[currentRoom.name.toLowerCase()].inventory.push(
      itemLookup[itemToDrop]
    );
    // tell the player they successfully dropped the item
    console.log(`\nYou dropped the ${itemToDrop}.`);
  }
  return game();
}

// async function game that handles the user input and provides the right function for the input
async function game() {
  // display the drunkness and bladder level every time they take any action
  console.log(`***You are currently ${drunkness}/12 drunk.***`);
  // display bladder level every time you take an action
  console.log(`***Your bladder is currently ${bladderLevel}/8 full.***`);
  // only allow certain input
  let acceptableActions = [
    "go",
    "move",
    "use",
    "take",
    "drop",
    "inventory",
    "show",
    "examine",
    "drink",
    "actions",
    "dance",
  ];
  // ask user what they want to do next
  let answer = await ask("What would you like to do next?" + "\n>_");
  // split their answer into an action and a target
  let inputArray = answer.toLowerCase().split(" ");
  // first part of the user input will be the action
  let action = inputArray[0];
  // check their suggested action against the acceptable actions array and tell them they can use the actions keyword if they want to know how to play
  if (!acceptableActions.includes(action)) {
    console.log(
      "I'm sorry, I don't understand this action. You can type 'actions' for allowable input."
    );
    return game();
  }
  // target of the action will be the 2nd part of user input
  let target = inputArray[1];
  // if they use two words for their target, recombine the target into a string of 2 words
  if (inputArray.length === 3) {
    target = inputArray[1] + " " + inputArray[2];
  } else if (inputArray.length === 4) {
    target = inputArray[1] + " " + inputArray[2] + " " + inputArray[3];
  }
  // decrease drunkess by 1 every time a valid action is performed
  if (drunkness !== 0) {
    drunkness -= 1;
  }
  // assigning the action to the proper function/method based on keyword
  if (action === "actions") {
    console.log(acceptableActions);
    return game(); //go or move to change rooms
  } else if (action === "go" || action === "move") {
    changeRoom(target); // use to use the item
  } else if (action === "use") {
    useItem(target); // take to attempt to take the item
  } else if (action === "take") {
    // make sure item is in the room you are in or that it's not undefined
    if(!roomLookup[currentRoom.name.toLowerCase()].inventory.includes(
      itemLookup[target] || itemLookup[target] === undefined
    )){
      // if not in room inventory tell them you cannot do that
      console.log("You can't do that here!")      
    } else{
      // otherwise take item
      itemLookup[target].take();
      // and remove item from from inventory
      let indexOfItem = roomLookup[currentRoom.name.toLowerCase()].inventory.indexOf(itemLookup[target])
      roomLookup[currentRoom.name.toLowerCase()].inventory.splice(indexOfItem, 1)
    }
    return game(); // drop to drop the requested item into the room
  } else if (action === "drop") {
    drop(target);
    //player can request their inventory through a couple different commands
  } else if (action === "inventory") {
    console.log(
      playerInventory.map((itemName) => {
        return itemName.name;
      })
    );
    return game();
  } else if (action === "show" && target === "inventory") {
    console.log(
      playerInventory.map((itemName) => {
        return itemName.name;
      })
    );
    return game();
    // if player chooses examine
  } else if (action === "examine") {
    // check that the item is either in their inventory, in the room's inventory, or that the item is not undefined in the game
    if (
      !playerInventory.includes(itemLookup[target]) ||
      !roomLookup[currentRoom.name.toLowerCase()].inventory.includes(
        itemLookup[target] || itemLookup[target] === undefined
      )
    ) {
      console.log("There is no such item here.");
      return game();
      // if item is in the game return the description of the item
    } else {
      console.log(itemLookup[target].description);
      return game();
    } // user can use the drink action as long as they are within a bar
  } else if (action === "drink") {
    if (
      currentRoom === redSquare ||
      currentRoom === akesPlace ||
      currentRoom === jpsPub
    ) {
      currentRoom.drink();
      return game();
    } else {
      console.log("Unfortunately there is nothing to drink here.");
      return game();
    } // user can use the dance action as long as they are within a bar
  } else if (action === "dance") {
    if (
      currentRoom === redSquare ||
      currentRoom === akesPlace ||
      currentRoom === jpsPub
    ) {
      currentRoom.dance();
      return game();
    } else {
      console.log("No dancing here! >:|");
      return game();
    }
  }
}

console.log(
  `The time is 9:56 on a Saturday night.\nYou find yourself 2 shots deep in your apartment's living room during pregame. From here you can go to the home bathroom, bedroom, closet, or leave out the front door to Church St.`
);


game();


// INSTRUCTIONS KINDA

/*
start in your apartment (living room)
  drunkness starts at 4/12
  bladder condition will be 2/8
can go to your bathroom
  can use toilet to reduce bladder to 0 before leaving to the bar
    add points
can go to your bedroom
  can use bed and skip going out for the night, wins game immediately but 35 points max
  can examine night stand
    can pick up your wallet off the night stand
      wallet "contains" debit card
can go out door to church st
  atm room
    can get money out of atm but requires debit card
  bunch of bars
    bars require cover charge (money) to get in
      get stamped once you get in so you don't need a cover charge again
      if you drink too much beer you'll throw up
        any action will remove one drunkness
    red square
      can dance
        add points
      can go to bathroom
        add points
        if you try to use bathroom when bladder is full you pee pants cuz red square sucks and you lose
    jp's pub
      can use karaoke machine, not takeable
        add points
      can use tv, not takeable
        yay sports
      can go to bathroom
        can use toilet
          add points
    ake's place
      has pool table, takeable hehe, but no one to play with
      can use tv, not takeable
        yay sports again
  only certain things add points
  not really a game you "win" perse but going to bed and not puking or peeing your pants with more points means you won
*/