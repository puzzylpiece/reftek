let charIndex = 0;
const titleArea = document.getElementById("title")
const dataSection = document.getElementById("dataSection")
const infoTable = document.getElementById("infoTable")
const infoTableInner = infoTable.innerHTML
const colorHeader = document.getElementById("colorHeader")
const colorTable = document.getElementById("colorTable")
const colorTableInner = colorTable.innerHTML
const anglePic = document.getElementById("angleguy")
const angleForm = document.getElementById("angleToggles")
const angleFormInner = angleForm.innerHTML
const outfitPic = document.getElementById("outfitguy")
const angleTxt = document.getElementById("anglesText")
const outfitTxt = document.getElementById("outfitsText")
const angleSel = document.getElementById("angleSelector")
const outfitSel = document.getElementById("outfitSelector")
const charSel = document.getElementById("charSelector")
const hideTxt = document.getElementById("hidetext")
const titles = [
	document.getElementById("anglesTitle"),
	document.getElementById("outfitsTitle"),
	document.getElementById("dataTitle"),
]
let showOutfits = false

function setupCharacters() {
	// legacy settings support
	if (typeof characters === "undefined") {
		characters = [{title: title, angles: angles}];
		if (typeof angleToggles !== "undefined") {
			characters[0].angleToggles = angleToggles
		}
		if (typeof outfits !== "undefined") {
			characters[0].outfits = outfits
		}
		if (typeof info !== "undefined") {
			characters[0].info = info
		}
		if (typeof colors !== "undefined") {
			characters[0].colors = colors
		}
	}
	
	for (let c = 0; c < characters.length; c++) {
		characters[c].angleIndex = 0;
		characters[c].angleToggleIndex = 0;
		characters[c].outfitIndex = 0;
		if (typeof characters[c].angleToggles === "undefined") {
			characters[c].angleToggles = [""]
		}
		if (typeof characters[c].outfits === "undefined") {
			characters[c].outfits = [["", characters[c].angles[0][1]]]
		} else {
			showOutfits = true
		}
		if (typeof characters[c].info === "undefined") {
			characters[c].info = []
		}
		if (typeof characters[c].colors === "undefined") {
			characters[c].colors = []
		}
	}
	if (!showOutfits) {
		document.getElementById("anglesSection").classList.add("no-outfit")
	}
}

function preloadEverything() {
	var images = [];

	function preload() {
		for (var i = 0; i < arguments.length; i++) {
			images[i] = new Image();
			images[i].src = preload.arguments[i];
		}
	}
	for (let c = 0; c < characters.length; c++) {
		for (let i = 0; i < characters[c].angles.length; i++) {
			preload(characters[c].angles[i][1]);
			for (let j = 1; j < characters[c].angleToggles.length; j++) {
				preload(`${(characters[c].angles[i][1]).slice(0, -4)}_${characters[c].angleToggles[j]}.png`);
			}
		}
		if (showOutfits) {
			for (let i = 0; i < characters[c].outfits.length; i++) {
				preload(characters[c].outfits[i][1]);
			}
		}
	}
}

function changeAngleToggle(val) {
	characters[charIndex].angleToggleIndex = val;
	updateImages();
}

function changeCharacter(val) {
	charIndex = val;
	spawnInThings(false);
}

function spawnInThings(init) {
	updateImages();

	infoTable.innerHTML = infoTableInner
	colorTable.innerHTML = colorTableInner
	angleForm.innerHTML = angleFormInner

	if (characters[charIndex].title[0] == "t") {
		titleArea.innerHTML = `<h2>${characters[charIndex].title[1]}</h2>`;
	} else if (characters[charIndex].title[0] == "i") {
		titleArea.innerHTML = `<img src="${characters[charIndex].title[1]}" width="200">`;
	}

	if (init) {
		for (let i = 0; i < 3; i++) {
			console.log(titles[i]);
			console.log(headers[i]);
			if (headers[i] == "") {
				titles[i].style.display = "none";
			} else {
				titles[i].innerText = headers[i];
			}
		}
		if (characters.length == 1) {
			document.getElementById("btn5").style.display = "none";
			document.getElementById("btn6").style.display = "none";
			charSel.classList.remove("selector2")
		}
	}

	if (characters[charIndex].angles.length == 1) {
		document.getElementById("btn1").style.display = "none";
		document.getElementById("btn2").style.display = "none";
		angleSel.classList.add("single-item")
	}
	if (showOutfits) {
		if (characters[charIndex].outfits.length == 1) {
			document.getElementById("btn3").style.display = "none";
			document.getElementById("btn4").style.display = "none";
			outfitSel.classList.add("single-item")
		}
	} else {
		document.getElementById("outfitsSection").style.display = "none";
	}
	for (let i = 0; i < (characters[charIndex].info.length); i++) {
		if (characters[charIndex].info[i][1] == "h") {
			const newRow = document.createElement("tr");
			const newHeading = document.createElement("td");
			newHeading.colSpan = 2;
			newHeading.classList.add("tableSeparator")
			const newHeadingContent = document.createTextNode(characters[charIndex].info[i][0]);
			newHeading.appendChild(newHeadingContent);
			newRow.appendChild(newHeading);
			infoTable.appendChild(newRow);
		} else if (characters[charIndex].info[i][1] == "l") {
			const tr = document.createElement("tr");
			const th = document.createElement("th");
			th.innerText = characters[charIndex].info[i][0];
			tr.appendChild(th);
			const td = document.createElement("td");
			const list = document.createElement("ul");
			for (let j = 0; j < characters[charIndex].info[i][2].length; j++) {
				const listItem = document.createElement("li");
				listItem.innerText = characters[charIndex].info[i][2][j];
				list.appendChild(listItem);
			}
			td.appendChild(list);
			tr.appendChild(td);
			infoTable.appendChild(tr);
		} else if (characters[charIndex].info[i][1] == "n") {
			const tr = document.createElement("tr");
			const td = document.createElement("td");
			td.innerText = characters[charIndex].info[i][0];
			td.colSpan = 2;
			tr.appendChild(td);
			infoTable.appendChild(tr);
		} else {
			const newInfoRow = document.createElement("tr");
			const newInfoType = document.createElement("th");
			const newInfoTypeContent = document.createTextNode(characters[charIndex].info[i][0]);
			newInfoType.classList.add("rowfit");
			newInfoType.appendChild(newInfoTypeContent);
			const newInfoDesc = document.createElement("td");
			const newInfoDescContent = document.createTextNode(characters[charIndex].info[i][1]);
			newInfoDesc.appendChild(newInfoDescContent);
			newInfoRow.appendChild(newInfoType);
			newInfoRow.appendChild(newInfoDesc);
			infoTable.appendChild(newInfoRow);
		}
	}

	if (characters[charIndex].angleToggles.length != 1) {
		for (let i = 0; i < (characters[charIndex].angleToggles.length); i++) {
			const newToggle = document.createElement("input");
			const newToggleLabel = document.createElement("label");
			newToggle.setAttribute('type', 'radio');
			newToggle.setAttribute('name', 'angle_toggles');
			if (characters[charIndex].angleToggles[i] == "") {
				newToggle.id = "normal";
			} else {
				newToggle.id = characters[charIndex].angleToggles[i];
			}
			newToggle.addEventListener('click', function() {
				changeAngleToggle(i);
			});
			angleForm.appendChild(newToggle);
			newToggleLabel.setAttribute('for', characters[charIndex].angleToggles[i])
			if (characters[charIndex].angleToggles[i] == "") {
				newToggleLabel.innerText = "none";
			} else {
				newToggleLabel.innerText = characters[charIndex].angleToggles[i];
			}
			angleForm.appendChild(newToggleLabel);
			angleForm.appendChild(document.createElement("br"))
		}
		if (headers[3] == "") {
			hideTxt.style.display = "none";
		} else {
			hideTxt.innerText = headers[3];
		}
	} else {
		hideTxt.style.display = "none";
	}
	if (characters[charIndex].colors.length > 0) {
		colorHeader.style.display = "";
		colorTable.style.display = "";
		for (let i = 0; i < (characters[charIndex].colors.length); i++) {
			const newColorRow = document.createElement("tr");
			if (characters[charIndex].colors[i][1] == "h") {
				const newHeading = document.createElement("td");
				newHeading.colSpan = 4;
				newHeading.classList.add("tableSeparator")
				const newHeadingContent = document.createTextNode(characters[charIndex].colors[i][0]);
				newHeading.appendChild(newHeadingContent);
				newColorRow.appendChild(newHeading);
				newColorRow.id = "colorRow";
			} else {
				const newColorPreview = document.createElement("td");
				newColorPreview.style.backgroundColor = `#${characters[charIndex].colors[i][0]}`;
				const newColorDesc = document.createElement("td");
				const newColorDescContent = document.createTextNode(characters[charIndex].colors[i][1]);
				newColorDesc.appendChild(newColorDescContent);
				const newColorHex = document.createElement("td");
				const newColorHexContent = document.createTextNode(characters[charIndex].colors[i][0]);
				newColorHex.classList.add("hex");
				newColorHex.appendChild(newColorHexContent);
				const newColorCopy = document.createElement("td");
				const newColorCopyButton = document.createElement("button");
				newColorCopyButton.innerText = "COPY"
				newColorCopyButton.addEventListener('click', function() {
					copyColorToClipboard(i);
				});
				newColorCopy.appendChild(newColorCopyButton);
				newColorRow.appendChild(newColorPreview);
				newColorRow.appendChild(newColorDesc);
				newColorRow.appendChild(newColorHex);
				newColorRow.appendChild(newColorCopy);
			}
			newColorRow.id = "colorRow";
			if (typeof characters[charIndex].colors[i][2] === "number") {
				newColorRow.classList.add(`outfit-${characters[charIndex].colors[i][2]}`);
			} else if (typeof characters[charIndex].colors[i][2] !== "undefined") {
				newColorRow.classList.add(`outfit-${characters[charIndex].outfits.findIndex((a)=>a[0]==characters[charIndex].colors[i][2])}`);
			} else {
				newColorRow.classList.add(`outfit-all`);
			}
			colorTable.appendChild(newColorRow);
		}
		updateColorTable()
	} else {
		colorHeader.style.display = "none";
		colorTable.style.display = "none";
	}
}

setupCharacters();
preloadEverything();
spawnInThings(true);

const createdUsingMessage = document.createElement("h6");
createdUsingMessage.innerHTML = "<a href='https://puzzylpiece.xyz/reftek/'>Created using Reftek (alpha II)</a>"
dataSection.appendChild(createdUsingMessage)

function updateImages() {
	preloadEverything();
	if (characters[charIndex].angleToggleIndex == 0) {
		anglePic.style.backgroundImage = `url(${characters[charIndex].angles[characters[charIndex].angleIndex][1]})`;
	} else {
		anglePic.style.backgroundImage = `url(${(characters[charIndex].angles[characters[charIndex].angleIndex][1]).slice(0, -4)}_${characters[charIndex].angleToggles[characters[charIndex].angleToggleIndex]}.png)`;
	}
	angleTxt.innerText = characters[charIndex].angles[characters[charIndex].angleIndex][0];
	outfitPic.style.backgroundImage = `url(${characters[charIndex].outfits[characters[charIndex].outfitIndex][1]})`;
	outfitTxt.innerText = characters[charIndex].outfits[characters[charIndex].outfitIndex][0];
	updateColorTable()
}
function updateColorTable() {
	colorTable.querySelectorAll(`#colorRow:not(.outfit-all):not(.outfit-${characters[charIndex].outfitIndex})`).forEach((curNode)=>{
		curNode.style.display = "none"
	})
	colorTable.querySelectorAll(`#colorRow.outfit-${characters[charIndex].outfitIndex}`).forEach((curNode)=>{
		curNode.style.display = ""
	})
}

function prevAngle() {
	if (characters[charIndex].angleIndex == 0) {
		characters[charIndex].angleIndex = characters[charIndex].angles.length - 1;
	} else {
		characters[charIndex].angleIndex--;
	}
	anglePic.animate(keyframesLeft, options);
	updateImages();
}

function nextAngle() {
	if (characters[charIndex].angleIndex >= characters[charIndex].angles.length - 1) {
		characters[charIndex].angleIndex = 0;
	} else {
		characters[charIndex].angleIndex++;
	}
	anglePic.animate(keyframesRight, options);
	updateImages();
}

function prevOutfit() {
	if (characters[charIndex].outfitIndex == 0) {
		characters[charIndex].outfitIndex = characters[charIndex].outfits.length - 1;
	} else {
		characters[charIndex].outfitIndex--;
	}
	console.log(characters[charIndex].outfitIndex)
	outfitPic.animate(keyframesLeft, options);
	updateImages();
}

function nextOutfit() {
	if (characters[charIndex].outfitIndex >= characters[charIndex].outfits.length - 1) {
		characters[charIndex].outfitIndex = 0;
	} else {
		characters[charIndex].outfitIndex++;
	}
	console.log(characters[charIndex].outfitIndex)
	outfitPic.animate(keyframesRight, options);
	updateImages();
}

function prevCharacter() {
	if (charIndex == 0) {
		changeCharacter(characters.length - 1);
	} else {
		changeCharacter(charIndex - 1);
	}
	console.log(characters[charIndex])
	anglePic.animate(keyframesLeft, options);
	outfitPic.animate(keyframesLeft, options);
}

function nextCharacter() {
	if (charIndex >= characters.length - 1) {
		changeCharacter(0);
	} else {
		changeCharacter(charIndex + 1);
	}
	console.log(characters[charIndex])
	anglePic.animate(keyframesRight, options);
	outfitPic.animate(keyframesRight, options);
}

function copyColorToClipboard(colorIndex) {
	navigator.clipboard.writeText(characters[charIndex].colors[colorIndex][0]);
}