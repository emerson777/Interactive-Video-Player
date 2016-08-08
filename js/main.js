window.onload = function(){

var video = document.getElementById("vid");
var playBtn = document.getElementById("play-pause");
var pauseBtn = document.getElementById("pause");
var replay = document.getElementById("replay");
var muteBtn = document.getElementById("mute");
var volume = document.getElementById("volume");
var fullsc = document.getElementById("full-screen");
var vidControls = document.getElementById('vid-controls');
var vidContainer = document.querySelector(".vid-con");
var overlay = document.getElementById("overlay");
var gear = document.getElementById("gear");
var backArrow = document.getElementById("back-ar");
var progressBar = document.getElementById('progress-bar');
var timeContainer = document.getElementById("time-container");
var timeStart = document.getElementById("timeStart");
var totalTime = document.getElementById("totalTime");
var cc = document.getElementById("cc");
var buffer = document.getElementById("buffer");
var script = document.querySelectorAll(".script li");
var speedOne = document.getElementById("onex");
var speedOneText = document.getElementById("one");
var speedTwo = document.getElementById("twox");
var speedTwoText = document.getElementById("two");
var forward = document.getElementById("ff");
var backwards = document.getElementById("fback");


//TIME BAR SHOW AND HIDE

timeContainer.classList.add("hide");
pauseBtn.classList.add("no-visible");
overlay.className= "no-visible";
replay.classList.add("no-visible");



//Hover 

vidContainer.addEventListener("mouseover", function() {
      if(video.paused !== true && screen.width > 1336) {
        pauseBtn.classList.remove("no-visible");
        vidControls.classList.remove("visible");
      }
     
});

vidContainer.addEventListener("mouseout", function() {

    if(video.paused !== true && screen.width > 1336) {
        pauseBtn.classList.add("no-visible");
        vidControls.classList.add("no-visible");
    }
    
});



function hidePauseBtn(){
	setTimeout(function(){
		pauseBtn.classList.add("no-visible");
	}, 1500);

}

vidContainer.addEventListener("mouseover", function() {
  vidControls.classList.remove("no-visible");

});


//PLAY BUTTON


function playVideo() {
      if(video.paused === true) {
          video.play();
          pauseBtn.classList.remove("no-visible");
          playBtn.classList.add("no-visible");
          timeContainer.classList.remove("hide");
          replay.classList.add("no-visible");
          hidePauseBtn(); 
           
    	}else{
      		video.pause();
          playBtn.classList.remove("no-visible");
          pauseBtn.classList.add("no-visible");
          vidControls.classList.remove("no-visible");
          gear.style.opacity = "1"; 
    	 }
}


function showScript () {
    for (var i = 0; i < script.length; i++){
      script[i].classList.remove("hidden");
    }
  
}

playBtn.addEventListener("click", playVideo, false);
video.addEventListener("click", playVideo, false);
replay.addEventListener("click", playVideo, false);
replay.addEventListener("click", showScript, false);


//PAUSE BUTTON

pauseBtn.addEventListener("click", function() {
	if(video.paused === false) {
		video.pause();
		playBtn.classList.remove("no-visible");
		pauseBtn.classList.add("no-visible");
	}

});


//Video Buffer

video.addEventListener("timeupdate", function updateBuffer() {
   	    var duration = video.duration;
   	    var buffered = video.buffered.end(0);
        var bufferPercent = (buffered/ duration) * 100;
        buffer.style.width = bufferPercent + "%";
    });
  
 
//Video Time

video.addEventListener("timeupdate", function updateCurrentTime() {
        var percentage = (video.currentTime / video.duration) * 100;
         progressBar.style.width = percentage + "%";
    });

  

 function updateTime() {
        var timeDrag = false;
           function updatebar(x) {
                var progress = timeContainer;
                var maxDuration = video.duration;
                var position = x - progress.parentNode.offsetLeft;
                var percentage = (position / progress.offsetWidth) * 100;

                progressBar.style.width = percentage + "%";
                video.currentTime = maxDuration * percentage / 100;
            }
			timeContainer.addEventListener("mousedown", function(e) {
			         timeDrag = true;
			            updatebar(e.pageX);
			            playVideo();
        
			        });

			document.addEventListener("mouseup", function(e) {
			            if (timeDrag) {
			                timeDrag = false;
			                updatebar(e.pageX);
			                playVideo();
			            }
			        });
			 document.addEventListener("mousemove", function(e) {
			            if (timeDrag) {
			                updatebar(e.pageX);
			            }
			        });
			    }

updateTime();




//Time Update, Minutes and Seconds

function timeUp() {
    var minutes = Math.floor(video.currentTime / 60);
    var seconds = Math.floor(video.currentTime - minutes / 60);
    var totMinutes = Math.floor(video.duration / 60);
    var totSeconds = Math.floor(video.duration - totMinutes / 60);

           if (seconds < 10) {
            seconds = "0" + seconds;
           }
           if (totSeconds < 10) {
            totSeconds = "0" + totSeconds;
           }
           
           if (minutes < 10) {
            minutes = "0" + minutes;
           }
           
           if (totMinutes < 10) {
            totMinutes = "0" + totMinutes;
           }
         
  timeStart.innerHTML = minutes + ":" + seconds;
  totalTime.innerHTML = totMinutes + ":" + totSeconds;
}

video.addEventListener("timeupdate",timeUp, false);



//Skip Buttons

forward.addEventListener("click", function() {
         if(!video.paused) {
              video.currentTime += 10;
         }
});


backwards.addEventListener("click", function() {
         if(!video.paused) {
              video.currentTime += -10;
         }
});




//MUTE BUTTON

muteBtn.addEventListener("click", function() {
	if (video.muted === false) {
		video.muted = true;
		muteBtn.classList.add("selected");
		muteBtn.classList.remove("deselected");
    volume.value = 0;
	}else {
		video.muted = false;
		muteBtn.classList.remove("selected");
		muteBtn.classList.add("deselected");
    volume.value = video.volume * 100 ;
	}
});



volume.addEventListener("change", setVolume, false);



//Volume

function setVolume () {
    video.volume = volume.value / 100;

       if (video.volume === 0) {
        muteBtn.classList.add("selected");
        muteBtn.classList.remove("deselected");
       }
       else {
        muteBtn.classList.remove("selected");
        muteBtn.classList.add("deselected");
        video.muted = false;
       }
}




//OVERLAY


//Gear
gear.addEventListener("click", function() {
	overlay.classList.remove("no-visible");
  gear.classList.add("no-visible");
});


//Back Arrow

backArrow.addEventListener("click", function(){
	  overlay.classList.add("no-visible");
    gear.classList.remove("no-visible");
});


//FULL SCREEN


fullsc.addEventListener("click", function() {
   if(video.requestFullscreen){
      video.requestFullscreen();
   } else if(video.mozRequestFullScreen) {
   	 video.mozRequestFullScreen();
   } else if (video.webkitRequestFullScreen){
     video.webkitRequestFullScreen();
     } else if(video.msRequestFullscreen){
     video.msRequestFullscreen();

     }
});



//CAPTION

video.textTracks[0].mode = "hidden";
 
cc.addEventListener("click", function() {

	if (video.textTracks[0].mode === "hidden") {
       video.textTracks[0].mode = "showing";
       cc.classList.add("selected");
	}
	else {
		video.textTracks[0].mode = "hidden";
	     cc.classList.remove("selected");
	}
    	
});


video.addEventListener("ended", end, false);



function end() {
  replay.classList.remove("no-visible");  
  vidControls.classList.remove("no-visible");       
}



//TRANSCRIPT 

function  transcript() {
	var time = video.currentTime;
	if (time > 0 && time < 4.130) {
		script[0].classList.add('hightlight');	
    } else {
    	script[0].classList.remove('hightlight');
    }
    if (time > 4.130 && time < 7.535) {
		script[1].classList.add('hightlight');
    } else {
    	script[1].classList.remove('hightlight');
    }
    if (time > 7.535 && time < 11.270) {
		script[2].classList.add('hightlight');
    } else {
    	script[2].classList.remove('hightlight');
    }
    if (time > 11.270 && time < 13.960) {
		script[3].classList.add('hightlight');
    } else {
    	script[3].classList.remove('hightlight');
    }
    if (time > 13.960 && time < 17.940) {
		script[4].classList.add('hightlight');
    } else {
    	script[4].classList.remove('hightlight');
    }
     if (time > 17.940 && time < 22.370) {
		script[5].classList.add('hightlight');
    } else {
    	script[5].classList.remove('hightlight');
    }
     if (time > 22.370 && time < 26.880) {

		script[6].classList.add('hightlight');
    } else {
    	script[6].classList.remove('hightlight');
    }
      if (time > 26.880 && time < 30.920) {
    	
		script[7].classList.add('hightlight');
    } else {
    	script[7].classList.remove('hightlight');
    }
     if (time > 30.920 && time < 34.730) {
    	
		script[8].classList.add('hightlight');
    } else {
    	script[8].classList.remove('hightlight');
    }
      if (time > 34.730 && time < 39.430) {
    	
		script[9].classList.add('hightlight');
    } else {
    	script[9].classList.remove('hightlight');
    }
      if (time > 39.430 && time < 41.190) {
    	
		script[10].classList.add('hightlight');
    } else {
    	script[10].classList.remove('hightlight');
    }
     if (time > 41.190 && time < 46.300) {
    
		script[11].classList.add('hightlight');
    } else {
    	script[11].classList.remove('hightlight');
    }
      if (time > 46.300 && time < 49.270) {
    	
		script[12].classList.add('hightlight');
    } else {
    	script[12].classList.remove('hightlight');
    }
     if (time > 49.270 && time < 53.760) {
    	
		script[13].classList.add('hightlight');
    } else {
    	script[13].classList.remove('hightlight');
    }
      if (time > 53.760 && time < 57.780) {
    	
		script[14].classList.add('hightlight');
    } else {
    	script[14].classList.remove('hightlight');
    }
     if (time > 57.779) {
  
		script[15].classList.add('hightlight');
    } else {
    	script[15].classList.remove('hightlight');
    }
}

video.addEventListener('timeupdate', transcript);


function transcriptLinks() {
     script[0].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 0;
          video.play();
        }
     });
    script[1].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 4.130;
          video.play();
        }
     });
    script[2].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 7.535;
          video.play();
        }
     });
    script[3].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 11.270;
          video.play();
        }
     });
     script[4].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 13.960;
          video.play();
        }
     });
     script[5].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 17.940;
          video.play();
        }
     });
       script[6].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 22.370;
          video.play();
        }
     });
        script[7].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 26.880;
          video.play();
        }
     });
       script[8].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 30.920;
          video.play();
        }
     });
         script[9].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 34.730;
          video.play();
        }
     });
      script[10].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 39.430;
          video.play();
        }
     });
       script[11].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 41.190;
          video.play();
        }
     });
         script[12].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 46.300;
          video.play();
        }
     });
       script[13].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 49.270;
          video.play();
        }
     });
        script[14].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 53.760;
          video.play();
        }
     });
       script[15].addEventListener("click", function () {
      if (!video.paused) {
          video.currentTime = 57.780;
          video.play();
        }
     });
}

transcriptLinks();





speedOne.addEventListener("click", function() {
   if (video.playbackRate === 1 || video.playbackRate === 1.50) {
       video.playbackRate  = 1.25;
       speedOne.classList.add("selected");
       speedOneText.classList.add("selected");
       speedTwo.classList.remove("selected"); 
       speedTwoText.classList.remove("selected");  
   }else {
     video.playbackRate  = 1;
     speedOne.classList.remove("selected");
     speedOneText.classList.remove("selected");
   }
});


speedTwo.addEventListener("click", function() {
     if (video.playbackRate === 1 || video.playbackRate === 1.25) {
       video.playbackRate  = 1.50;
       speedTwo.classList.add("selected");
       speedOne.classList.remove("selected");
       speedOneText.classList.remove("selected");
       speedTwoText.classList.add("selected");
   }else {
     video.playbackRate  = 1;
     speedTwo.classList.remove("selected");
     speedTwoText.classList.remove("selected");
   }
});

};


