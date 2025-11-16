// HELLO! This is the file you are supposed to edit to play with the refsheet.

// TITLES
// If you don't want the headers to appear, just leave each one as "". The fourth header controls the toggle switch's title
const headers = [
	"Angles",
	"Outfits",
	"Data",
	"Hide"
]

// CHARACTERS
// Add as many characters as you want, separated by curly brackets. All characters must have at least the following parameters: title, angles
const characters = [
	{
		// TITLE
		// To use a text title, put "t" as the first value and your desired title as the second.
		// To use an image title, put "i" as the first value and the path to the image as the second.
		// If you don't want to use a title, put the first value as "n".
		// const title = ["i", "images/logo.svg"]
		title: ["t", "Placeholder"],

		// ADD ANGLES HERE.
		// Display name first, file path second.
		angles: [
			["?", "images/placeholder.png"],
			["!", "images/placeholder.png"]
		],

		// ANGLE TOGGLES
		// If there is only one element here it won't appear. To add the corresponding variants, upload images with "_[name of the toggle]" appended to their filename.
		angleToggles: [
			""
		],

		// ADD OUTFITS HERE.
		// Display name first, file path second.
		outfits: [
			["?", "images/placeholder.png"],
			["!", "images/placeholder.png"]
		],

		// INFORMATION
		// Type of info first, description second.
		// For headings, Put the heading text as the first value and then put "h" as the second.
		// For unordered lists, Put the heading text as the first value and then put "l" as the second. Then for a third value, make an array that contains each list item as a separate string.
		// For notes without labels, put your note as the first value and then put "n" as the second.
		info: [
			["Heading example", "h"],
			["Placeholder", "Placeholder"],
			["List example", "l", [
				"This", "is a", "list"
			]],
			["Note example", "n"]
		],

		// ADD COLORS HERE
		// HEX code first, use case second, and optionally, the outfit third.
		// For headings, Put the heading text as the first value and then put "h" as the second.
		colors: [
			["FFFFFF", "Placeholder"]
		],
	},
]

// ANIMATIONS
// This will be replaced with preset animations later but for now you can just modify this code.
const keyframesLeft = [
	{transform: 'translateX(10px)'},
	{transform: 'translateX(0px)'}
];
const keyframesRight = [
	{transform: 'translateX(-10px)'},
	{transform: 'translateX(0px)'}
];
const options = {
	duration: 400,
	easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
	fill: 'forwards'
};