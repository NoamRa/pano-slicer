var panoSlicer =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/geometry.ts":
/*!*********************************!*\
  !*** ./src/scripts/geometry.ts ***!
  \*********************************/
/*! exports provided: MAX_DIMENSION, calcLineCoordinates, scaler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAX_DIMENSION\", function() { return MAX_DIMENSION; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calcLineCoordinates\", function() { return calcLineCoordinates; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scaler\", function() { return scaler; });\nconst MAX_DIMENSION = 1080; // max width or height an Instagram image can be\r\nfunction calcLinePositions(imageWidth, desiredParts) {\r\n    const partWidth = imageWidth / desiredParts;\r\n    const numberOfLines = desiredParts - 1;\r\n    const lines = Array.from({ length: numberOfLines }, (_, idx) => idx + 1).map(partIdx => Math.round(partIdx * partWidth));\r\n    return lines;\r\n}\r\nfunction calcLineCoordinates(imageDimension, parts) {\r\n    const linePositions = calcLinePositions(imageDimension.width, parts);\r\n    return linePositions.map(pos => ({\r\n        start: {\r\n            x: pos,\r\n            y: 0\r\n        },\r\n        end: {\r\n            x: pos,\r\n            y: imageDimension.height\r\n        }\r\n    }));\r\n}\r\nfunction scaler({ width, height }, maxDimension = MAX_DIMENSION) {\r\n    let scaleFactor = 1;\r\n    let scaledWidth = width;\r\n    let scaledHeight = height;\r\n    if (height >= maxDimension) {\r\n        scaleFactor = height / maxDimension;\r\n        scaledWidth = height * scaleFactor;\r\n        scaledHeight = width * scaleFactor;\r\n    }\r\n    const { parts, letterBox } = calcPartsAndLetterBox({\r\n        width: scaledWidth,\r\n        height: scaledHeight\r\n    });\r\n    return {\r\n        scaledImageDimension: { width: scaledWidth, height: scaledHeight },\r\n        canvasDimension: {\r\n            width: scaledWidth,\r\n            height: scaledHeight + letterBox * 2\r\n        },\r\n        scaleFactor,\r\n        parts,\r\n        letterBox\r\n    };\r\n}\r\n/**\r\n * @function calculates how manny parts should the pano be split to and the letterBox height to add\r\n * @param dimension.width - image width\r\n * @param dimension.height - image height\r\n * @var parts - Integer. The number of parts the panorama will fit in. It's round up of width / height\r\n * @var letterBox - Integer. The number that will be added to top and bottom in order to have n parts of 1:1 ratio\r\n * @returns { parts, letterBox }\r\n */\r\nfunction calcPartsAndLetterBox({ width, height }) {\r\n    if (height >= width)\r\n        return { parts: 1, letterBox: 0 };\r\n    const parts = Math.trunc(width / height);\r\n    const desiredHeight = width / parts;\r\n    const gap = desiredHeight - height;\r\n    const letterBox = gap / 2; // divided by two as we want LBX value for top and bottom\r\n    console.log(\"sanity:\", \"width:\", width, \"height:\", height, \"canvas height:\", height + letterBox * 2);\r\n    return { parts, letterBox };\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL3Bhbm9TbGljZXIvLi9zcmMvc2NyaXB0cy9nZW9tZXRyeS50cz9lYzBhIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBNQVhfRElNRU5TSU9OID0gMTA4MDsgLy8gbWF4IHdpZHRoIG9yIGhlaWdodCBhbiBJbnN0YWdyYW0gaW1hZ2UgY2FuIGJlXHJcbmZ1bmN0aW9uIGNhbGNMaW5lUG9zaXRpb25zKGltYWdlV2lkdGgsIGRlc2lyZWRQYXJ0cykge1xyXG4gICAgY29uc3QgcGFydFdpZHRoID0gaW1hZ2VXaWR0aCAvIGRlc2lyZWRQYXJ0cztcclxuICAgIGNvbnN0IG51bWJlck9mTGluZXMgPSBkZXNpcmVkUGFydHMgLSAxO1xyXG4gICAgY29uc3QgbGluZXMgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBudW1iZXJPZkxpbmVzIH0sIChfLCBpZHgpID0+IGlkeCArIDEpLm1hcChwYXJ0SWR4ID0+IE1hdGgucm91bmQocGFydElkeCAqIHBhcnRXaWR0aCkpO1xyXG4gICAgcmV0dXJuIGxpbmVzO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBjYWxjTGluZUNvb3JkaW5hdGVzKGltYWdlRGltZW5zaW9uLCBwYXJ0cykge1xyXG4gICAgY29uc3QgbGluZVBvc2l0aW9ucyA9IGNhbGNMaW5lUG9zaXRpb25zKGltYWdlRGltZW5zaW9uLndpZHRoLCBwYXJ0cyk7XHJcbiAgICByZXR1cm4gbGluZVBvc2l0aW9ucy5tYXAocG9zID0+ICh7XHJcbiAgICAgICAgc3RhcnQ6IHtcclxuICAgICAgICAgICAgeDogcG9zLFxyXG4gICAgICAgICAgICB5OiAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlbmQ6IHtcclxuICAgICAgICAgICAgeDogcG9zLFxyXG4gICAgICAgICAgICB5OiBpbWFnZURpbWVuc2lvbi5oZWlnaHRcclxuICAgICAgICB9XHJcbiAgICB9KSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlcih7IHdpZHRoLCBoZWlnaHQgfSwgbWF4RGltZW5zaW9uID0gTUFYX0RJTUVOU0lPTikge1xyXG4gICAgbGV0IHNjYWxlRmFjdG9yID0gMTtcclxuICAgIGxldCBzY2FsZWRXaWR0aCA9IHdpZHRoO1xyXG4gICAgbGV0IHNjYWxlZEhlaWdodCA9IGhlaWdodDtcclxuICAgIGlmIChoZWlnaHQgPj0gbWF4RGltZW5zaW9uKSB7XHJcbiAgICAgICAgc2NhbGVGYWN0b3IgPSBoZWlnaHQgLyBtYXhEaW1lbnNpb247XHJcbiAgICAgICAgc2NhbGVkV2lkdGggPSBoZWlnaHQgKiBzY2FsZUZhY3RvcjtcclxuICAgICAgICBzY2FsZWRIZWlnaHQgPSB3aWR0aCAqIHNjYWxlRmFjdG9yO1xyXG4gICAgfVxyXG4gICAgY29uc3QgeyBwYXJ0cywgbGV0dGVyQm94IH0gPSBjYWxjUGFydHNBbmRMZXR0ZXJCb3goe1xyXG4gICAgICAgIHdpZHRoOiBzY2FsZWRXaWR0aCxcclxuICAgICAgICBoZWlnaHQ6IHNjYWxlZEhlaWdodFxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNjYWxlZEltYWdlRGltZW5zaW9uOiB7IHdpZHRoOiBzY2FsZWRXaWR0aCwgaGVpZ2h0OiBzY2FsZWRIZWlnaHQgfSxcclxuICAgICAgICBjYW52YXNEaW1lbnNpb246IHtcclxuICAgICAgICAgICAgd2lkdGg6IHNjYWxlZFdpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHNjYWxlZEhlaWdodCArIGxldHRlckJveCAqIDJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjYWxlRmFjdG9yLFxyXG4gICAgICAgIHBhcnRzLFxyXG4gICAgICAgIGxldHRlckJveFxyXG4gICAgfTtcclxufVxyXG4vKipcclxuICogQGZ1bmN0aW9uIGNhbGN1bGF0ZXMgaG93IG1hbm55IHBhcnRzIHNob3VsZCB0aGUgcGFubyBiZSBzcGxpdCB0byBhbmQgdGhlIGxldHRlckJveCBoZWlnaHQgdG8gYWRkXHJcbiAqIEBwYXJhbSBkaW1lbnNpb24ud2lkdGggLSBpbWFnZSB3aWR0aFxyXG4gKiBAcGFyYW0gZGltZW5zaW9uLmhlaWdodCAtIGltYWdlIGhlaWdodFxyXG4gKiBAdmFyIHBhcnRzIC0gSW50ZWdlci4gVGhlIG51bWJlciBvZiBwYXJ0cyB0aGUgcGFub3JhbWEgd2lsbCBmaXQgaW4uIEl0J3Mgcm91bmQgdXAgb2Ygd2lkdGggLyBoZWlnaHRcclxuICogQHZhciBsZXR0ZXJCb3ggLSBJbnRlZ2VyLiBUaGUgbnVtYmVyIHRoYXQgd2lsbCBiZSBhZGRlZCB0byB0b3AgYW5kIGJvdHRvbSBpbiBvcmRlciB0byBoYXZlIG4gcGFydHMgb2YgMToxIHJhdGlvXHJcbiAqIEByZXR1cm5zIHsgcGFydHMsIGxldHRlckJveCB9XHJcbiAqL1xyXG5mdW5jdGlvbiBjYWxjUGFydHNBbmRMZXR0ZXJCb3goeyB3aWR0aCwgaGVpZ2h0IH0pIHtcclxuICAgIGlmIChoZWlnaHQgPj0gd2lkdGgpXHJcbiAgICAgICAgcmV0dXJuIHsgcGFydHM6IDEsIGxldHRlckJveDogMCB9O1xyXG4gICAgY29uc3QgcGFydHMgPSBNYXRoLnRydW5jKHdpZHRoIC8gaGVpZ2h0KTtcclxuICAgIGNvbnN0IGRlc2lyZWRIZWlnaHQgPSB3aWR0aCAvIHBhcnRzO1xyXG4gICAgY29uc3QgZ2FwID0gZGVzaXJlZEhlaWdodCAtIGhlaWdodDtcclxuICAgIGNvbnN0IGxldHRlckJveCA9IGdhcCAvIDI7IC8vIGRpdmlkZWQgYnkgdHdvIGFzIHdlIHdhbnQgTEJYIHZhbHVlIGZvciB0b3AgYW5kIGJvdHRvbVxyXG4gICAgY29uc29sZS5sb2coXCJzYW5pdHk6XCIsIFwid2lkdGg6XCIsIHdpZHRoLCBcImhlaWdodDpcIiwgaGVpZ2h0LCBcImNhbnZhcyBoZWlnaHQ6XCIsIGhlaWdodCArIGxldHRlckJveCAqIDIpO1xyXG4gICAgcmV0dXJuIHsgcGFydHMsIGxldHRlckJveCB9O1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/geometry.ts\n");

/***/ }),

/***/ "./src/scripts/main.ts":
/*!*****************************!*\
  !*** ./src/scripts/main.ts ***!
  \*****************************/
/*! exports provided: handleImageChange, downloadFromCanvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleImageChange\", function() { return handleImageChange; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"downloadFromCanvas\", function() { return downloadFromCanvas; });\n/* harmony import */ var _geometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./geometry */ \"./src/scripts/geometry.ts\");\n\r\nconst HIDDEN_IMAGE_ID = \"hidden-image\";\r\nconst CANVAS_ID = \"canvas\";\r\nconst INPUT_ID = \"image-picker\";\r\nfunction getHiddenImage() {\r\n    return document.getElementById(HIDDEN_IMAGE_ID);\r\n}\r\nfunction getCanvas() {\r\n    return document.getElementById(CANVAS_ID);\r\n}\r\nfunction storeImage(image) {\r\n    const imageEl = getHiddenImage();\r\n    imageEl.src = window.URL.createObjectURL(image);\r\n}\r\nfunction loadImageToCanvas(imageFile) {\r\n    let image;\r\n    let imageReader;\r\n    function createImage() {\r\n        image = new Image();\r\n        image.onload = imageLoaded;\r\n        image.src = imageReader.result;\r\n    }\r\n    function imageLoaded() {\r\n        const canvas = getCanvas();\r\n        const { scaledImageDimension, canvasDimension, parts, letterBox } = Object(_geometry__WEBPACK_IMPORTED_MODULE_0__[\"scaler\"])({\r\n            width: image.width,\r\n            height: image.height\r\n        });\r\n        canvas.width = canvasDimension.width;\r\n        canvas.height = canvasDimension.height;\r\n        const lines = Object(_geometry__WEBPACK_IMPORTED_MODULE_0__[\"calcLineCoordinates\"])({ width: canvas.width, height: canvas.height }, parts);\r\n        const ctx = canvas.getContext(\"2d\");\r\n        ctx.fillStyle = \"white\";\r\n        ctx.fillRect(0, 0, canvas.width, canvas.height);\r\n        ctx.drawImage(image, 0, letterBox, scaledImageDimension.width, scaledImageDimension.height);\r\n        ctx.strokeStyle = \"rgba(255, 0, 0, 0.7)\"; // red with transparency\r\n        ctx.setLineDash([20, 5]);\r\n        lines.forEach(({ start, end }) => {\r\n            ctx.beginPath();\r\n            ctx.moveTo(start.x, start.y);\r\n            ctx.lineTo(end.x, end.y);\r\n            ctx.stroke();\r\n        });\r\n    }\r\n    imageReader = new FileReader();\r\n    imageReader.onload = createImage;\r\n    imageReader.readAsDataURL(imageFile);\r\n}\r\nfunction handleImageChange(fileInput) {\r\n    const file = fileInput.files[0];\r\n    if (file) {\r\n        storeImage(file);\r\n        loadImageToCanvas(file);\r\n    }\r\n}\r\nfunction downloadFromCanvas() {\r\n    const canvas = getCanvas();\r\n    const img = canvas.toDataURL(\"image/png\"); // TODO \"image/jpeg\"\r\n    const currentHref = window.location.href;\r\n    window.location.href = img.replace(\"image/png\", \"image/octet-stream\");\r\n    window.location.href = currentHref;\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvc2NyaXB0cy9tYWluLnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGFub1NsaWNlci8uL3NyYy9zY3JpcHRzL21haW4udHM/M2JlYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjYWxjTGluZUNvb3JkaW5hdGVzLCBzY2FsZXIgfSBmcm9tIFwiLi9nZW9tZXRyeVwiO1xyXG5jb25zdCBISURERU5fSU1BR0VfSUQgPSBcImhpZGRlbi1pbWFnZVwiO1xyXG5jb25zdCBDQU5WQVNfSUQgPSBcImNhbnZhc1wiO1xyXG5jb25zdCBJTlBVVF9JRCA9IFwiaW1hZ2UtcGlja2VyXCI7XHJcbmZ1bmN0aW9uIGdldEhpZGRlbkltYWdlKCkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKEhJRERFTl9JTUFHRV9JRCk7XHJcbn1cclxuZnVuY3Rpb24gZ2V0Q2FudmFzKCkge1xyXG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKENBTlZBU19JRCk7XHJcbn1cclxuZnVuY3Rpb24gc3RvcmVJbWFnZShpbWFnZSkge1xyXG4gICAgY29uc3QgaW1hZ2VFbCA9IGdldEhpZGRlbkltYWdlKCk7XHJcbiAgICBpbWFnZUVsLnNyYyA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGltYWdlKTtcclxufVxyXG5mdW5jdGlvbiBsb2FkSW1hZ2VUb0NhbnZhcyhpbWFnZUZpbGUpIHtcclxuICAgIGxldCBpbWFnZTtcclxuICAgIGxldCBpbWFnZVJlYWRlcjtcclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUltYWdlKCkge1xyXG4gICAgICAgIGltYWdlID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gaW1hZ2VMb2FkZWQ7XHJcbiAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2VSZWFkZXIucmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gaW1hZ2VMb2FkZWQoKSB7XHJcbiAgICAgICAgY29uc3QgY2FudmFzID0gZ2V0Q2FudmFzKCk7XHJcbiAgICAgICAgY29uc3QgeyBzY2FsZWRJbWFnZURpbWVuc2lvbiwgY2FudmFzRGltZW5zaW9uLCBwYXJ0cywgbGV0dGVyQm94IH0gPSBzY2FsZXIoe1xyXG4gICAgICAgICAgICB3aWR0aDogaW1hZ2Uud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogaW1hZ2UuaGVpZ2h0XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2FudmFzLndpZHRoID0gY2FudmFzRGltZW5zaW9uLndpZHRoO1xyXG4gICAgICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXNEaW1lbnNpb24uaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IGxpbmVzID0gY2FsY0xpbmVDb29yZGluYXRlcyh7IHdpZHRoOiBjYW52YXMud2lkdGgsIGhlaWdodDogY2FudmFzLmhlaWdodCB9LCBwYXJ0cyk7XHJcbiAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xyXG4gICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIGxldHRlckJveCwgc2NhbGVkSW1hZ2VEaW1lbnNpb24ud2lkdGgsIHNjYWxlZEltYWdlRGltZW5zaW9uLmhlaWdodCk7XHJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCJyZ2JhKDI1NSwgMCwgMCwgMC43KVwiOyAvLyByZWQgd2l0aCB0cmFuc3BhcmVuY3lcclxuICAgICAgICBjdHguc2V0TGluZURhc2goWzIwLCA1XSk7XHJcbiAgICAgICAgbGluZXMuZm9yRWFjaCgoeyBzdGFydCwgZW5kIH0pID0+IHtcclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHN0YXJ0LngsIHN0YXJ0LnkpO1xyXG4gICAgICAgICAgICBjdHgubGluZVRvKGVuZC54LCBlbmQueSk7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGltYWdlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgIGltYWdlUmVhZGVyLm9ubG9hZCA9IGNyZWF0ZUltYWdlO1xyXG4gICAgaW1hZ2VSZWFkZXIucmVhZEFzRGF0YVVSTChpbWFnZUZpbGUpO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVJbWFnZUNoYW5nZShmaWxlSW5wdXQpIHtcclxuICAgIGNvbnN0IGZpbGUgPSBmaWxlSW5wdXQuZmlsZXNbMF07XHJcbiAgICBpZiAoZmlsZSkge1xyXG4gICAgICAgIHN0b3JlSW1hZ2UoZmlsZSk7XHJcbiAgICAgICAgbG9hZEltYWdlVG9DYW52YXMoZmlsZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkRnJvbUNhbnZhcygpIHtcclxuICAgIGNvbnN0IGNhbnZhcyA9IGdldENhbnZhcygpO1xyXG4gICAgY29uc3QgaW1nID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTsgLy8gVE9ETyBcImltYWdlL2pwZWdcIlxyXG4gICAgY29uc3QgY3VycmVudEhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaW1nLnJlcGxhY2UoXCJpbWFnZS9wbmdcIiwgXCJpbWFnZS9vY3RldC1zdHJlYW1cIik7XHJcbiAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGN1cnJlbnRIcmVmO1xyXG59XHJcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/main.ts\n");

/***/ })

/******/ });