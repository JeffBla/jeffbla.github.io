// enter animation
let hero = document.querySelector(".hero");
let slide = document.querySelector(".slide");
let animation = document.querySelector("section.animation-wrapper");

const time_line = new TimelineMax();

time_line
  .fromTo(hero, 1, { height: "0%" }, { height: "100%", ease: Power2.easeInOut })
  .fromTo(
    hero,
    1.2,
    { width: "80%" },
    { width: "100%", ease: Power2.easeInOut }
  )
  .fromTo(
    slide,
    1,
    { x: "-100%" },
    { x: "0%", ease: Power2.easeInOut },
    "-=1.2"
  )
  .fromTo(animation, 0.3, { opacity: 1 }, { opacity: 0 });

setTimeout(() => {
  animation.style.pointerEvents = "none";
}, 2500);

// form expansion
const initFormNum = 3;
const formInputNum = 3;
const gradelist = ["A+", "A", "A-", "B", "B", "B-", "C+", "C", "C-", "D", "E"];
const gradePoint = [4.3, 4, 3.7, 3.3, 3, 2.7, 2.3, 2, 1.7, 1.0, 0];

function gradeConvertToPoint(grade) {
  for (let i = 0; i < gradelist.length; i++) {
    if (gradelist[i] == grade) {
      return gradePoint[i];
    }
  }
}

function createForm(category, classNum, credit, grade) {
  let newForm = document.createElement("form");

  let newInput1 = document.createElement("input");
  newInput1.setAttribute("type", "text");
  newInput1.setAttribute("placeholder", "class category");
  newInput1.setAttribute("list", "opt");
  newInput1.value = category;

  let newInput2 = document.createElement("input");
  newInput2.setAttribute("type", "text");
  newInput2.setAttribute("placeholder", "class number");
  newInput2.value = classNum;

  let newInput3 = document.createElement("input");
  newInput3.classList.add("number");
  newInput3.setAttribute("type", "number");
  newInput3.setAttribute("placeholder", "credits");
  newInput3.setAttribute("min", 0);
  newInput3.setAttribute("max", 6);
  newInput3.setAttribute("title", "Enter your credit");
  newInput3.value = credit;

  newInput3.addEventListener("change", (e) => {
    calGPA();
  });

  let newSelect = document.createElement("select");
  newSelect.setAttribute("name", "select");
  newSelect.setAttribute("class", "select");

  let newOpt = document.createElement("option");
  newOpt.text = "";
  newSelect.appendChild(newOpt);
  for (let i = 0; i < gradelist.length; i++) {
    newOpt = document.createElement("option");
    newOpt.text = gradelist[i];
    newSelect.appendChild(newOpt);
  }
  newSelect.value = grade;
  // add select Listener
  let gradeToColorFunc = (grade) => {
    if (grade.includes("A")) {
      newSelect.style.backgroundColor = "rgb(123, 255, 177)";
    } else if (grade.includes("B")) {
      newSelect.style.backgroundColor = "rgb(255, 255, 154)";
    } else if (grade.includes("C")) {
      newSelect.style.backgroundColor = "rgb(255, 119, 147)";
    } else {
      newSelect.style.backgroundColor = "rgb(170, 170, 170)";
    }
  };
  gradeToColorFunc(grade);

  newSelect.addEventListener("change", (e) => {
    gradeToColorFunc(e.target.value);
    calGPA();
  });

  let newTrashBtn = document.createElement("button");
  newTrashBtn.setAttribute("type", "button");
  newTrashBtn.classList.add("delete-btn");

  let newTrashText = document.createElement("i");
  newTrashBtn.classList.add("fa-sharp");
  newTrashBtn.classList.add("fa-solid");
  newTrashBtn.classList.add("fa-trash");
  newTrashBtn.appendChild(newTrashText);

  newTrashBtn.addEventListener("click", (e) => {
    let parentForm = e.target.parentElement;
    parentForm.style.animation = "formFadeOut 0.3s ease forwards";
    parentForm.addEventListener("animationend", (e) => {
      e.target.remove();
    });
    calGPA();
  });

  newForm.appendChild(newInput1);
  newForm.appendChild(newInput2);
  newForm.appendChild(newInput3);
  newForm.appendChild(newSelect);
  newForm.appendChild(newTrashBtn);

  return newForm;
}

function calGPA() {
  let sum = 0,
    credits = 0;
  let formList = document.querySelectorAll("div.grade-input form");
  formList.forEach((form) => {
    if (
      !isNaN(form.children[2].valueAsNumber) &&
      form.children[3].value != ""
    ) {
      credits += form.children[2].valueAsNumber;

      sum +=
        form.children[2].valueAsNumber *
        gradeConvertToPoint(form.children[3].value);
    }
  });

  let total = sum / credits;
  if (isNaN(total)) {
    total = 0;
  }
  // set GPA-output
  let gpaOutputNum = document.querySelector("div.GPA-output .GPA-outputNum");
  gpaOutputNum.innerText = total.toFixed(2);
}

class formKeeper {
  constructor(category, classNum, credit, grade) {
    this.category = category;
    this.classNum = classNum;
    this.credit = credit;
    this.grade = grade;
  }
}

function qsort(arr, left, right) {
  let pivot = gradeConvertToPoint(arr[left]["grade"]);

  let tmp,
    l = left,
    r = right;
  while (l < r) {
    while (gradeConvertToPoint(arr[r]["grade"]) >= pivot && l < r) {
      r--;
    }
    while (gradeConvertToPoint(arr[l]["grade"]) <= pivot && l < r) {
      l++;
    }
    if (l < r) {
      // swap
      tmp = arr[l];
      arr[l] = arr[r];
      arr[r] = tmp;
    }
  }
  // swap
  tmp = arr[left];
  arr[left] = arr[l];
  arr[l] = tmp;

  if (left < l - 1) qsort(arr, left, l - 1);
  if (right > l + 1) qsort(arr, l + 1, right);
}
// input: "incr" or "decr"
function sort(mode) {
  let formArr = [];
  let formList = document.querySelectorAll("div.grade-input form");
  for (let i = 0; i < formList.length; i++) {
    if (formList[i].children[3].value != "") {
      formArr.push(
        new formKeeper(
          formList[i].children[0].value,
          formList[i].children[1].value,
          formList[i].children[2].value,
          formList[i].children[3].value
        )
      );
    }
  }
  formGroup.innerHTML = "";

  qsort(formArr, 0, formArr.length - 1);
  switch (mode) {
    case "incr":
      break;
    case "decr":
      formArr.reverse();
      break;
  }
  return formArr;
}

// main
// create initial form
let formGroup = document.querySelector("div.grade-input");

for (let i = 0; i < initFormNum; i++) {
  let newForm = createForm("", "", "", "");
  formGroup.appendChild(newForm);
}

// sort algorithm
let incrSortBtn = document.querySelector("button.incr");
incrSortBtn.addEventListener("click", () => {
  let formArr = sort("incr");
  let newForm;
  for (let i = 0; i < formArr.length; i++) {
    newForm = createForm(
      formArr[i]["category"],
      formArr[i]["classNum"],
      formArr[i]["credit"],
      formArr[i]["grade"]
    );
    formGroup.appendChild(newForm);
  }
});

let decrSortBtn = document.querySelector("button.decr");
decrSortBtn.addEventListener("click", () => {
  let formArr = sort("decr");
  let newForm;
  for (let i = 0; i < formArr.length; i++) {
    newForm = createForm(
      formArr[i]["category"],
      formArr[i]["classNum"],
      formArr[i]["credit"],
      formArr[i]["grade"]
    );
    formGroup.appendChild(newForm);
  }
});

// create additional form
let addBtn = document.querySelector("button.add-form-btn");
addBtn.addEventListener("click", (e) => {
  let newForm = createForm("", "", "", "");

  newForm.style.animation = "formFadeIn 0.3s ease forwards";

  let formGroup = document.querySelector("div.grade-input");
  formGroup.appendChild(newForm);
});
