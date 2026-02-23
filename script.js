const copyButton = document.getElementById("copy-ca");
const pumpButton = document.getElementById("pump-link");

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

// Live token config.
setLiveLinks({
  contractAddress: "8Rmtj9qDuUUVzNPFmSrHQXqYGoBZjw6aWedgP3VNpump",
  pumpUrl: "https://pump.fun/coin/8Rmtj9qDuUUVzNPFmSrHQXqYGoBZjw6aWedgP3VNpump",
});
