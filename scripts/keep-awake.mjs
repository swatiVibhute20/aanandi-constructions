const url = (process.env.RENDER_URL || process.argv[2] || "").trim();

if (!url) {
  console.error("Set RENDER_URL to the onrender.com address.");
  process.exit(1);
}

const attempts = 3;
const timeoutMs = 120_000;

for (let attempt = 1; attempt <= attempts; attempt += 1) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
    console.log(`${response.status} ${url} (attempt ${attempt})`);
    if (response.ok) process.exit(0);
    console.error(`Render answered ${response.status}.`);
  } catch (error) {
    const message = error instanceof Error ? error.name : "Error";
    console.error(`Attempt ${attempt} did not get a response (${message}).`);
  }
  if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 20_000));
}

process.exit(1);
