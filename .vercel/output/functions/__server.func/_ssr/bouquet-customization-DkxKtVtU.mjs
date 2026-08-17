//#region node_modules/.nitro/vite/services/ssr/assets/bouquet-customization-DkxKtVtU.js
var FLOWER_TYPES = [
	"Peonies",
	"Baby's Breath",
	"Roses",
	"Mixed/Assorted",
	"Exotic"
];
var OCCASIONS = [
	"Bridal",
	"Everyday",
	"Anniversary",
	"Sympathy"
];
var ARRANGEMENT_STYLES = [
	"Arranged",
	"One by One",
	"With Fillers/Greenery"
];
var EMPTY_CUSTOMIZATION = {
	flowerType: null,
	style: null,
	colors: [],
	occasion: null,
	arrangementStyle: null
};
var flowerColorMap = {
	"Baby's Breath": [
		"Red",
		"Pink",
		"White"
	],
	Roses: [
		"Red",
		"Orange",
		"Peach",
		"Yellow",
		"White",
		"Pink"
	],
	Exotic: [
		"Pink",
		"Orange",
		"White",
		"Green",
		"Yellow",
		"Magenta"
	],
	"Mixed/Assorted": ["Multicolor"],
	Peonies: [
		"Red",
		"Pink",
		"White"
	]
};
function stylesAvailableFor(flowerType) {
	if (flowerType === "Mixed/Assorted") return ["Mixed"];
	return ["Plain", "Mixed"];
}
function colorSelectionMode(style) {
	return style === "Mixed" ? "multi" : "single";
}
function colorOptionsFor(flowerType) {
	if (!flowerType) return [];
	return flowerColorMap[flowerType];
}
function isCustomizationComplete(c) {
	return Boolean(c.flowerType && c.style && c.colors.length > 0 && c.occasion && c.arrangementStyle);
}
function missingCustomizationFields(c) {
	const missing = [];
	if (!c.flowerType) missing.push("flower type");
	if (!c.style) missing.push("style");
	if (c.colors.length === 0) missing.push("color");
	if (!c.occasion) missing.push("occasion");
	if (!c.arrangementStyle) missing.push("arrangement style");
	return missing;
}
function customizationSummary(c) {
	if (!c.flowerType) return "";
	const colorPart = c.colors.length > 0 ? c.colors.join(" & ") : null;
	const namePart = [c.style, c.flowerType].filter(Boolean).join(" ");
	return [
		colorPart ? `${namePart} — ${colorPart}` : namePart,
		c.occasion,
		c.arrangementStyle
	].filter(Boolean).join(", ");
}
var NON_BOUQUET_CATEGORY_KEYWORDS = [
	"basket",
	"candle",
	"vase",
	"chocolate",
	"gift box",
	"hamper"
];
function isCustomizableBouquet(product) {
	if (!product) return false;
	const category = product.category.toLowerCase();
	return !NON_BOUQUET_CATEGORY_KEYWORDS.some((keyword) => category.includes(keyword));
}
//#endregion
export { colorOptionsFor as a, isCustomizableBouquet as c, stylesAvailableFor as d, OCCASIONS as i, isCustomizationComplete as l, EMPTY_CUSTOMIZATION as n, colorSelectionMode as o, FLOWER_TYPES as r, customizationSummary as s, ARRANGEMENT_STYLES as t, missingCustomizationFields as u };
