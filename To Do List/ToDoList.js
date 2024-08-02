class ToDoList {
  constructor() {
    this.arrayToDoList = [];
    this.arrCount = [];
    this.app = document.getElementById("app");
    this.DivAdd = document.createElement("div");
    this.DivUl = document.createElement("div");
    this.br = document.createElement("br");
    this.h1 = document.createElement("h1");
    this.h1.innerHTML = "To Do Something:";
    this.inputAdd = document.createElement("input");
    this.timeDone = document.createElement("input");
    this.btnAdd = document.createElement("button");
    this.btnDelAllCheck = document.createElement("button");
    this.btnDeleteAll = document.createElement("button");
    this.inputSumTimerToDoList = document.createElement("span");
    this.resultTotalText = document.createElement("span");
    this.resultTotalText.innerHTML = "Result Total:";
    this.arrSum = [];
    this.setInit();
  }
  setInit() {
    this.app.appendChild(this.h1);
    this.app.appendChild(this.br);
    this.app.appendChild(this.DivAdd);
    this.app.appendChild(this.DivUl);
    this.app.appendChild(this.resultTotalText);
    this.app.appendChild(this.inputSumTimerToDoList);
    this.setDivInit();
    this.loadDataToDoList();
  }
  setDivInit() {
    this.inputAdd.setAttribute("type", "text");
    this.timeDone.setAttribute("type", "datetime-local");
    this.inputAdd.placeholder = "To do...";
    this.btnAdd.innerHTML = "Add To Do";
    this.btnDelAllCheck.innerHTML = "Delete Check All";
    this.btnDeleteAll.innerHTML = "Delete All";
    this.DivAdd.appendChild(this.inputAdd);
    this.DivAdd.appendChild(this.timeDone);
    this.DivAdd.appendChild(this.btnAdd);
    this.DivAdd.appendChild(this.btnDelAllCheck);
    this.DivAdd.appendChild(this.btnDeleteAll);
    this.btnAddData(this.btnAdd, this.inputAdd, this.timeDone);
    this.delAllChecked(this.btnDelAllCheck);
    this.deleteAll(this.btnDeleteAll);
  }
  loadDataToDoList() {
    this.arrSum = [];
    let arrayLocalStorage = JSON.parse(localStorage.getItem("arrayToDoList"));
    let _thisClass = this;
    _thisClass.arrayToDoList = [];
    _thisClass.inputSumTimerToDoList.innerHTML = 0;
    if (arrayLocalStorage) {
      _thisClass.arrayToDoList = arrayLocalStorage;
      arrayLocalStorage.forEach(function (key) {
        let arrTemp = [];
        arrTemp.push(key);
        _thisClass.createToDo(_thisClass.DivUl, arrTemp);
      });
    }
  }
  removeAll() {
    while (this.DivUl.hasChildNodes()) {
      this.DivUl.removeChild(this.DivUl.firstChild);
    }
  }
  deleteAll(btnDelAll) {
    let _thisClass = this;
    btnDelAll.addEventListener("click", function () {
      let arrayToDoList = JSON.parse(localStorage.getItem("arrayToDoList"));
      arrayToDoList.forEach((ele, index) => {
        document.getElementById(ele.id).parentElement.remove();
        // delete ele[index];
      });
      // for (let i = 0; i < arrayToDoList.length; i++) {
      //   delete arrayToDoList[i];
      // }
      // arrayToDoList = arrayToDoList.filter(function (del) {
      //   return del !== undefined;
      // });
      _thisClass.inputSumTimerToDoList.innerHTML = 0;
      arrayToDoList = [];
      localStorage.setItem("arrayToDoList", JSON.stringify(arrayToDoList));
      _thisClass.loadDataToDoList();
    });
  }
  delAllChecked(btnDelAllCheck) {
    let _thisClass = this;
    btnDelAllCheck.addEventListener("click", function () {
      let arrayToDoList = JSON.parse(localStorage.getItem("arrayToDoList"));
      for (let i = 0; i < arrayToDoList.length; i++) {
        for (let j = 0; j < _thisClass.arrCount.length; j++) {
          if (_thisClass.arrCount[j] === arrayToDoList[i].id) {
            document.getElementById(arrayToDoList[i].id).parentElement.remove();
            delete arrayToDoList[i]; // Xóa Object trong array trả lại data là undefined
            break; //Dừng để không bị lỗi undefined data ở arrayToDoList[i].id
          }
        }
      }
      arrayToDoList = arrayToDoList.filter(function (del) {
        return del !== undefined;
      });
      localStorage.setItem("arrayToDoList", JSON.stringify(arrayToDoList));
      _thisClass.removeAll(_thisClass.DivUl);
      _thisClass.loadDataToDoList();
    });
  }
  checkToDone(checkToDo, txtToDo, dateToDo, timeDoneToDo, timerToDo) {
    let _thisClass = this;
    checkToDo.addEventListener("change", function () {
      if (this.checked) {
        txtToDo.style.visibility = "hidden";
        dateToDo.style.visibility = "hidden";
        timeDoneToDo.style.visibility = "hidden";
        timerToDo.style.visibility = "hidden";
        let checkedToDo = parseInt(this.id);
        _thisClass.arrCount.push(checkedToDo);
      } else {
        txtToDo.style.visibility = "visible";
        dateToDo.style.visibility = "visible";
        timeDoneToDo.style.visibility = "visible";
        timerToDo.style.visibility = "visible";
      }
    });
  }
  deleteToDo(delObjButton) {
    let _thisClass = this;
    delObjButton.addEventListener("click", function () {
      let arrDelToDo = JSON.parse(localStorage.getItem("arrayToDoList"));
      _thisClass.arrayToDoList.filter((e) => {
        if (e.id !== this.id) {
          this.parentElement.remove();
        }
      });
      if (arrDelToDo) {
        arrDelToDo = arrDelToDo.filter((e) => {
          return e.id !== parseInt(this.id);
        });
        localStorage.setItem("arrayToDoList", JSON.stringify(arrDelToDo));
      }
      _thisClass.removeAll(_thisClass.DivUl);
      _thisClass.loadDataToDoList();
    });
  }
  btnAddData(btnAddData, inputAddData, timeDoneData) {
    let _thisClass = this;
    btnAddData.addEventListener("click", function () {
      if (inputAddData.value === "") return alert("Enter your to do!!!");
      let dateDone = new Date(timeDoneData.value).getTime();
      let dateNow = new Date().getTime();
      if (timeDoneData.value === "" || dateDone < dateNow)
        return alert("You should be choice your time!!!");
      _thisClass.arrayToDoList = [];
      let arrLocal = JSON.parse(localStorage.getItem("arrayToDoList"));
      let obj = {
        id: Math.floor(Math.random() * 100),
        check: false,
        txtToDo: inputAddData.value,
        date: new Date(),
        timeDone: timeDoneData.value,
      };
      if (arrLocal) {
        _thisClass.arrayToDoList = arrLocal;
      }
      _thisClass.arrayToDoList.push(obj);
      inputAddData.value = "";
      timeDoneData.value = "";
      localStorage.setItem(
        "arrayToDoList",
        JSON.stringify(_thisClass.arrayToDoList)
      );
      _thisClass.removeAll(_thisClass.DivUl);
      _thisClass.loadDataToDoList();
    });
  }
  pullTimer(timerDone, eTimer, eLi) {
    let timer = setInterval(function () {
      let now = new Date().getTime();
      let countDown = timerDone - now;
      let days = Math.floor(countDown / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((countDown % (1000 * 60)) / 1000);
      // console.log(days + "d " + hours + "h " + minutes + "m " + seconds + "s");
      eTimer.innerHTML =
        countDown < 0
          ? "Timeout!"
          : days + "d " + hours + "h " + minutes + "m " + seconds + "s";
      eLi.appendChild(eTimer);
      if (countDown < 0) {
        clearInterval(timer);
      }
    }, 1000);
  }
  sumTimer(timerNow, timerDone) {
    let sub = timerDone - timerNow;
    this.arrSum.push(sub);
    let sum = 0;
    for (let i = 0; i < this.arrSum.length; i++) {
      sum += this.arrSum[i];
    }
    let days = Math.floor(sum / (1000 * 60 * 60 * 24));
    let hours = Math.floor((sum % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((sum % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((sum % (1000 * 60)) / 1000);
    this.inputSumTimerToDoList.innerHTML =
      days + "d " + hours + "h " + minutes + "m " + seconds + "s";
  }
  createToDo(divUl, arr) {
    let ul = document.createElement("ul");
    ul.setAttribute("id", "idUL");
    let _thisClass = this;
    arr.forEach(function (element) {
      let li = document.createElement("li");
      let checkBoxToDo = document.createElement("input");
      let txtToDoList = document.createElement("input");
      let dateList = document.createElement("input");
      let timeToDone = document.createElement("input");
      let btnDel = document.createElement("button");
      let timer = document.createElement("span");
      //set attribute
      btnDel.innerHTML = "Delete";
      checkBoxToDo.setAttribute("type", "checkbox");
      txtToDoList.setAttribute("type", "text");
      dateList.setAttribute("type", "text");
      timeToDone.setAttribute("type", "text");
      // timer.setAttribute("type", "text");

      //set id to check obj in array
      checkBoxToDo.setAttribute("id", element.id);
      btnDel.setAttribute("id", element.id);
      //Timer
      let setTimeDone = new Date(element.timeDone).getTime();
      _thisClass.pullTimer(setTimeDone, timer, li);
      //Sum timer
      let timeNow = new Date(element.date).getTime();
      _thisClass.sumTimer(timeNow, setTimeDone);
      //add variable
      checkBoxToDo.value = element.check;
      txtToDoList.value = element.txtToDo;
      dateList.value = new Date(element.date).toLocaleString();
      timeToDone.value = new Date(element.timeDone).toLocaleString();
      //add to <li>
      li.appendChild(checkBoxToDo);
      li.appendChild(txtToDoList);
      li.appendChild(dateList);
      li.appendChild(timeToDone);
      li.appendChild(btnDel);
      //add <li> to <ulListToDo>
      ul.appendChild(li);
      _thisClass.deleteToDo(btnDel);
      _thisClass.checkToDone(
        checkBoxToDo,
        txtToDoList,
        dateList,
        timeToDone,
        timer
      );
    });
    divUl.appendChild(ul);
  }
}
var toDoList = new ToDoList();
