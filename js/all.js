let dataList = JSON.parse(localStorage.getItem("bmiList")) || [];
let btn = document.querySelector(".btn-result");
let height = document.getElementById("height");
let weight = document.getElementById("weight");
let rebutton = document.querySelector(".rebutton");
let list = document.querySelector(".list-group");
let delAll = document.querySelector(".deleteAll");


// click function
btn.addEventListener("click", answer);
list.addEventListener("click", deleteList);
update(dataList);

// answer
function answer(e){
    let bmiValue = (weight.value / ((height.value / 100) * (height.value / 100))).toFixed(2);
    

    if(weight.value === "" || height.value === ""){
        alert("請輸入正確資料");
        return;
    }
    else{
        if(bmiValue <= 18.5){
            bmiStatus = "過輕";
            bmiColor = "#31BAF9";
            bmiBg = "bg-b";
        }
        else if(bmiValue > 18.5 && bmiValue <= 25){
            bmiStatus = "理想";
            bmiColor = "#86D73F";
            bmiBg = "bg-g";
        }
        else if(bmiValue > 25 && bmiValue <= 30){
            bmiStatus = "過重";
            bmiColor = "#FF982D";
            bmiBg = "bg-y";
        }
        else if(bmiValue > 30 && bmiValue <= 35){
            bmiStatus = "過重";
            bmiColor = "#FF6C03";
            bmiBg = "bg-o";
        }
        else if(bmiValue > 35){
            bmiStatus = "肥胖";
            bmiColor = "#FF1200";
            bmiBg = "bg-r";
        }
    }
    
    // 更改btn
    btn.classList.add("d-none");
    rebutton.classList.remove("d-none");

    let str = '<button class = "btn btn-another" style="color:' + bmiColor + ';"> <p class="fs-4 mb-0">' + bmiValue + '</p> <span class="fs-6">BMI</span> <div class="btn-icon ' + bmiBg + '"> <i class="fas fa-sync"></i> </div> </button> <div class="bmiStatus fs-4" style="color: ' + bmiColor + ';"> <p>' + bmiStatus + '</p> </div> ';
    rebutton.innerHTML = str;

    // 回復初始
    rebutton.addEventListener("click", function(e){
        if(e.target.nodeName !== ("I")){
            return;
        }
        rebutton.classList.add("d-none");
        btn.classList.remove("d-none");

        weight.value = "";
        height.value = "";
    });

    // 儲存資料
    let data = {
        status: bmiStatus,
        bmiValue: bmiValue,
        color: bmiColor,
        weight: weight.value,
        height: height.value,
        date: new Date().toLocaleDateString()
    }
    dataList.push(data);
    localStorage.setItem("bmiList", JSON.stringify(dataList));
    update(dataList);
}

// update
function update(e){
    let str = "";
    let len = dataList.length;
    for(let i = 0; i < len; i++){
        str += '<li class="list-group-item li-width d-flex justify-content-between align-items-center mb-3" style="border-left:6px solid ' + e[i].color + '"> <p class="mb-0">' + e[i].status + ' <p class="mb-0"><span>BMI</span> ' + e[i].bmiValue + '</p> <p class="mb-0"><span>weight</span> ' + e[i].weight + 'kg</p><p class="mb-0"><span>height</span> ' + e[i].height + 'cm</p><p class="mb-0"><span>' + e[i].date + '</span></p><p class="mb-0"><i class="fas fa-times text-danger" data-num=' + i + '></i></p></li>';
    }
    list.innerHTML = str;
    if(dataList.length == 0){
        delAll.classList.add("d-none");
    }
    else{
        delAll.classList.remove("d-none");
    }
}

// 刪除單筆資料
function deleteList(e){
    if(e.target.nodeName !== "I"){
        return;
    }
    dataList.splice(e.target.getAttribute("data-num"), 1);
    localStorage.setItem("bmiList", JSON.stringify(dataList));
    update(dataList);
}

// 刪除全部資料
delAll.addEventListener("click", function(e){
    dataList.splice(0, dataList.length);
    localStorage.setItem("bmiList", JSON.stringify(dataList));
    update(dataList);
})
