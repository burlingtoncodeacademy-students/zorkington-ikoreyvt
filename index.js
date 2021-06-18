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
    return this.useableDesc;
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
    return `(~‾⌣‾)~
    ~(‾⌣‾)~
    ~(‾⌣‾~)
    ~(‾⌣‾)~
    (~‾⌣‾)~`;
  }
}
//dont think this is necessary anymore with the use method on toilet
/*class Bathroom extends Room {
  constructor(name, description, roomInventory = []) {
    super(name, description, roomInventory);
  }

   pee() {
    if (bladderLevel === 0) {
      return `You can't pee anymore!!!`;
    } else {
      return (bladderLevel = 0);
    }
  }
} */

let wallet = new Item(
  "wallet",
  "Your wallet which contains your license and your debit card.",
  "I'm not quite sure what I'd use this on.",
  true,
  "You put your wallet in your pocket."
);

let lighter = new Item(
  "lighter",
  "A Bic lighter. When shaken you can hear it has fuel left.",
  "You light the lighter and hold for a few seconds. Fun!",
  true,
  "You take the lighter off the ground."
);

let atm = new Item(
  "atm",
  "An ATM where you can withdraw cash that you have in your bank account.",
  "You've received your cash. Goodbye.",
  false,
  "You cannot take the ATM. That is illegal buddy."
);

let toilet = new Item(
  "toilet",
  "A toilet where you can relieve yourself.",
  `You have taken a pee and definitely washed your hands. ${(bladderLevel = 0)}`,
  false,
  "WTF?? You can't take the toilet. Who even are you?"
);

let karaokeMachine = new Item(
  "karaoke machine",
  "A karaoke machine where you can sing a song",
  `ヾ('〇')ﾉ♪♪♪\nSWEEEEET CAROLINEEE!!!\n*BUM* *BUM* *BUM*\nGOOD TIMES NEVER SEEMED SO GOOD!!....`,
  false,
  "What? And ruin the fun for everyone else?"
);

let poolTable = new Item(
  "pool table",
  "Your standard pool table. Looks like someone left partway through a game.",
  "You have no one to play with. Big sad. ಥ_ಥ ",
  true,
  `You took the ${this.name}. Are you seriously wearing cargo shorts? How'd you even do that?`
);

let tv = new Item(
  "tv",
  "A flat screen TV displays some sports stuff.",
  "*sports stuff idk i dont care about sports in the slightest*",
  false,
  "TV seems to be secured pretty good. I think they've finally had enough of you."
);

let stolenTVs = new Item(
  "stolen tvs",
  "Several TVs just stacked haphazardly in the corner.",
  "Why do you even have all of these?",
  false,
  "You have no need for these."
);

let apartment = new Room(
  "apartment",
  "From here you can go to the bathroom, closet, bedroom, or leave out the front door to Church St.",
  []
);

let closet = new Room(
  "your closet",
  "An inexplicably large amount of TVs in here",
  [stolenTVs]
);

let homeBathroom = new Room("bathroom", "Your home throne.", [toilet]);

let bedroom = new Room(
  "bedroom",
  "You're in your bedroom. Your bed is unmade as per usual. Next to your bed is you nightstand on top of which lies your wallet.",
  [wallet]
);

let churchSt = new Room(
  "church st",
  "A long cobblestone road whereon lies a handful of b tier bars. (JP's Pub, Red Square, Ake's Place, and Ri Ra Irish Pub",
  [lighter]
);

let atmRoom = new Room(
  "atm room",
  "Within this room is an ATM. You can withdraw money from here.",
  [atm]
);

//start constructing the different bars with their own unique stamps and activities so they can't get into any bar with any stamp in inventory

let jpsStamp = new Item(
  "jp's stamp",
  "A little microphone stamped onto your right hand.",
  "This has no use besides entering JP's.",
  false,
  "You can't take that?"
);

let jpsPub = new Bar(
  "jp's pub",
  "Not the greatest bar around. There's a few TVs and a karaoke machine. You can grab a drink or have a little dance too.",
  [karaokeMachine]
);

let jpsBathroom = new Room(
  "jp's bathroom",
  "Pretty small bathroom tbh. Single occupancy.",
  [toilet, tv]
);

let akesStamp = new Item(
  "ake's stamp",
  "Seems to be a pool stick shaped stamp.",
  "Entering Ake's Place seems to be the only use for this here stamp.",
  false,
  "You can't take that?"
);

let akesBathroom = new Room(
  "ake's bathroom",
  "Definitely not the worst bathroom around. Thankfully there aren't any other obnoxious people in here with you.",
  []
);

let akesPlace = new Room(
  "ake's place",
  "This bar is alright. The music isn't too loud and has a pool table. Looks like they're having a special on PBR tonight.",
  [poolTable]
);

let riraStamp = new Item(
  "ri ra's stamp",
  "Might be a little pint o' Guinness? Hard to tell being so small.",
  "How exactly would you use this other than entrance to Ri Ra Irish Pub?",
  false,
  "You can't take that."
);

let riraBathroom = new Room(
  "ri ra'a bathroom",
  "Down a flight of stairs and a long hallway to get to this bad boy. Nice little break from the mayhem upstairs.",
  [toilet]
);

let riraIrishPub = new Room(
  "ri ra irish pub",
  "A decent bar that always has some Guinness on tap. Pretty good sized, multi level dance floor and a few TVs.",
  [tv]
);

let redStamp = new Item();

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
let currentRoom = apartment;

async function start() {
  let answer = await ask("What would you like to do next?" + `\n>_`);
  process.exit();
}
/*
console.log(
  `The time is 9:56 on a Saturday night.\nYou find yourself 4 shots deep in your apartment's living room during pregame. Your bladder is currently ${bladderLevel}/10 and your drunkness is ${drunkness}/20. From here you can go to your bathroom, your bedroom, or leave out the front door to Church St.`
);
*/
console.log(karaokeMachine.use());
console.log(poolTable.use());
console.log(poolTable.take());
console.log(playerInventory);
