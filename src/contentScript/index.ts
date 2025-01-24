import * as cheerio from "cheerio";
import { callAI } from "../ai/langchain-mermaid";

console.info("contentScript is running");

const API_KEY = import.meta.env.VITE_API_KEY

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
	console.log(request);

	if (request.type === "SUMMARIZE") {
		console.log("contentScript has received a message from popup");

		chrome.storage.sync.get(["apikey"], async (result) => {
			const apiKey = result["apikey"] || API_KEY;
			const text = window.getSelection().toString();

			const summary = await callAI(text, apiKey);
			console.log(`here is the summary: ${summary}`);
			sendResponse(summary);
		});
	}
	return true; // Keeps the message channel open for asynchronous responses
});
