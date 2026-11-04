function makeGrain() {
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  let circles = "";
  for (let i = 0; i < 80; i += 1) {
    const x = (rand() * 160).toFixed(1);
    const y = (rand() * 160).toFixed(1);
    const r = (rand() * 0.65 + 0.2).toFixed(2);
    const o = (rand() * 0.4 + 0.15).toFixed(2);
    circles += `<circle cx="${x}" cy="${y}" r="${r}" opacity="${o}"/>`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><g fill="#2B2118">${circles}</g></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

const grainUri = makeGrain();

export function PaperGrain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] opacity-[0.11] mix-blend-multiply"
      style={{ backgroundImage: `url("${grainUri}")`, backgroundSize: "180px 180px" }}
    />
  );
}
