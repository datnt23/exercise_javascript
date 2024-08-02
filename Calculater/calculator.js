class Calculator {
  constructor() {
    this.table = document.getElementById("idTable");
    this.numbers = "";
    this.arrays = [];
    this.text = document.getElementById("idNum");
    this.sum = 0;
    this.init();
  }
  init() {
    data.forEach((eData) => {
      const divButton = document.createElement("div");
      divButton.setAttribute("class", "flex_div");
      eData.forEach((eButton) => {
        let button = document.createElement("button");
        let div = document.createElement("div");
        if (eButton.nameValue === "0") {
          div.innerHTML = eButton.nameLabel;
          button.setAttribute("class", "button_0");
          div.setAttribute("class", "text_0");
          button.setAttribute(
            "style",
            `flex-grow: ${eButton.flex_grow};
            color: ${eButton.color} ; 
            background-color: ${eButton.background};`
          );
          button.setAttribute("id", eButton.nameValue);
        } else {
          div.innerHTML = eButton.nameLabel;
          div.setAttribute("class", "text");
          button.setAttribute("class", "button");
          button.setAttribute(
            "style",
            `flex-grow: ${eButton.flex_grow};
            color: ${eButton.color} ; 
            background-color: ${eButton.background};`
          );
          button.setAttribute("id", eButton.nameValue);
        }
        button.appendChild(div);
        divButton.appendChild(button);
        button.addEventListener("click", this.view.bind(this, button));
      });
      this.table.appendChild(divButton);
    });
  }
  setDefault() {
    this.arrays = [];
    this.numbers = "";
    this.text.innerHTML = "";
    this.sum = 0;
  }
  stringNumber(strNum) {
    if (!isNaN(strNum)) {
      if (this.numbers === "0") {
        this.numbers = this.numbers.substring(1);
      }
      this.numbers += strNum;
    } else if (strNum === "dot" && this.numbers === "") {
      this.numbers += "0.";
    } else if (strNum === "dot" && !this.numbers.includes(".")) {
      this.numbers += ".";
    } else if (
      (strNum === "plus/minus" && this.numbers === "") ||
      (this.numbers === "0" && strNum === "plus/minus")
    ) {
      this.numbers = "-";
    } else if (strNum === "plus/minus" && this.numbers !== "") {
      this.numbers = "-" + this.numbers;
    }
    this.text.innerHTML = this.numbers;
  }
  stringOperation(id_button) {
    if (!this.arrays[0]) {
      this.arrays.push(this.numbers);
      this.numbers = "";
      this.arrays.push(id_button);
    } else if (this.arrays[0] && this.numbers === "") {
      this.arrays.push(id_button);
    } else if (this.arrays[0] && this.arrays[1]) {
      this.arrays.push(this.numbers);
      this.numbers = "";
      this.operation(id_button);
      this.arrays.push(id_button);
    } else if (this.arrays[0]) {
      this.arrays.shift();
      this.arrays.push(this.numbers);
      this.numbers = "";
      this.arrays.push(id_button);
    }
  }
  function_operation() {
    for (let i = this.arrays.length; i >= 0; i--) {
      if (this.arrays[i] === "plus") {
        this.sum =
          parseFloat(this.arrays[0]) +
          parseFloat(this.arrays[this.arrays.length - 1]);
        break;
      }
      if (this.arrays[i] === "minus") {
        this.sum =
          parseFloat(this.arrays[0]) -
          parseFloat(this.arrays[this.arrays.length - 1]);
        if (isNaN(this.sum)) {
          console.log(alert("Invalid format used!"));
          this.sum = 0;
        }
        break;
      }
      if (this.arrays[i] === "multiply") {
        this.sum =
          parseFloat(this.arrays[0]) *
          parseFloat(this.arrays[this.arrays.length - 1]);
        break;
      }
      if (this.arrays[i] === "divide") {
        this.sum =
          parseFloat(this.arrays[0]) /
          parseFloat(this.arrays[this.arrays.length - 1]);
        if (this.sum % 2 === 0) {
          this.sum = parseInt(this.sum);
        } else if (this.sum.toString().length > 6) {
          this.sum = this.sum.toFixed(4);
        } else if (isNaN(this.sum)) {
          console.log(alert("Invalid format used!"));
          this.sum = 0;
        } else {
          this.sum = this.sum;
        }
        break;
      }
      if (this.arrays[i] === "percent" && this.arrays[this.arrays.length - 1]) {
        this.sum =
          (parseFloat(this.arrays[0]) / 100) *
          parseFloat(this.arrays[this.arrays.length - 1]);
        break;
      } else if (this.arrays[i] === "percent") {
        this.sum = parseFloat(this.arrays[0]) / 100;
        break;
      } else {
        this.sum = this.arrays[this.arrays.length - 1];
      }
    }
  }
  operation(btn_id) {
    if (btn_id === "equal") {
      this.function_operation();
      this.arrays = [this.sum];
    } else {
      this.function_operation();
      this.arrays = [this.sum];
    }
    this.text.innerHTML = this.sum;
  }
  view(buttonId) {
    switch (buttonId.id) {
      case "delete":
        this.setDefault();
        break;
      case "plus/minus":
        this.stringNumber(buttonId.id);
        break;
      case "percent":
      case "divide":
      case "multiply":
      case "minus":
      case "plus":
        this.stringOperation(buttonId.id);
        break;
      case "equal":
        this.arrays.push(this.numbers);
        this.numbers = "";
        console.log(this.arrays);
        this.operation(buttonId.id);
        break;
      default:
        this.stringNumber(buttonId.id);
        break;
    }
  }
}
var calculator = new Calculator();
