/* data input */
const billEle = document.getElementById("bill");
const tipEle = document.querySelector(".tipsButton");
const tipBtns = tipEle.getElementsByTagName("button");
const peoEle = document.getElementById("people");


/*element with interaction*/
const customCur = document.querySelector(".custom");
const customHidden = document.getElementById("tip");
const peoHidden = document.querySelector(".txtHidden");
/*var peoELE also has a interaction -> border to be red if people is zero*/

/*data output*/
const tipRsl = document.getElementById("tipAmount");
const totalRsl = document.getElementById("total");

/*button reset*/
const resetBtn = document.getElementsByClassName("outputs")[0].querySelector("button");


/*get the tips value*/
function tipBtnClick (evt) {
    let key = evt.target.textContent;
    console.log("tip button " + key);

    if (key.search("%") != -1) {
        evt.target.style.backgroundColor = "hsl(172, 67%, 45%)";
        evt.target.style.color = "hsl(183, 100%, 15%)";
        tipEle.value = key.slice(0, key.length-1);
        customCur.style.display = "inline";
        customHidden.style.display = "none";
        afterInput();

    } else {
        customCur.style.display = "none";
        customHidden.style.display = "inline";
        customHidden.addEventListener("click", focusClick);
        customHidden.addEventListener("input", function() {
            tipEle.value = customHidden.value;
            customHidden.style.color = "hsl(183, 100%, 15%)";
            afterInput();
        });
    }
}

function focusClick(evt) {
    evt.target.value = "";
    evt.target.style.border = "2px solid hsl(172, 67%, 45%)";
}

function calculation() {
    let billNr = Number(billEle.value);
    let tipNr = Number(tipEle.value)/100;
    let perNr = Number(peoEle.value);
    console.log("bill " + billNr);
    console.log("tip " + tipNr);
    console.log("person " + perNr);

    if (perNr === 0 || perNr === "") {
        peoHidden.style.opacity = "1";
        peoEle.style.border = "2px solid rgba(255, 119, 0, 0.84)";
    }else {
        peoHidden.style.opacity = "0";
        tipRsl.textContent = "$" + (billNr*tipNr/perNr).toFixed(2);
        totalRsl.textContent = "$" + (billNr*(1+tipNr)/perNr).toFixed(2);
    }

}

function EleReset() {
    location.reload();
}

function afterInput(evt) {
    /*evt.target.style.color = "hsl(183, 100%, 15%)";*/
    calculation();
}

for (let i=0; i<tipBtns.length; i++) {
    tipBtns[i].addEventListener("click", tipBtnClick);
}

billEle.addEventListener("click", focusClick);
peoEle.addEventListener("click", focusClick);
billEle.addEventListener("input", afterInput);
peoEle.addEventListener("input", afterInput);
resetBtn.addEventListener("click", EleReset);



