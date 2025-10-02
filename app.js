const calc_buttons = [];
var calc_buffer = "";

for (let i = 0; i <= 9; i++) {
  calc_buttons[i] = document.getElementById(`calc-btn-${i}`);
}

const display = document.getElementById("calc-display");
const btn_ac = document.getElementById("calc-btn-ac");
const btn_del = document.getElementById("calc-btn-del");
const btn_add = document.getElementById("calc-btn-add");
const btn_sub = document.getElementById("calc-btn-sub");
const btn_mult = document.getElementById("calc-btn-mult");
const btn_div = document.getElementById("calc-btn-div");
const btn_eq = document.getElementById("calc-btn-eq");

function makeSureTextNotEmpty() {
  if (calc_buffer === "") calc_buffer = "0";
}

/* Synchronise buffer to display */
function updateDisplay(no_text_empty = true) {
  if (no_text_empty) makeSureTextNotEmpty();
  display.innerText = calc_buffer;
}

function setBufferNoUpdate(new_buffer) {
  calc_buffer = new_buffer;
}

function setBufferAndUpdate(new_buffer, no_text_empty = true) {
  setBufferNoUpdate(new_buffer);
  updateDisplay(no_text_empty);

  /* Scroll to right by 200 pixels (? not too sure if its pixels or not) */
  const scrollDistance = 200;
  display.scrollBy({
    left: scrollDistance,
    behavior: "smooth",
  });
}

function appendBufferAndUpdate(to_append) {
  if (calc_buffer === "0") {
    setBufferNoUpdate("", false);
  }

  setBufferAndUpdate(calc_buffer + to_append);
}

/* Operations */
btn_add.onclick = () => {
  appendBufferAndUpdate("+"); /* Addition */
};
btn_sub.onclick = () => {
  appendBufferAndUpdate("-"); /* Subtract */
};
btn_mult.onclick = () => {
  appendBufferAndUpdate("*"); /*Multiply */
};
btn_div.onclick = () => {
  appendBufferAndUpdate("/"); /*Divide */
};
btn_ac.onclick = () => {
  setBufferAndUpdate("0"); /*All clear */
};
btn_del.onclick = () => {
  setBufferAndUpdate(calc_buffer.substring(0, display.innerText.length - 1));
};
btn_eq.onclick = () => {
  try {
    display.innerText = evaluateSimpleMathExpression(calc_buffer);
  } catch (err) {
    display.innerText = err;
  }
  setBufferNoUpdate("", false);
};
calc_buttons.forEach((btn) => {
  btn.onclick = () => {
    appendBufferAndUpdate(btn.innerText);
  };
});
