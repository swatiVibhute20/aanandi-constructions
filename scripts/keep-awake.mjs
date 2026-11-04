const url = (process.env.RENDER_URL || process.argv[2] || "").trim();

if (!url) {
  console.error("Set RENDER_URL to the onrender.com address.");
  process.exit(1);
}

const response = await fetch(url, { signal: AbortSignal.timeout(90_000) });
console.log(`${response.status} ${url}`);
if (!response.ok) process.exit(1);
