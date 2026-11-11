function gt9MotionFallback(error) {
  console.warn("[GT9 motion] Animation layer could not start.", error || "");
  const root = document.documentElement;
  root.classList.remove("js");
  root.classList.add("is-loaded");
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-visible"));
}

(async function loadGT9Motion() {
  const root = document.documentElement;
  try {
    if (!("DecompressionStream" in window)) throw new Error("Gzip decompression is not supported by this browser.");
    const response = await fetch("motion.data", { cache: "force-cache" });
    if (!response.ok || !response.body) throw new Error("Motion asset could not be loaded.");
    const decompressed = response.body.pipeThrough(new DecompressionStream("gzip"));
    const source = await new Response(decompressed).text();
    const blobUrl = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
    const runtime = document.createElement("script");
    runtime.src = blobUrl;
    runtime.onload = () => URL.revokeObjectURL(blobUrl);
    runtime.onerror = () => {
      URL.revokeObjectURL(blobUrl);
      gt9MotionFallback(new Error("Motion runtime failed to execute."));
    };
    document.body.appendChild(runtime);
  } catch (error) {
    gt9MotionFallback(error);
  }
})();
