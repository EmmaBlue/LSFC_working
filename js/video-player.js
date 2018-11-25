(() => {
  
    //! VARIABLES
    const bckgrdVideo = document.querySelector('.bg-video__content'),
    videoScreen = document.querySelector('.videoScreen'),
    closeLightbox = videoScreen.querySelector('.close-videoScreen'),
    vidPlayer = document.querySelector('#videoElement'),
    playPause = document.querySelector('.play-pause'),
    rWnd = document.querySelector('.rewindToStart'),
    clipBar = document.querySelector('#clipBar'),
    clipTiming = document.querySelector('#clipTiming'),
    muteBtn = document.querySelector('#muteBtn'),
    volumeBar = document.querySelector('#volumeBar'),
    playBtn = document.querySelector('#playBtn');
  
    //! FUNCTIONS
  
    // videoSource function creates <source> video element to dynamically different video size
    function videoSource(element, src, type) {
      var source = document.createElement('source');
  
      source.src = src;
      source.type = type;
  
      element.appendChild(source);
    }
  
    // LOAD VIDEO SCREEN
    function loadMovie() {
  
      // Turn videoScreen on, reset clip bar and volume
      videoScreen.classList.add('show-videoPlayer');
      clipBar.value = 0;
      volumeBar.value = 0.6;
      vidPlayer.volume = 0.6;
  
      // add video source according to screen size
      if (window.matchMedia("(max-width: 700px)").matches) {
        videoSource(vidPlayer, 'video/lsfcvideo-mobile.mp4', 'video/mp4');
      } else if (window.matchMedia("(max-width: 999px)").matches) {
        videoSource(vidPlayer, 'video/lsfcvideo-tablet.mp4', 'video/mp4');
      } else if (window.matchMedia("(min-width: 1000px)").matches) {
        videoSource(vidPlayer, 'video/lsfcvideo-desktop.mp4', 'video/mp4');
      }
  
  
      vidPlayer.load();
      vidPlayer.play();
  
      showTime();
    }
  
  
    // Show current time in m:s and move time range bar.
    function showTime() {
      // update range bar time location based on time
      var clipBarValue = vidPlayer.currentTime * (100 / vidPlayer.duration);
      clipBar.value = clipBarValue;
      // convert currentTime and Duration in min:sec
      var curmins = Math.floor(vidPlayer.currentTime / 60);
      var cursecs = Math.floor(vidPlayer.currentTime - curmins * 60);
      var durmins = Math.floor(vidPlayer.duration / 60);
      var dursecs = Math.floor(vidPlayer.duration - durmins * 60);
      if (cursecs < 10) {
        cursecs = "0" + cursecs;
      }
      if (dursecs < 10) {
        dursecs = "0" + dursecs;
      }
      if (curmins < 10) {
        curmins = "0" + curmins;
      }
      if (durmins < 10) {
        durmins = "0" + durmins;
      }
      // display to player
      let clipTime = curmins + ":" + cursecs;
      let clipDur = durmins + ":" + dursecs;
      clipTiming.textContent = `${clipTime} / ${clipDur}`;
    }
  
    // CLOSE VIDEO SCREEN
    function closeBox() {
      videoScreen.classList.remove('show-videoPlayer');
      vidPlayer.pause();
      vidPlayer.currentTime = 0;
      clipBar.value = 0;
    }
  
    // Play/Pause btn
    function togglePlay() {
      var theSVG = this.firstElementChild;
  
      if (vidPlayer.paused) {
        theSVG.classList = "fas fa-pause";
        vidPlayer.play();
      } else {
        theSVG.classList = "fas fa-play";
        vidPlayer.pause();
      }
    }
  
    // REWIND VID
    function rWindVid() {
      vidPlayer.currentTime = 0;
      clipBar.value = 0;
    }
  
    // UPDATE TIME on VIDEO PLAYER
    function updateTime() {
      let time = vidPlayer.duration * (clipBar.value / 100);
      vidPlayer.currentTime = time;
  
      // update bar value matching clip time
      vidPlayer.addEventListener('timeuppdate', () => {
        // slider value
        let sliderValue = (100 / vidPlayer.duration) * vidPlayer.currentTime;
        clipBar.value = sliderValue;
      });
  
      // pause video when moving slider
      clipBar.addEventListener('mousedown', () => {
        vidPlayer.pause();
      });
      // play back video when mouseup after slider move
      clipBar.addEventListener('mouseup', () => {
        vidPlayer.play();
      });
    }
  
    // MUTE VIDEOCLIP
    function muteMe() {
      var theVolumeSVG = this.firstElementChild;
      if (vidPlayer.muted) {
        vidPlayer.muted = false;
        theVolumeSVG.classList = "fas fa-volume-up";
        volumeBar.value = 0.6;
        vidPlayer.volume = 0.6;
      } else {
        vidPlayer.muted = true;
        theVolumeSVG.classList = "fas fa-volume-off";
        volumeBar.value = 0;
        vidPlayer.volume = 0;
      }
    }
  
    // UPDATE VOLUME ON volume bar
    function changeVolume() {
      vidPlayer.volume = volumeBar.value;
    }
  
  
    //! EVENTS
    window.addEventListener('load', () => {
  
      // create source video element according to screen size
      if (window.matchMedia("(max-width: 399px) and (min-height: 500px)").matches) {
        videoSource(bckgrdVideo, 'video/lsfcvideo-mobilelarge-loop.mp4', 'video/mp4');
      } 

      else if (window.matchMedia("(max-width: 399px) and (max-height: 499px)").matches) {
        videoSource(bckgrdVideo, 'video/lsfcvideo-tablet-loop.mp4', 'video/mp4');
      }
        else if (window.matchMedia("(max-width: 999px)").matches) {
        videoSource(bckgrdVideo, 'video/lsfcvideo-tablet-loop.mp4', 'video/mp4');
      } else if (window.matchMedia("(min-width: 1000px)").matches) {
        videoSource(bckgrdVideo, 'video/lsfcvideo-desktop-loop.mp4', 'video/mp4');
      }
  
    });

    // EVENT LISTENERS 
  
    playBtn.addEventListener('click', (loadMovie));
    closeLightbox.addEventListener('click', closeBox);
    vidPlayer.addEventListener('ended', closeBox);
    playPause.addEventListener('click', togglePlay);
    rWnd.addEventListener('click', rWindVid);
    clipBar.addEventListener('change', updateTime);
    vidPlayer.addEventListener('timeupdate', showTime);
    muteBtn.addEventListener('click', muteMe);
    volumeBar.addEventListener('change', changeVolume);
  
  })();