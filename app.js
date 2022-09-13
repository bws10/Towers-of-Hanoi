var d = 3;
var first = true;
var pause = true;
var endState = false;
var running = false;
var aniDuration = 150;
var opt = Math.pow(2, d) - 1;
var count = 0;
var move = [];
const diskNum = document.querySelector("#diskNum");
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
  if (running) {
    disks.forEach((disk) => {
      disk.stop();
      console.log("Stopping Animation");
      setTimeout(async () => {
        await moveToStart(disks);
        setTimeout(() => {
          resetRotation();
          running = false;
          console.log("Running = " + running);
        }, 1000);
      }, 500);
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
var diskColors = [
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
  "#107B99",
  "#5F92C0",
  "#c7509f",
];
redrawDisks();
function redrawDisks() {
  dh = 30;
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
      y: center.y + (center.height / 2 - dh / 2) - dh * l,
      depth: l + 1,
      num: i + 1,
      height: dh,
    });
  }
}

// Set up a tick function that will move all disks each frame

canvas.setLoop(function () {
  text.text = pause
    ? first
      ? "Click to Play"
      : "Click to return disks to starting position"
    : "";

  if (pause == true) canvas.timeline.stop();
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
  text.text = pause ? (first ? "Click to Play" : "Click to Replay") : "";
  canvas.redraw();

  //moveDisc(leftPost, rightPost);
}

function createDisk(options) {
  var disk = disksProto.clone({
    height: options.height,
    width: options.width,
    x: options.x,
    y: options.y,
    fill: diskColors[options.depth - 1],

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
  text: "Click to Play",
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
text.bind("click tap", async function () {
  console.log("Text clicked");
  if (d == 0) {
    text.text = "Please Set the number of disks first";
    canvas.redraw();
    return;
  }
  if (!pause) return;
  if (endState) {
    count = 0;
    textCounter.text = "Moves " + count;
    await moveToStart(disks);
    setTimeout(() => {
      resetRotation();
    }, 1000);
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
});

leftSelect.bind("click tap", async function () {
  if (move.length == 0 && leftPost.length == 1) {
    canvas.background.set("rgb(100,10,10)");
    setTimeout(() => {
      canvas.background.set("#222");
    }, 500);
    return;
  }
  move.push(leftPost);
  console.log(move);
  if (move.length == 2) {
    await moveDisc(move[0], move[1]);
    left.fill = "#fff";
    center.fill = "#fff";
    right.fill = "#fff";
    canvas.redraw();
    move = [];
  } else {
    left.fill = "green";
    canvas.redraw();
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
  console.log(move);
  if (move.length == 2) {
    await moveDisc(move[0], move[1]);
    left.fill = "#fff";
    center.fill = "#fff";
    right.fill = "#fff";
    canvas.redraw();
    move = [];
  } else {
    center.fill = "green";
    canvas.redraw();
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
  console.log(move);
  if (move.length == 2) {
    await moveDisc(move[0], move[1]);
    left.fill = "#fff";
    center.fill = "#fff";
    right.fill = "#fff";
    canvas.redraw();
    move = [];
  } else {
    right.fill = "green";
    canvas.redraw();
  }
});

function moveToStart(d) {
  d.forEach((disc, index) => {
    disc.animate(
      {
        x: left.x,
        y: center.y + (center.height / 2 - dh / 2) - dh * index,
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
                    duration: aniDuration,
                    easing: "ease-in-out-quad",
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
    count = count + 1;
    textCounter.text = "Moves " + count;
    t.push(s.pop());
  }
  if (rightPost.length == d + 1) {
    pause = true;
    endState = true;
    running = false;
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
