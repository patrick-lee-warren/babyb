const copyButton = document.getElementById("copy-ca");
const pumpButton = document.getElementById("pump-link");
const themeAudio = document.getElementById("theme-audio");
const floatingPlayButton = document.getElementById("floating-play");
const floatingMuteButton = document.getElementById("floating-mute");
const heroPlayButton = document.getElementById("hero-play-theme");

const setLiveLinks = ({ contractAddress, pumpUrl }) => {
  if (contractAddress) {
    copyButton.disabled = false;
    copyButton.textContent = `Contract Address: ${contractAddress}`;
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(contractAddress);
        copyButton.textContent = "Copied contract address";
        setTimeout(() => {
          copyButton.textContent = `Contract Address: ${contractAddress}`;
        }, 1600);
      } catch (err) {
        copyButton.textContent = "Copy failed";
      }
    });
  }

  if (pumpUrl) {
    pumpButton.disabled = false;
    pumpButton.textContent = "Buy on pump.fun";
    pumpButton.addEventListener("click", () => {
      window.open(pumpUrl, "_blank", "noopener,noreferrer");
    });
  }
};

const setupFloatingAudioControls = () => {
  if (!themeAudio || !floatingPlayButton || !floatingMuteButton) return;

  const syncAudioUi = () => {
    floatingPlayButton.textContent = themeAudio.paused ? "Play" : "Pause";
    floatingMuteButton.textContent = themeAudio.muted ? "Unmute" : "Mute";
    if (heroPlayButton) {
      heroPlayButton.textContent = themeAudio.paused ? "Play Theme Song" : "Pause Theme Song";
    }
  };

  const togglePlayback = async () => {
    if (themeAudio.paused) {
      try {
        await themeAudio.play();
      } catch (err) {
        floatingPlayButton.textContent = "Tap again";
        if (heroPlayButton) heroPlayButton.textContent = "Tap again";
        setTimeout(syncAudioUi, 1200);
      }
    } else {
      themeAudio.pause();
    }
    syncAudioUi();
  };

  floatingPlayButton.addEventListener("click", togglePlayback);
  if (heroPlayButton) heroPlayButton.addEventListener("click", togglePlayback);

  floatingMuteButton.addEventListener("click", () => {
    themeAudio.muted = !themeAudio.muted;
    syncAudioUi();
  });

  themeAudio.addEventListener("play", syncAudioUi);
  themeAudio.addEventListener("pause", syncAudioUi);
  themeAudio.addEventListener("volumechange", syncAudioUi);

  syncAudioUi();
};

// Live token config.
setLiveLinks({
  contractAddress: "8Rmtj9qDuUUVzNPFmSrHQXqYGoBZjw6aWedgP3VNpump",
  pumpUrl: "https://pump.fun/coin/8Rmtj9qDuUUVzNPFmSrHQXqYGoBZjw6aWedgP3VNpump",
});

setupFloatingAudioControls();
