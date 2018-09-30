// JavaScript Document

//Functional code, just currently having difficulty making it responsive
(function(){
	"use strict";
	console.log("SEAF Fired");

//Variables

	var teamSlide = document.querySelector("#slideshow");
	var clickList = document.querySelectorAll(".first");
	var offSet = 250;


//Functions

	//To swap which bios are displayed and refresh the extra paragraphs to display none each time the bios are swapped
	function moveSlide(evt) {

		teamSlide.style.right = (offSet*evt.currentTarget.dataset.offset) + "px";
		console.log(evt.currentTarget.dataset.offset);
	}

//Listeners

	//When a slider nav is clicked, fire moveSlide function
	for (var i=0; i<clickList.length; i++) {

		clickList[i].addEventListener("click", moveSlide, false);
	}

 })();
