const { Application, Sprite, Texture, Container } = PIXI;

const app = new Application({ width: 1390, height: 640 });
document.body.appendChild(app.view);

const background = PIXI.Sprite.from("/assets/background.png");
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

const logo = Texture.from("/assets/logo.png");
const austin = Texture.from("/assets/austin.png");
const bookStand = Texture.from("/assets/book_stand.png");
const continueButton = Texture.from("/assets/continue.png");
const globe = Texture.from("/assets/globe.png");
const stair = Texture.from("/assets/old_stair.png");
const plant = Texture.from("/assets/plant.png");
const plant1 = Texture.from("/assets/plant1.png");
const plant2 = Texture.from("/assets/plant2.png");
const sofa = Texture.from("/assets/sofa.png");
const table = Texture.from("/assets/table.png");
const hammer = Texture.from("/assets/hammer.png");
const active = Texture.from("/assets/choosed.png");
const carpet1 = Texture.from("/assets/carpet1.png");
const carpet2 = Texture.from("/assets/carpet2.png");
const carpet3 = Texture.from("/assets/carpet3.png");
const ok = Texture.from("/assets/ok.png");
const newStair1 = Texture.from("/assets/new_stair_01.png");
const newStair2 = Texture.from("/assets/new_stair_02.png");
const newStair3 = Texture.from("/assets/new_stair_03.png");
const mask = Texture.from("/assets/mask.png");
const continueImage = Texture.from("/assets/continue_image.png");

const textures = [
  { name: "logo", texture: logo, coordinates: { x: 180, y: 70 } },
  { name: "austin", texture: austin, coordinates: { x: 1000, y: 50 } },
  { name: "bookstand", texture: bookStand, coordinates: { x: 700, y: 0 } },
  {
    name: "continuebutton",
    texture: continueButton,
    coordinates: { x: app.screen.width / 2, y: 560 },
  },
  { name: "globe", texture: globe, coordinates: { x: 0, y: 150 } },
  { name: "plant", texture: plant, coordinates: { x: 1200, y: 150 } },
  { name: "plant1", texture: plant1, coordinates: { x: 1230, y: 438 } },
  { name: "plant2", texture: plant2, coordinates: { x: 500, y: 0 } },
  { name: "sofa", texture: sofa, coordinates: { x: 50, y: 330 } },
  { name: "table", texture: table, coordinates: { x: 170, y: 200 } },
  { name: "stair", texture: stair, coordinates: { x: 900, y: 90 } },
  { name: "hammer", texture: hammer, coordinates: { x: 1290, y: 100 } },
];

const newStairs = [newStair1, newStair2, newStair3];

const carpets = [
  { texture: carpet1, coordinates: { x: 880, y: 300 } },
  { texture: carpet2, coordinates: { x: 1000, y: 100 } },
  { texture: carpet3, coordinates: { x: 1150, y: 175 } },
];

const circlesCoordinates = [
  { x: 855, y: 295 },
  { x: 975, y: 100 },
  { x: 1127, y: 170 },
];

const choosedCoordinates = [
  { x: 863, y: 300 },
  { x: 983, y: 105 },
  { x: 1136, y: 175 },
];

const okCoordinates = [
  { x: 846, y: 416 },
  { x: 966, y: 220 },
  { x: 1118, y: 290 },
];

const circle = Texture.from("/assets/circle.png");

let sprites = [];
let choosedSprites = [];
let carpetsSprites = [];
let circlesSprites = [];

function detectOS() {
  const platform = window.navigator.platform.toLowerCase(),
    iosPlatforms = ["iphone", "ipad", "ipod", "ipod touch"];

  if (platform.includes("mac")) return "MacOS";
  if (iosPlatforms.includes(platform)) return "iOS";
  if (platform.includes("win")) return "Windows";
  if (/android/.test(navigator.userAgent.toLowerCase())) return "Android";
  if (/linux/.test(platform)) return "Linux";

  return "unknown";
}

const goToPlayStore = () => {
  let link;
  const platform = detectOS();
  const appleCases = ["MacOS", "iOS"];

  if (appleCases.includes(platform)) {
    link = "https://apps.apple.com/ru/app/homescapes/id1195621598";
  } else {
    link =
      "https://play.google.com/store/apps/details?id=com.playrix.homescapes";
  }
  window.open(link);
};

let container = new Container();
let finishContainer = new Container();
container.sortableChildren = true;
finishContainer.sortableChildren = true;

const showCarpets = () => {
  carpets.forEach((carpet, index) => {
    const { texture, coordinates } = carpet;

    let carpetSprite = new Sprite(texture);
    let circleSprite = new Sprite(circle);
    let activeSprite = new Sprite(active);

    let sprites = [carpetSprite, circleSprite, activeSprite];

    sprites.forEach((sprite) => {
      sprite.interactive = true;
      sprite.buttonMode = true;
    });

    carpetSprite.scale.set(0, 0);
    circleSprite.scale.set(0, 0);

    carpetSprite.x = coordinates.x;
    carpetSprite.y = coordinates.y;
    circleSprite.x = circlesCoordinates[index].x;
    circleSprite.y = circlesCoordinates[index].y;
    activeSprite.x = choosedCoordinates[index].x;
    activeSprite.y = choosedCoordinates[index].y;
    activeSprite.alpha = 0;

    circleSprite.on("pointerdown", chooseCarpet.bind(this, index));
    carpetSprite.on("pointerdown", chooseCarpet.bind(this, index));
    activeSprite.on("pointerdown", chooseCarpet.bind(this, index));

    circlesSprites.push(circleSprite);
    carpetsSprites.push(carpetSprite);
    choosedSprites.push(activeSprite);

    container.addChild(circleSprite);
    container.addChild(activeSprite);
    container.addChild(carpetSprite);

    app.stage.addChild(container);

    Ease.ease.add(
      circleSprite,
      {
        scale: 1,
      },
      { wait: index * 100, duration: 500, ease: "easeInOutExpo" }
    );
    Ease.ease.add(
      carpetSprite,
      {
        scale: 1,
      },
      { wait: index * 100, duration: 500, ease: "easeInOutExpo" }
    );
  });
};

let lastNewStair;

const showNewStair = (index) => {
  if (lastNewStair) {
    lastNewStair.destroy();
  }

  let newStairSprite = new Sprite(newStairs[index]);
  newStairSprite.alpha = 0;
  newStairSprite.x = 1000;
  newStairSprite.y = -100;
  newStairSprite.zIndex = -1;
  lastNewStair = newStairSprite;

  container.addChild(newStairSprite);
  app.stage.addChild(container);

  Ease.ease.add(
    newStairSprite,
    {
      y: 0,
      alpha: 1,
    },
    { duration: 500, ease: "easeInOutExpo" }
  );
};

for (let i = 0; i < textures.length; i++) {
  const { name, texture, coordinates } = textures[i];
  let element = new Sprite(texture);
  element.x = coordinates.x;
  element.y = coordinates.y;

  if (name === "logo") {
    element.anchor.set(0.5, 0.5);
    element.scale.set(0, 0);
    element.zIndex = 1;
    finishContainer.addChild(element);
    app.stage.addChild(finishContainer);
  }
  if (name === "continuebutton") {
    element.anchor.set(0.5, 0.5);
    element.on("pointerdown", goToPlayStore);
    element.interactive = true;
    element.buttonMode = true;
    element.zIndex = 1;
    finishContainer.addChild(element);
    app.stage.addChild(finishContainer);
  }
  if (name === "hammer") {
    element.anchor.set(0.5, 0.5);
    element.scale.set(0, 0);
    element.on("pointerdown", removeHammer);
    element.interactive = true;
    element.buttonMode = true;
  }

  sprites.push({ name, sprite: element });
  if (name !== "plant1" && name !== "logo" && name !== "continuebutton") {
    app.stage.addChild(element);
  }
}

let [
  logoElement,
  continueButtonElement,
  plantElement,
  stairElement,
  hammerElement,
] = sprites.filter(
  ({ name }) =>
    name === "continuebutton" ||
    name === "logo" ||
    name === "hammer" ||
    name === "plant1" ||
    name === "stair"
);

async function removeHammer() {
  await new Promise((resolve) => {
    Ease.ease.add(
      hammerElement.sprite,
      {
        scale: 0,
      },
      { duration: 1000, ease: "easeInOutQuart" }
    );
    setTimeout(resolve, 1000);
  });

  hammerElement.sprite.destroy();
  showCarpets();
}

let activeOk;

function chooseCarpet(carpetNumber) {
  if (carpetNumber === undefined) {
    return;
  }

  if (!activeOk) {
    stairElement.sprite.destroy();
  }

  if (activeOk && carpetNumber !== undefined) {
    activeOk.destroy();
  }

  choosedSprites.forEach((choosed) => (choosed.alpha = 0));
  let okSprite = new Sprite(ok);
  okSprite.x = okCoordinates[carpetNumber].x;
  okSprite.y = okCoordinates[carpetNumber].y;
  okSprite.interactive = true;
  okSprite.buttonMode = true;
  okSprite.on("pointerdown", setStair);
  activeOk = okSprite;
  container.addChild(okSprite);
  app.stage.addChild(container);
  choosedSprites[carpetNumber].alpha = 1;
  showNewStair(carpetNumber);
}

function setStair() {
  container.removeChild(activeOk);
  choosedSprites.forEach((sprite) => sprite.destroy());
  circlesSprites.forEach((sprite) => sprite.destroy());
  carpetsSprites.forEach((sprite) => sprite.destroy());
  setTimeout(finish, 1000);
}

function finish() {
  const maskSprite = new Sprite(mask);
  const continueImageSprite = new Sprite(continueImage);
  continueImageSprite.anchor.set(0.5, 0.5);
  continueImageSprite.x = app.screen.width / 2;
  continueImageSprite.y = app.screen.height / 2.5;
  continueImageSprite.scale.set(0, 0);
  maskSprite.alpha = 0;
  finishContainer.addChild(maskSprite);
  finishContainer.addChild(continueImageSprite);
  app.stage.addChild(finishContainer);
  Ease.ease.add(
    maskSprite,
    {
      alpha: 1,
    },
    { duration: 1000, ease: "easeInOutExpo" }
  );
  Ease.ease.add(
    continueImageSprite,
    {
      scale: 1,
    },
    { duration: 1000, ease: "easeOutElastic" }
  );
}

Ease.ease.add(
  logoElement.sprite,
  {
    scale: 1,
  },
  { duration: 1500, ease: "easeInOutExpo" }
);

Ease.ease.add(
  hammerElement.sprite,
  {
    x: 1290,
    y: 200,
    scale: 1,
  },
  { wait: 500, duration: 1000, ease: "easeInOutQuart" }
);

class Animation {
  constructor(sprite) {
    this.logoIncreaseInterval = null;
    this.increaseInterval = null;
    this.decreaseInterval = null;
    this.sprite = sprite;
    this.sum = 1;
    this.delta = 0.001;
    this.reductionPoint = 1;
    this.zoomPoint = 1.2;
  }

  startButtonAnimation() {
    this.setIncreaseInterval();
  }

  setIncreaseInterval() {
    this.increaseInterval = setInterval(this.increase.bind(this), 10);
  }

  setDecreaseInterval() {
    this.decreaseInterval = setInterval(this.decrease.bind(this), 10);
  }

  increase() {
    if (Number(this.sum.toFixed(1)) === this.zoomPoint) {
      clearInterval(this.increaseInterval);
      this.setDecreaseInterval();
    }
    this.sum += this.delta;
    this.sprite.scale.set(this.sum, this.sum);
  }

  decrease() {
    if (Number(this.sum.toFixed(1)) === this.reductionPoint) {
      clearInterval(this.decreaseInterval);
      this.setIncreaseInterval();
    }
    this.sum -= this.delta;
    this.sprite.scale.set(this.sum, this.sum);
  }
}

new Animation(continueButtonElement.sprite).startButtonAnimation();
container.addChild(plantElement.sprite);

app.stage.addChild(container);
