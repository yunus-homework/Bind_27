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

// 1 First easy.

function bindRealization(fn, conText, ...rest) {
  return fn.bind(conText, ...rest);
}

bindRealization(information, userName)("+38063......", "g@mail.com");
bindRealization(information, userName, "+38063......")("g@mail.com");
bindRealization(information, userName, "+38063......", "g@mail.com")();

// 2 Second

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
