const userName = {
  name: "Konstantin",
};

function information(phone, email) {
  console.log(`Name: ${this.name}, Tel: ${phone}, Email: ${email}`);
}

// Demonstration bind Methood
// information.bind(userName)("+38063......", "g@mail.com");
// information.bind(userName, "+38063......")("g@mail.com");
// information.bind(userName, "+38063......", "g@mail.com")();

// 1 First

function bindRealization(fn, conText, ...rest) {
  return function (...args) {
    // return fn.apply(conText, rest.concat(args));  //in two ways
    return fn.call(conText, ...rest.concat(args));
  };
}

bindRealization(information, userName)("+38063......", "g@mail.com");
bindRealization(information, userName, "+38063......")("g@mail.com");
bindRealization(information, userName, "+38063......", "g@mail.com")();

// 2 Second without methood

function bindRealization2(fn, conText, ...rest) {
  return function (...args) {
    const uniqId = Date.now().toString() + Math.random();

    conText[uniqId] = fn;

    const result = conText[uniqId](...rest.concat(args));

    delete conText[uniqId];

    return result;
  };
}

bindRealization2(information, userName)("+38063......", "g@mail.com");
bindRealization2(information, userName, "+38063......")("g@mail.com");
bindRealization2(information, userName, "+38063......", "g@mail.com")();

// 3 Third ES5

function bindRealization3(fn, conText) {
  const rest = Array.prototype.slice.call(arguments, 2);
  return function () {
    const args = Array.prototype.slice.call(arguments);
    return fn.apply(conText, rest.concat(args));
  };
}

bindRealization3(information, userName)("+38063......", "g@mail.com");
bindRealization3(information, userName, "+38063......")("g@mail.com");
bindRealization3(information, userName, "+38063......", "g@mail.com")();

// 4 Four
function bindRealization4(fn, conText, ...rest) {
  return fn.bind(conText, ...rest);
}

bindRealization4(information, userName)("+38063......", "g@mail.com");
bindRealization4(information, userName, "+38063......")("g@mail.com");
bindRealization4(information, userName, "+38063......", "g@mail.com")();

// Call

function callRealize(fn, conText, ...args) {
  const uniqId = Date.now().toString() + Math.random();

  conText[uniqId] = fn;

  const result = conText[uniqId](...args);

  delete conText[uniqId];

  return result;
}

callRealize(information, userName, "+99365", "yahoo@com");

// Apply

function applyRealize(fn, conText, args) {
  const uniqId = Date.now().toString() + Math.random();

  conText[uniqId] = fn;

  const result = conText[uniqId](...args);

  delete conText[uniqId];

  return result;
}

applyRealize(information, userName, ["+37529", "yahoo@com"]);
