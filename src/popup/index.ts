import "./index.css";
import { fromBase64, fromUint8Array, toBase64, toUint8Array } from "js-base64";
import mermaid from "mermaid";
import pako from "pako";

const getSummaryResponse = async () => {
	// let summarizeText = "";
	const tab = await chrome.tabs.query({ active: true, currentWindow: true });
	const summarizeText = await chrome.tabs.sendMessage(tab[0].id, {
		type: "SUMMARIZE",
	});

	return summarizeText;
};

document.addEventListener("DOMContentLoaded", async () => {
	// const appElement = document.getElementsByClassName("mermaid");
	const appElement = document.getElementById("app");

	// Initialize Mermaid.js
	// mermaid.initialize({ startOnLoad: false });

	// Define Mermaid code
	const mermaidCode = await getSummaryResponse();

	// Dynamically create a container with Mermaid code

	const { svg } = await mermaid.render("id1", mermaidCode, appElement);

	const canvas = document.createElement("canvas");
	const pngDisplay = document.getElementById("png-display") as HTMLImageElement;

	const svgBlob = new Blob([svg], { type: "image/svg+xml" });
	const url = URL.createObjectURL(svgBlob);

	const scale = 3;
	const img = new Image();
	img.onload = () => {
		// Set canvas dimensions to match the SVG
		canvas.width = img.width * scale;
		canvas.height = img.height * scale;

		const ctx = canvas.getContext("2d");
		if (ctx) {
			// ctx.scale(scale, scale);
			ctx.drawImage(img, 0, 0);

			// Step 3: Convert Canvas to PNG and Show
			pngDisplay.src = canvas.toDataURL("image/png");
		}

		URL.revokeObjectURL(url); // Clean up URL object
	};

	img.src = url;

	const editLink = document.getElementById("edit-link") as HTMLAnchorElement;

	const encodedCode = encodeURIComponent(mermaidCode);
	const compressed = pako.deflate(encodedCode, { level: 9 });
	const base64Compressed = fromUint8Array(compressed, true);
	const mermaidLiveEditorUrl = `https://mermaid.live/edit#pako:${base64Compressed}`;

	editLink.href = mermaidLiveEditorUrl;
	editLink.style.display = "inline";
	// Render the Mermaid diagram
	// mermaid.run(undefined);
});

/**
 * Generate a Mermaid Live Editor URL from Mermaid diagram code.
 * @param diagramCode The Mermaid diagram code as a string.
 * @returns The URL to edit the diagram in Mermaid Live Editor.
 */
const generateMermaidLiveEditorUrl = (mermaidCode: string): string => {
	const json = JSON.stringify(mermaidCode);
	const data = new TextEncoder().encode(json);
	const compressed = pako.deflate(data, { level: 9 });
	const base64Compressed = fromUint8Array(compressed, true);

	// Generate the Mermaid Live Editor URL
	return `https://mermaid.live/edit#pako:${base64Compressed}`;
};
