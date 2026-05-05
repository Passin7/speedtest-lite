async function startTest() {
  const url = "https://speed.hetzner.de/10MB.bin"; // public test file

  const start = performance.now();

  const res = await fetch(url);
  const reader = res.body.getReader();

  let total = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    total += value.length;

    const time = (performance.now() - start) / 1000;
    const speed = (total * 8) / (time * 1024 * 1024);

    document.getElementById("speed").innerText =
      speed.toFixed(2) + " Mbps";
  }
}