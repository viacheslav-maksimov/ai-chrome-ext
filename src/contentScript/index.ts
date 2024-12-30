import * as cheerio from "cheerio";
import { summarizeText } from "../ai/langchain-mermaid";

const $ = cheerio.load(document.body.innerHTML);
console.info("contentScript is running");

// const text = $("article").text();
// const text = $("div.jobs-description__content").text();
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
	console.log(request);

	if (request.type === "SUMMARIZE") {
		console.log("contentScript has received a message from popup");

		chrome.storage.sync.get(["apikey"], async (result) => {
			const apiKey = result["apikey"];
			const text = window.getSelection().toString();

			const summary = await summarizeText(text, apiKey);
			console.log(`here is the summary of the page:${summary}`);
			sendResponse(summary);
		});
	}
	return true; // Keeps the message channel open for asynchronous responses
});
