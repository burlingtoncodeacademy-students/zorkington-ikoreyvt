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
let bladderLevel = 3;
let drunkness = 6;
let drinksHad = 0;

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
      playerInventory.push(this.name);
      return this.takeableDesc;
    } else {
      return this.takeableDesc;
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
  // drink method that will add to your drunkness and your overall drink counter. if you reach drunkness of 20 you fail the game
  drink() {
    if (drunkness < 20) {
      drunkness += 2;
      drinksHad += 1;
    } else {
      console.log(
        `You've blacked out and thrown up all over yourself. You've been kicked out of the bar and are forced to walk home in shame. Game over.`
      );
      process.exit();
    }
  } // oh yes babyyyyy
  dance() {
    return `\n(~‾o‾)~
    \n~(‾o‾)~
    \n~(‾o‾~)
    \n~(‾o‾)~
    \n(~‾o‾)~`;
  }
}

let bed = new Item("Bed", "Your bed is unmade as per usual.");

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
  `You took the ${this.name}. Are you seriously wearing cargo shorts?`
);

let tv = new Item(
  "TV",
  "A flat screen TV displays some sports stuff.",
  "*sports stuff* idk i dont care about sports in the slightest",
  false,
  "TV seems to be secured pretty good."
);

let money = new Item("Money", "An undisclosed amount of money.");

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
  "You're in your bedroom. Next to your bed is you nightstand on top of which lies your wallet.",
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
  []
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

/*
start in your living room
bladder condition will be quarter full
  can use bathroom in home to reduce this to 0 before leaving to the bar
drunkness starts at 6/20
  can go to your bathroom
    can use toilet
    can use sink
  can go to your bedroom
    can use bed and skip going out for the night, wins game immediately
    can examine night stand
      can pick up your wallet off the night stand
        wallet contains license and debit card
  can go out door to church st
    atm
      can get money out of atm but requires debit card
    bunch of bars
      bars require your license AND cover charge to get in
        get stamped once you get in so you don't need a cover charge again
          some bars only have beer to drink and music to listen to
            if you drink too much beer you'll throw up
              leaving a bar or going to the bathroom will remove one beer from your drunkness and allow you to drink more
          one bar will have a karaoke (jps) machine that you sing sweet caroline on
          all bars will have a bathroom you will HAVE to use
            if you don't use the bathroom when bladder is full you'll piss pants and lose
              red square line is too long so if you go to use bathroom when bladder is full you piss pants and lose
*/

//start in your apartment(living room)
let currentRoom = apartment;

// lookup table to connect string entered to object
let roomLookup = {
  apartment: apartment,
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
  toilet: toilet,
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
  "ake's place bathroom": [akesPlace],
};
// function move between rooms
function changeRoom(newRoom) {
  //take a new room
  // check against undefined and say i don't know that if undefined
  if (roomTransitions[newRoom] === undefined) {
    console.log("I do not know that command. Please try again.");

    // else if the transition is invalid, tell the user they cannot do that
  } else if (!roomTransitions[newRoom].includes(currentRoom)) {
    console.log(`Sorry you cannot go to ${newRoom} from ${currentRoom}`);
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
    console.log(currentRoom.lookAround());
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
    console.log(`There is no ${itemLookup[itemName].name.toLowerCase()} here!`);
    // if you don't have anything to pee out it won't use the toilet
  } else if (itemLookup[itemName] === toilet && bladderLevel === 0) {
    console.log("You have nothing left to pee! Let someone else take a turn.");
    // if you have to REALLY pee and you try to use red square bathroom, the line is too long and you lose by peeing pants
  } else if (
    roomLookup[currentRoom.name] === redBathroom &&
    bladderLevel === 9
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
    } else {
      console.log("You must have your debit card to access the ATM.");
    }
  } else {
    console.log(itemLookup[itemName].use());
  }
  return game();
}

// drop function that will drop the requested item into the
function drop(itemToDrop) {
  // first check if the item is in the player's inventory
  if (!playerInventory.includes(itemLookup[itemToDrop])) {
    // tell player they have no such item in their inventory
    console.log(`You cannot drop what you do not have.`);
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
    console.log(`You dropped the ${itemToDrop}.`);
  }
  return game();
}

async function game() {
  let answer = await ask("What would you like to do next?" + "\n>_");
  console.log(`You are currently ${drunkness}/20 drunk.`)
  console.log(`Your bladder is currently ${bladderLevel}/10 full.`)
  let inputArray = answer.toLowerCase().split(" ");
  let action = inputArray[0];
  let target = inputArray[1];
  if (inputArray.length === 3) {
    target = inputArray[1] + " " + inputArray[2];
  }

  if (action === "go" || action === "move") {
    changeRoom(target);
  } else if (action === "use") {
    useItem(target);
  } else if (action === "take") {
    itemLookup[target].take();
  } else if (action === "drop") {
    drop(target);
  } else if (action === "inventory") {
    console.log(playerInventory.map((itemName) => {
    return itemName.name;
    }));
  } 
}

/*console.log(
  `The time is 9:56 on a Saturday night.\nYou find yourself 4 shots deep in your apartment's living room during pregame. From here you can go to your bathroom, your bedroom, or leave out the front door to Church St.`
);
*/

/* 
current room inventory:
roomLookup[currentRoom.name.toLowerCase()].inventory
*/