let angleIndex = 0;
let angleToggleIndex = 0;
let outfitIndex = 0;
const titleArea = document.getElementById("title")
const dataSection = document.getElementById("dataSection")
const infoTable = document.getElementById("infoTable")
const colorTable = document.getElementById("colorTable")
const anglePic = document.getElementById("angleguy")
const angleForm = document.getElementById("angleToggles")
const outfitPic = document.getElementById("outfitguy")
const angleTxt = document.getElementById("anglesText")
const outfitTxt = document.getElementById("outfitsText")
const hideMyAss = document.getElementById("hidetext")
const titles = [
    document.getElementById("anglesTitle"),
    document.getElementById("outfitsTitle"),
    document.getElementById("dataTitle"),
]

function preloadEverything() {
    var images = [];
    function preload() {
        for (var i = 0; i < arguments.length; i++) {
            images[i] = new Image();
            images[i].src = preload.arguments[i];
        }
    }
    for (let i = 0; i < angles.length; i++) {
        preload(angles[i][1]);
        for (let j = 1; j < angleToggles.length; j++) {
            preload(`${(angles[i][1]).slice(0, -4)}_${angleToggles[j]}.png`);
        }
    }
    for (let i = 0; i < outfits.length; i++) {
        preload(outfits[i][1]);
    }
}

function changeAngleToggle(val) {
    angleToggleIndex = val;
    updateImages();
}
function spawnInThings() {
    updateImages();
    for (let i = 0; i < 3; i++) {
        console.log(titles[i]);
        console.log(headers[i]);
        if (headers[i] == "") {
            titles[i].style.display = "none";
        } else {
            titles[i].innerText = headers[i];
        }
    }
    if (angles.length == 1) {
        document.getElementById("butt1").style.display = "none";
        document.getElementById("butt2").style.display = "none";
    }
    if (outfits.length == 1) {
        document.getElementById("butt3").style.display = "none";
        document.getElementById("butt4").style.display = "none";
    }
    for (let i = 0; i < (info.length); i++) {
        if (info[i][1] == "h") {
            const newRow = document.createElement("tr");
            const newHeading = document.createElement("td");
            newHeading.colSpan = 2;
            newHeading.classList.add("tableSeparator")
            const newHeadingContent = document.createTextNode(info[i][0]);
            newHeading.appendChild(newHeadingContent);
            newRow.appendChild(newHeading);
            infoTable.appendChild(newRow);
        } else if (info[i][1] == "l") {
            const tr = document.createElement("tr");
            const th = document.createElement("th");
            th.innerText = info[i][0];
            tr.appendChild(th);
            const td = document.createElement("td");
            const list = document.createElement("ul");
            for (let j = 0; j < info[i][2].length; j++) {
                const listItem = document.createElement("li");
                listItem.innerText = info[i][2][j];
                list.appendChild(listItem);
            }
            td.appendChild(list);
            tr.appendChild(td);
            infoTable.appendChild(tr);
        } else if (info[i][1] == "n") {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.innerText = info[i][0];
            td.colSpan = 2;
            tr.appendChild(td);
            infoTable.appendChild(tr);
        }
        else {
            const newInfoRow = document.createElement("tr");
            const newInfoType = document.createElement("th");
            const newInfoTypeContent = document.createTextNode(info[i][0]);
            newInfoType.classList.add("rowfit");
            newInfoType.appendChild(newInfoTypeContent);
            const newInfoDesc = document.createElement("td");
            const newInfoDescContent = document.createTextNode(info[i][1]);
            newInfoDesc.appendChild(newInfoDescContent);
            newInfoRow.appendChild(newInfoType);
            newInfoRow.appendChild(newInfoDesc);
            infoTable.appendChild(newInfoRow);
        }
    }
    const createdUsingMessage = document.createElement("h6");
    createdUsingMessage.innerHTML = "<a href='https://puzzylpiece.xyz/reftek/'>Created using Reftek (alpha II)</a>"
    dataSection.appendChild(createdUsingMessage)

    if (angleToggles.length != 1) {
        for (let i = 0; i < (angleToggles.length); i++) {
            const newToggle = document.createElement("input");
            const newToggleLabel = document.createElement("label");
            newToggle.setAttribute('type', 'radio');
            newToggle.setAttribute('name', 'angle_toggles');
            if (angleToggles[i] == "") {
                newToggle.id = "normal";
            } else {
                newToggle.id = angleToggles[i];
            }
            newToggle.addEventListener('click', function () {
                changeAngleToggle(i);
            });
            angleForm.appendChild(newToggle);
            newToggleLabel.setAttribute('for', angleToggles[i])
            if (angleToggles[i] == "") {
                newToggleLabel.innerText = "none";
            } else {
                newToggleLabel.innerText = angleToggles[i];
            }
            angleForm.appendChild(newToggleLabel);
            angleForm.appendChild(document.createElement("br"))
        }
        if (headers[3] == "") {
            hideMyAss.style.display = "none";
        } else {
            hideMyAss.innerText = headers[3];
        }
    } else {
        hideMyAss.style.display = "none";
    }
    for (let i = 0; i < (colors.length); i++) {
        if (colors[i][1] == "h") {
            const newRow = document.createElement("tr");
            const newHeading = document.createElement("td");
            newHeading.colSpan = 4;
            newHeading.classList.add("tableSeparator")
            const newHeadingContent = document.createTextNode(colors[i][0]);
            newHeading.appendChild(newHeadingContent);
            newRow.appendChild(newHeading);
            colorTable.appendChild(newRow)
        } else {
            const newColorRow = document.createElement("tr");
            const newColorPreview = document.createElement("td");
            newColorPreview.style.backgroundColor = `#${colors[i][0]}`;
            const newColorDesc = document.createElement("td");
            const newColorDescContent = document.createTextNode(colors[i][1]);
            newColorDesc.appendChild(newColorDescContent);
            const newColorHex = document.createElement("td");
            const newColorHexContent = document.createTextNode(colors[i][0]);
            newColorHex.classList.add("hex");
            newColorHex.appendChild(newColorHexContent);
            const newColorCopy = document.createElement("td");
            const newColorCopyButton = document.createElement("button");
            newColorCopyButton.innerText = "COPY"
            newColorCopyButton.addEventListener('click', function () {
                copyColorToClipboard(i);
            });
            newColorCopy.appendChild(newColorCopyButton);
            newColorRow.appendChild(newColorPreview);
            newColorRow.appendChild(newColorDesc);
            newColorRow.appendChild(newColorHex);
            newColorRow.appendChild(newColorCopy);
            colorTable.appendChild(newColorRow);
        }
    }
}


if (title[0] == "t") {
    titleArea.innerHTML = `<h2>${title[1]}</h2>`;
} else if (title[0] == "i") {
    titleArea.innerHTML = `<img src="${title[1]}" width="200">`;
}
preloadEverything();
spawnInThings();

function updateImages() {
    preloadEverything();
    if (angleToggleIndex == 0) {
        anglePic.style.backgroundImage = `url(${angles[angleIndex][1]})`;
    } else {
        anglePic.style.backgroundImage = `url(${(angles[angleIndex][1]).slice(0, -4)}_${angleToggles[angleToggleIndex]}.png)`;
    }
    angleTxt.innerText = angles[angleIndex][0];
    outfitPic.style.backgroundImage = `url(${outfits[outfitIndex][1]})`;
    outfitTxt.innerText = outfits[outfitIndex][0];
}


function prevAngle() {
    if (angleIndex == 0) {
        angleIndex = (angles.length - 1);
    } else {
        angleIndex--;
    }
    anglePic.animate(keyframesLeft, options);
    updateImages();
}

function nextAngle() {
    if (!(angleIndex >= (angles.length - 1))) {
        angleIndex++;
    } else {
        angleIndex = 0;
    }
    anglePic.animate(keyframesRight, options);
    updateImages();
}

function prevOutfit() {
    if (outfitIndex == 0) {
        outfitIndex = (outfits.length - 1);
    } else {
        outfitIndex--;
    }
    outfitPic.animate(keyframesLeft, options);
    updateImages();
}

function nextOutfit() {
    if (!(outfitIndex >= (outfits.length - 1))) {
        outfitIndex++;
    } else {
        outfitIndex = 0;
    }
    outfitPic.animate(keyframesRight, options);
    updateImages();
}

function copyColorToClipboard(colorIndex) {
    navigator.clipboard.writeText(colors[colorIndex][0]);
}
