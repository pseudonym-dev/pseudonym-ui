const RAMP = " .:-=+*#%@";

/**
 * A deterministic ASCII field (interference of two radial waves), handy as a
 * placeholder "render" in heroes, auth screens and editor canvases.
 */
export function asciiField(cols: number, rows: number, phase = 0) {
  const lines: string[] = [];
  for (let y = 0; y < rows; y++) {
    let line = "";
    for (let x = 0; x < cols; x++) {
      const nx = x / cols - 0.5;
      const ny = (y / rows - 0.5) * 0.55;
      const a = Math.sin(Math.hypot(nx + 0.18, ny) * 26 - phase);
      const b = Math.cos(Math.hypot(nx - 0.22, ny + 0.08) * 19 + phase);
      const fade = 1 - Math.min(1, Math.hypot(nx, ny * 1.6) * 1.55);
      const v = ((a + b) / 4 + 0.5) * fade;
      line += RAMP[Math.max(0, Math.min(RAMP.length - 1, Math.floor(v * RAMP.length)))];
    }
    lines.push(line);
  }
  return lines.join("\n");
}
