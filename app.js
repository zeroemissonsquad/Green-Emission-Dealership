document.addEventListener("DOMContentLoaded", () => {
  // select all wrappers that contain an <img> and <video>
  const wrappers = document.querySelectorAll(".media-wrapper");

  wrappers.forEach(wrapper => {
    const video = wrapper.querySelector("video");
    const img = wrapper.querySelector("img");

    if (!video) return; // skip if no video

    // ensure autoplay-friendly flags
    video.muted = true;
    video.playsInline = true; // important for mobile
    video.preload = video.getAttribute('preload') || 'metadata';

    // If the <source> is present but we want to lazy-load, support data-src pattern
    // (if you have source src already set, this does nothing)
    const source = video.querySelector("source");
    const dataSrc = source && (source.getAttribute("data-src") || source.getAttribute("data-src-mp4"));
    const realSrc = source && source.getAttribute("src");

    let loaded = false;
    function lazyLoad() {
      if (loaded) return;
      // prefer data-src if provided
      if (dataSrc && !realSrc) {
        source.setAttribute("src", dataSrc);
      }
      // if video tag has data-src attribute
      const videoData = video.getAttribute("data-src");
      if (videoData && !video.getAttribute("src")) {
        video.setAttribute("src", videoData);
      }
      try { video.load(); } catch (e) { /* ignore */ }
      loaded = true;
    }

    // Play on mouseenter (or when user moves over the wrapper)
    function playVideo() {
      lazyLoad();
      try {
        video.currentTime = 0;
        const p = video.play();
        if (p && p.catch) p.catch(()=>{}); // avoid console errors
      } catch (e) { /* ignore playback errors */ }
    }

    function pauseVideo() {
      try {
        video.pause();
        video.currentTime = 0;
      } catch (e) { /* ignore */ }
    }

    // mouseenter / mousemove start playback (mousemove ensures playing if someone rapidly moves)
    wrapper.addEventListener("mouseenter", playVideo);
    wrapper.addEventListener("mousemove", () => {
      if (video.paused) playVideo();
    });

    // mouseleave stops and resets
    wrapper.addEventListener("mouseleave", pauseVideo);

    // touch support: toggle play/pause on first tap
    wrapper.addEventListener("touchstart", (ev) => {
      ev.preventDefault(); // prevent double-tap zoom
      lazyLoad();
      if (video.paused) {
        playVideo();
      } else {
        pauseVideo();
      }
    }, { passive: false });
  });
});
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