const cards = document.querySelector(".cards");
const para = document.querySelector("p");
const container1 = document.querySelector(".container1"); 


//fictional specifications
//An array of objects
const carList = [
  {
    name: "Honda Civic Type R",
    image:
      "url(https://upload.wikimedia.org/wikipedia/commons/c/cb/Honda_Civic_Type_R_%28FK%3B_France%29_front_view.jpg)",
    spec: {
      MSRP: "$25,232",
      Horsepower: "300 hp",
      "Top Speed": "170 mph",
      Weight: "3,899 lbs"
    }
  },
  {
    name: "Nissan Skyline GT-R",
    image:
      "url(https://upload.wikimedia.org/wikipedia/commons/7/73/Nissan_Skyline_R34_GT-R_N%C3%BCr_001.jpg)",
    spec: {
      MSRP: "$29,232",
      Horsepower: "543 hp",
      "Top Speed": "193 mph",
      Weight: "3,991 lbs"
    }
  },
  {
    name: "Ford Mustang GT500",
    image:
      "url(https://upload.wikimedia.org/wikipedia/commons/8/8e/2020_Ford_Mustang_Shelby_GT500_Coupe%2C_Cleveland_Auto_Show.jpg)",
    spec: {
      MSRP: "$39,932",
      Horsepower: "843 hp",
      "Top Speed": "193 mph",
      Weight: "4,251 lbs"
    }
  },
  {
    name: "Mclaren P1 GT-R",
    image:
      "url(https://upload.wikimedia.org/wikipedia/commons/d/d9/McLaren_P1_GTR_at_Grand_Basel_2018_01.jpg)",
    spec: {
      MSRP: "$951,462",
      Horsepower: "1093 hp",
      "Top Speed": "207 mph",
      Weight: "3,951 lbs"
    }
  },
  {
    name: "Chevrolet Camaro",
    image:
      "url(https://live.staticflickr.com/4632/25019314797_034da9beef_b.jpg)",
    spec: {
      MSRP: "$31,399",
      Horsepower: "640 hp",
      "Top Speed": "182 mph",
      Weight: "4,711 lbs"
    }
  },
  {
    name: "Toyota Supra",
    image:
      "url(https://upload.wikimedia.org/wikipedia/commons/5/5c/2020_Toyota_Supra_front_in_red_NYIAS_2019.jpg)",
    spec: {
      MSRP: "$21,282",
      Horsepower: "360 hp",
      "Top Speed": "185 mph",
      Weight: "3,881 lbs"
    }
  },
  {
    name: "Lamborghini Sian",
    image:
      "url(https://upload.wikimedia.org/wikipedia/commons/1/18/Lamborghini_Sian_at_IAA_2019_IMG_0332.jpg)",
    spec: {
      MSRP: "$1,300,532",
      Horsepower: "1002 hp",
      "Top Speed": "201 mph",
      Weight: "3,941 lbs"
    }
  },
  {
    name: "Bugatti Divo",
    image:
      "url(https://upload.wikimedia.org/wikipedia/commons/1/16/Bugatti_Divo%2C_GIMS_2019%2C_Le_Grand-Saconnex_%28GIMS0029%29.jpg)",
    spec: {
      MSRP: "$1,912,932",
      Horsepower: "1203 hp",
      "Top Speed": "210 mph",
      Weight: "4,321 lbs"
    }
  },
  {
    name: "Dodge Charger",
    image:
      "url(https://www.maxpixel.net/static/photo/1x/Blue-Dodge-Charger-Fast-Cars-Cars-Electric-Blue-5291976.jpg)",
    spec: {
      MSRP: "$31,232",
      Horsepower: "503 hp",
      "Top Speed": "172 mph",
      Weight: "4,135 lbs"
    }
  },
  {
    name: "Mazda Rx7",
    image:
      "url(https://live.staticflickr.com/4382/37202939225_3bce087052_c.jpg)",
    spec: {
      MSRP: "$21,422",
      Horsepower: "253 hp",
      "Top Speed": "169 mph",
      Weight: "3,883 lbs"
    }
  }
];

//sets images to thumbnail pane
for (let i = 0; i < carList.length; i++) {
  const createDiv = document.createElement("div");
  const para = document.createElement("p");
  createDiv.setAttribute("class", "title");
  para.setAttribute("id", "card-title");
  createDiv.appendChild(para);
  para.textContent = carList[i]["name"];
  cards.appendChild(createDiv);
  createDiv.style.backgroundImage = `${carList[i]["image"]}`;
}

const divs = document.querySelectorAll(".title");
const conTitle = document.querySelector("#container1-title");
let newImg = document.createElement("img");
let desHeader = document.createElement("p");
let desSubHeader = document.createElement("p");
let ul = document.createElement("ul");
let li1 = document.createElement("li");
let li2 = document.createElement("li");
let li3 = document.createElement("li");
let li4 = document.createElement("li")
li1.style.visibility = "hidden";
li2.style.visibility = "hidden";
li3.style.visibility = "hidden";
li4.style.visibility = "hidden"; 


//sets images into larger container window onclick
for (let i = 0; i < divs.length; i++) {
  divs[i].onclick = (e) => {
    let a = divs[i].getAttribute("style").split('"');
    console.log(a[1]);
    conTitle.style.display = "none";
    newImg.setAttribute("src", a[1]);
    newImg.setAttribute("id", "description-img");
    container1.appendChild(newImg);
    desHeader.setAttribute("id", "description-header");
    desHeader.textContent = divs[i].textContent;
    container1.appendChild(desHeader);
    desSubHeader.textContent = "Vehicle Specification";
    desSubHeader.setAttribute("id", "description-subheader");
    container1.appendChild(desSubHeader);
    let cars = carList[i]["spec"];
    li1.style.visibility = "visible";
    li2.style.visibility = "visible";
    li3.style.visibility = "visible";
    li4.style.visibility = "visible";

    li1.textContent = "MSRP:" + " " + cars["MSRP"];
    li2.textContent = "Horsepower:" + " " + cars["Horsepower"];
    li3.textContent = "Top Speed:" + " " + cars["Top Speed"];
    li4.textContent = "Weight:"+" "+ cars["Weight"];
  };
}

ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);
ul.appendChild(li4);
container1.appendChild(ul);
