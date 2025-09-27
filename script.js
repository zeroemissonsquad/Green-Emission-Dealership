document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".media-wrapper");

  wrappers.forEach(wrapper => {
    const video = wrapper.querySelector("video");
    const img = wrapper.querySelector("img");

    if (!video) return; 


    video.muted = true;
    video.playsInline = true; 
    video.preload = video.getAttribute('preload') || 'metadata';


    const source = video.querySelector("source");
    const dataSrc = source && (source.getAttribute("data-src") || source.getAttribute("data-src-mp4"));
    const realSrc = source && source.getAttribute("src");

    let loaded = false;
    function lazyLoad() {
      if (loaded) return;
    
      if (dataSrc && !realSrc) {
        source.setAttribute("src", dataSrc);
      }

      const videoData = video.getAttribute("data-src");
      if (videoData && !video.getAttribute("src")) {
        video.setAttribute("src", videoData);
      }
      try { video.load(); } catch (e) { /* ignore */ }
      loaded = true;
    }

    function playVideo() {
      lazyLoad();
      try {
        video.currentTime = 0;
        const p = video.play();
        if (p && p.catch) p.catch(()=>{}); 
      } catch (e) { /* ignore playback errors */ }
    }

    function pauseVideo() {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (e) { /* ignore */ }
    }

    wrapper.addEventListener("mouseenter", playVideo);
    wrapper.addEventListener("mousemove", () => {
      if (video.paused) playVideo();
    });

    wrapper.addEventListener("mouseleave", pauseVideo);

    wrapper.addEventListener("touchstart", (ev) => {
      ev.preventDefault();
      lazyLoad();
      if (video.paused) {
        playVideo();
      } else {
        pauseVideo();
      }
    }, { passive: false });
  });
});