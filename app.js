var d = 0;
var first = true;
var pause = true;
var endState = false;
var running = false;
var aniDuration = 120;
var opt = Math.pow(2, d) - 1;
var count = 0;
var move = [];
var dropHeight = 150;
var dropping = false;
var restartDelay = 300;
const diskNum = document.querySelector("#diskNum");
const error = document.querySelector("#error");
const undoBut = document.querySelector("#undoButt");
const canv = document.querySelector("#canvas");
const ctx = canv.getContext("2d");
diskNum.value = d;
var canvas = oCanvas.create({
  canvas: "#canvas",
  background: "#222",
  fps: 60,
  zindex: "back",
});
canvas.height = 500;
canvas.width = window.innerWidth < 500 ? window.innerWidth : 700;
var dw = (canvas.width - 44) / 3 - 2;
var dwMin = 60;
var wp = 20;
var dh = 30;
var w = canvas.width - 40;
var disks = [];
async function submitDisks() {
  dropping = true;
  n = parseInt(diskNum.value);
  numBool = isNaN(n);
  if (numBool || n < 1 || n > 9) {
    error.innerHTML =
      "Number of disks must be a number greater than 0 and less than 10";
    return;
  } else {
    error.innerHTML = "";
  }
  if (running) {
    count = 0;
    textCounter.text = "Moves " + count;
    canvas.redraw();
    disks.forEach((disk) => {
      disk.stop();
      console.log("Stopping Animation");
      setTimeout(async () => {
        await moveToStart(disks);
        await setTimeout(() => {
          resetRotation();
          running = false;
          endState = false;
          console.log("Running = " + running);
        }, 700);
      }, restartDelay);
    });
  } else {
    resetRotation();
  }
  return false;
}
var bottomLayer = canvas.display
  .rectangle({
    fill: "transparent",
    origin: { x: "left", y: "top" },
    x: 0,
    y: 0,
    height: canvas.height,
    width: canvas.width,
    zindex: 1,
  })
  .add();

var diskLayer = canvas.display
  .rectangle({
    fill: "transparent",
    x: 0,
    y: 0,
    origin: { x: "left", y: "top" },
    height: canvas.height,
    width: canvas.width,
    zindex: 2,
  })
  .add();

// Center post
var center = canvas.display.rectangle({
  x: canvas.width / 2,

  height: canvas.height / 1.75,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  origin: { x: "center", y: "center" },
  width: wp,
  fill: "#fff",
  zindex: "front",
});
bottomLayer.addChild(center);
center.y = canvas.height - center.height / 2 - 100;

//center base
var centerBase = canvas.display.rectangle({
  x: canvas.width / 2 - w / 2,
  y: canvas.height - 100,
  height: wp,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,

  width: w,
  fill: "#fff",
});
bottomLayer.addChild(centerBase);

// left post
var left = center.clone({
  x: (canvas.width / 6) * 1,
});
bottomLayer.addChild(left);

// right post
var right = center.clone({
  x: (canvas.width / 6) * 5,
});
bottomLayer.addChild(right);

var controlLayer = canvas.display
  .rectangle({
    fill: "transparent",
    zindex: "front",
    origin: { x: "left", y: "top" },
    x: 0,
    y: 0,
    height: canvas.height,
    width: canvas.width,
    //stroke: "2px blue",
  })
  .add();
var leftSelect = canvas.display.rectangle({
  origin: { x: "center", y: "center" },
  x: left.x,
  y: left.y,
  height: left.height,
  width: canvas.width / 3,
  fill: "transparent",
  //stroke: "2px blue",
});
controlLayer.addChild(leftSelect);

var centerSelect = canvas.display.rectangle({
  origin: { x: "center", y: "center" },
  x: center.x,
  y: center.y,
  height: center.height,
  width: canvas.width / 3,
  fill: "transparent",
  //stroke: "2px blue",
});
controlLayer.addChild(centerSelect);
var rightSelect = canvas.display.rectangle({
  origin: { x: "center", y: "center" },
  x: right.x,
  y: right.y,
  height: right.height,
  width: canvas.width / 3,
  fill: "transparent",
  //stroke: "2px blue",
});
controlLayer.addChild(rightSelect);

var disksProto = canvas.display.rectangle({
  fill: "#107B99",
  borderRadius: 10,
  origin: { x: "center", y: "center" },
  // width: dw,
  // x: left.x - dw / 2 + wp / 2,
  // y: canvas.height / 2 - canvas.height / 4 + center.height - wp
});
var numberProto = canvas.display.text({
  origin: { x: "center", y: "center" },
  fill: "#fff",
  size: 25,
  weight: "bold",
});

var leftPost = [{ name: "left", post: left }];
var centerPost = [{ name: "center", post: center }];
var rightPost = [{ name: "right", post: right }];
depth = d;
var diskColors = ["#61c05f", "#5f92c0", "#bd5fc0", "#c08d5f"];
redrawDisks();
function redrawDisks() {
  dh = 35;
  disks = [];
  leftPost = [{ name: "left", post: left }];
  centerPost = [{ name: "center", post: center }];
  rightPost = [{ name: "right", post: right }];
  if (d * dh > center.height - 7) {
    dh = (center.height - 7) / d;
  }
  for (i = d - 1, j = d, l = 0; i >= 0; i--, l++) {
    createDisk({
      width: dwMin + ((dw - dwMin) / j) * i,
      x: left.x,
      y:
        center.y +
        (center.height / 2 - dh / 2) -
        dh * l -
        (center.height + dropHeight),
      depth: l + 1,
      num: i + 1,
      height: dh,
    });
  }
  setTimeout(async () => {
    if (d != 0) {
      await cascade(disks, 175);
    }
  }, restartDelay);
}

function cascade(item, delay, i = 0) {
  text.text = "";

  if (i > item.length - 1) {
    setTimeout(() => {
      text.text = "Click to Play";
      canvas.redraw();
      dropping = false;
    }, 1300);
    return;
  }
  item[i].animate(
    {
      x: left.x,
      y: center.y + (center.height / 2 - dh / 2) - dh * i,
    },
    {
      duration: "short",
      easing: "ease-out-bounce",
      queue: "drop",
      callback: function () {},
    }
  );
  setTimeout(() => {
    i++;
    cascade(item, delay, i);
  }, delay);
}

// Set up a tick function that will move all disks each frame

canvas.setLoop(function () {
  if (pause == true) canvas.timeline.stop();
  if (!pause || dropping) text.text = "";
  if (pause && !running && !dropping) text.text = "Click to Play";
  if (endState) text.text = "Click to return disks to starting position";
});

function resetRotation() {
  // for (var i = 0, l = disks.length; i < l; i++) {}
  //   disks[i].rotation = 0;
  // }
  // canvas.redraw()
  let di = disks.length;
  pause = true;
  // console.log("old - " + di);
  if (diskNum.value >= 0) {
    for (let i = 0; i < di; i++) {
      disks[i].remove();
    }
    disks = [];
  }
  count = 0;
  textCounter.text = "Moves " + count;
  first = true;
  if (d == diskNum.value) first = false;
  canvas.redraw();
  d = parseInt(diskNum.value);
  opt = Math.pow(2, d) - 1;
  textOptimum.text = "Optimum Moves " + opt;
  redrawDisks();
  text.text = pause && !dropping ? "Click to Play" : "";
  canvas.redraw();

  //moveDisc(leftPost, rightPost);
}

function createDisk(options) {
  let n = Math.floor((options.depth - 1) % diskColors.length);
  var disk = disksProto.clone({
    height: options.height,
    width: options.width,
    x: options.x,
    y: options.y,
    fill: diskColors[n],

    speed: 2,
  });
  var num = numberProto.clone({
    x: 0,
    y: 0,
    text: options.num,
    size: dh - 6 > 25 ? 25 : dh - 6,
  });
  diskLayer.addChild(disk);
  disk.addChild(num);
  disks.push(disk);
  leftPost.push(disk);
}
// Set up play/pause control for the demo
var text = canvas.display.text({
  x: canvas.width / 2,
  y: 85,
  origin: { x: "center", y: "center" },
  fill: "#fff",
  size: 25,
  weight: "bold",
  text: "",
});
controlLayer.addChild(text);
var textCounter = canvas.display.text({
  x: canvas.width / 2,
  y: 50,
  origin: { x: "center", y: "center" },
  fill: "#fff",
  size: 40,
  weight: "bold",
  text: "Moves " + 0,
});
bottomLayer.addChild(textCounter);
var textOptimum = canvas.display.text({
  x: 20,
  y: canvas.height - 50,
  origin: { x: "left", y: "center" },
  fill: "#fff",
  size: 40,
  weight: "bold",
  text: "Optimum Moves " + opt,
});
bottomLayer.addChild(textOptimum);

var undoIcon = canvas.display.text({
  x: canvas.width - 55,
  y: 10,
  font: "32px FontAwesome",
  fill: "#FFFFFF",
  text: "\uf2ea",
});
controlLayer.addChild(undoIcon);

text.bind("click tap", () => {
  textClick();
});

async function textClick() {
  if (dropping) return;
  console.log("Text clicked");
  if (d == 0) {
    text.text = "Please Set the number of disks first";
    canvas.redraw();
    return;
  }
  if (!pause) return;
  if (endState) {
    text.text = "";
    canvas.redraw();
    count = 0;
    textCounter.text = "Moves " + count;
    await moveToStart(disks);
    dropping = true;
    canvas.timeline.stop();
    setTimeout(() => {
      resetRotation();
    }, 500);
    running = false;
    endState = false;
  } else {
    pause = false;
    canvas.redraw();

    canvas.timeline.start();
    hanoi(disks.length, leftPost, rightPost, centerPost);
    running = true;
    console.log("running = " + running);
    first = false;
  }
}
var undo = [];
leftSelect.bind("click tap", async function () {
  if (pause) {
    pause = false;
    running = true;
    canvas.timeline.start();
  }
  if (move.length == 0 && leftPost.length == 1) {
    canvas.background.set("rgb(100,10,10)");
    setTimeout(() => {
      canvas.background.set("#222");
    }, 500);
    return;
  }
  move.push(leftPost);
  //  console.log(move);
  if (move.length == 2) {
    left.fill = "green";
    canvas.redraw();
    await moveDisc(move[0], move[1]);
    left.fill = "#fff";
    center.fill = "#fff";
    right.fill = "#fff";
    canvas.redraw();
    undo = move;
    move = [];
  } else {
    left.fill = "blue";
    canvas.redraw();
    undo = move;
  }
});

centerSelect.bind("click tap", async function () {
  if (move.length == 0 && centerPost.length == 1) {
    canvas.background.set("rgb(100,10,10)");
    setTimeout(() => {
      canvas.background.set("#222");
    }, 500);
    return;
  }
  move.push(centerPost);
  //  console.log(move);
  if (move.length == 2) {
    center.fill = "green";
    canvas.redraw();
    await moveDisc(move[0], move[1]);
    left.fill = "#fff";
    center.fill = "#fff";
    right.fill = "#fff";
    canvas.redraw();
    undo = move;
    move = [];
  } else {
    center.fill = "blue";
    canvas.redraw();
    undo = move;
  }
});

rightSelect.bind("click tap", async function () {
  if (move.length == 0 && rightPost.length == 1) {
    canvas.background.set("rgb(100,10,10)");
    setTimeout(() => {
      canvas.background.set("#222");
    }, 500);
    return;
  }
  move.push(rightPost);
  //  console.log(move);
  if (move.length == 2) {
    right.fill = "green";
    canvas.redraw();
    await moveDisc(move[0], move[1]);
    left.fill = "#fff";
    center.fill = "#fff";
    right.fill = "#fff";
    canvas.redraw();
    undo = move;
    move = [];
  } else {
    right.fill = "blue";
    canvas.redraw();
    undo = move;
  }
});
function undoButton() {
  undoBut.disabled = true;
  undoFunc(undo);
}
async function undoFunc(u) {
  console.log("Undo button pressed");
  //console.log("Undo length = " + u.length);
  //console.log(u);
  if (u.length == 0) {
    undoBut.disabled = false;
    return;
  }

  if (u.length == 1) {
    left.fill = "#fff";
    center.fill = "#fff";
    right.fill = "#fff";
    canvas.redraw();
    undo = [];
    move = [];
    undoBut.disabled = false;
  } else {
    move = [];
    await moveDisc(u[1], u[0]);

    left.fill = "#fff";
    center.fill = "#fff";
    right.fill = "#fff";
    canvas.redraw();
    undo = [];
    undoBut.disabled = false;
  }
}

function moveToStart(d) {
  left.fill = "#fff";
  center.fill = "#fff";
  right.fill = "#fff";
  canvas.redraw();
  move = [];
  d.forEach((disc, index) => {
    disc.animate(
      {
        x: left.x,
        y:
          center.y +
          (center.height / 2 - dh / 2) -
          dh * index -
          (center.height + dropHeight),
      },
      {
        duration: "short",
        easing: "ease-in-out-quad",
        callback: function () {},
      }
    );
  });
}
async function moveDisc(s, t) {
  if (s == t) return;
  if (s[s.length - 1].id < t[t.length - 1].id) {
    canvas.background.set("rgb(100,10,10)");
    setTimeout(() => {
      canvas.background.set("#222");
    }, 500);
    return;
  }
  let res = new Promise(function (resolve) {
    s[s.length - 1].animate(
      {
        y: center.y - center.height / 2 - 100,
      },
      {
        duration: aniDuration,
        easing: "ease-in-out-quad",
        callback: function () {
          s[s.length - 1].animate(
            {
              x: t[0].post.x,
            },
            {
              duration: aniDuration,
              easing: "ease-in-out-quad",
              callback: function () {
                s[s.length - 1].animate(
                  {
                    y:
                      center.y +
                      center.height / 2 -
                      dh / 2 -
                      dh * (t.length - 1),
                  },
                  {
                    duration: "short",
                    easing: "ease-out-bounce",
                    callback: function () {
                      //canvas.redraw();
                      resolve();
                    },
                  }
                );
              },
            }
          );
        },
      }
    );
  });
  await res;
  if (pause && move.length == 0) {
    resetRotation();
    return;
  }
  if (!pause || move.length == 2) {
    if (!move.length == 0) {
      count = count + 1;
      textCounter.text = "Moves " + count;
      t.push(s.pop());
    }
  }
  if (move.length == 0 && undo.length == 2) {
    //  console.log("move undone");
    //console.log("Old Count = " + count)
    count = count - 1;
    //  console.log("New Count " + count)
    textCounter.text = "Moves " + count;
    canvas.redraw();
    t.push(s.pop());
  }
  if (rightPost.length == d + 1) {
    pause = true;
    endState = true;
  }
}

async function hanoi(n, start, target, spare) {
  if (pause) {
    resetRotation();
    return;
  }
  if (n == 1) {
    await moveDisc(start, target);
  } else {
    await hanoi(n - 1, start, spare, target);
    await moveDisc(start, target);
    await hanoi(n - 1, spare, target, start);
  }
}
