"use strict";

const output = document.querySelector(".output-container");
const btnContainer = document.querySelector(".btn-container");
const btnEquals = document.querySelector(".btn-equals");

class App {
  #btnData;
  #args;
  #storage = [];
  #curOperation = "";
  #count = 0;

  #curNumber;
  #curNumOperand;
  #curOperand;

  constructor() {
    this._renderCalc();
    this._calcBtnClick();
  }

  // Create and display all button variables for calculator application
  _renderCalc() {
    output.innerHTML = 0;

    // prettier-ignore
    this.#args = ['AC', '+/-', '%', '√', '7', '8', '9', '/', '4', '5', '6', 'x', '1', '2', '3', '-', '0', '.', '+'];

    for (let i = 0; i < this.#args.length; i++) {
      btnContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="calc-btn" data-calc="${
          this.#args[i] === "x" ? "*" : this.#args[i]
        }">${this.#args[i]}</div>`
      );
    }

    // Apply different button width for "0"
    const btnZero = document.querySelector("[data-calc='0']");
    btnZero.style.width = "50%";
  }

  _calcBtnClick() {
    document
      .querySelectorAll(".calc-btn")
      .forEach((btnCalc) =>
        btnCalc.addEventListener("click", this._saveData.bind(this))
      );

    btnEquals.addEventListener("click", this._calculate.bind(this));
  }

  _saveData(btn) {
    this.#btnData = btn.currentTarget.dataset.calc;

    this._defineData(this.#btnData);
  }

  _defineData(curData) {
    if (curData === "AC") return this._clearData();

    if (curData === "%" || curData === "√") {
      this.#curNumOperand = curData;
    } else if (
      curData === "/" ||
      curData === "*" ||
      curData === "-" ||
      curData === "+"
    ) {
      this.#curOperand = curData;
    } else this.#curNumber = curData;

    this._storedData(curData);
    this._displayData(curData);
  }

  _storedData(defined) {
    if (this.#curNumber === defined) {
      this.#curOperation += defined;
    }

    if (
      this.#curNumOperand === defined &&
      !this.#curOperation.includes("%") &&
      !this.#curOperation.includes("√")
    ) {
      this.#curOperation = defined + this.#curOperation;
    }

    if (this.#curOperand === defined) {
      this.#storage.push(this.#curOperation);
      this.#curOperation = "";
    }

    console.log(this.#curOperation);
  }

  _clearData() {
    output.innerHTML = 0;
    this.#count = 0;
    this.#storage = [];
    this.#curOperation = "";
  }

  _calculate() {
    this.#storage.push(this.#curOperation);

    // this.#storage.map((str) => {
    //   if (str.includes("√")) {
    //     str = Math.sqrt(+str.slice(1, str.length));
    //   }

    //   if (str.includes("%")) {
    //     if (this.#storage.length === 2)
    //       str = (this.#storage[0] / 100) * str.slice(1, str.length);
    //     if (this.#count !== 0)
    //       str = (this.#count / 100) * str.slice(1, str.length);
    //   }

    //   return str;
    // });

    if (this.#curOperand === "+") {
      this.#count += this._abstract();
    }
    if (this.#curOperand === "-") {
      this.#count += this._subtract();
    }
    if (this.#curOperand === "*") {
      this.#count === 0
        ? (this.#count += this._multiply())
        : (this.#count *= this._abstract());
    }
    if (this.#curOperand === "/") {
      this.#count === 0
        ? (this.#count += this._divide())
        : (this.#count /= this._abstract());
    }

    this.#storage = [];
    this.#curOperation = "";

    output.innerHTML = this.#count;
  }

  _abstract() {
    return this.#storage.map((num) => +num).reduce((acc, curr) => acc + curr);
  }

  _subtract() {
    return this.#storage.map((num) => +num).reduce((acc, curr) => acc - curr);
  }

  _multiply() {
    return this.#storage.map((num) => +num).reduce((acc, curr) => acc * curr);
  }

  _divide() {
    return this.#storage.map((num) => +num).reduce((acc, curr) => acc / curr);
  }

  _displayData(defined) {
    // prettier-ignore
    if (output.innerHTML === '0' && defined !== ".") output.innerHTML = "";

    output.innerHTML = this.#curOperation;
  }
}

const app = new App();
