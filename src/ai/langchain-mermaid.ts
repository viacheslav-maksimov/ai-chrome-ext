import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { loadSummarizationChain } from "langchain/chains";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function callAI(text: string, apiKey: string) {
	const openai = new ChatOpenAI({
		model: "gpt-4o-mini",
		apiKey: apiKey,
    // configuration: {
    //   baseURL: "https://deloreanurl", Has been blocked by CORS policy: Request header field x-stainless-os is not allowed by Access-Control-Allow-Headers in preflight response
    // }
	});

	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 100,
		chunkOverlap: 50,
	});

	const docs = await textSplitter.createDocuments([text]);

	const summaryRefineTemplate = `
Generate only mermaid text for a sequence diagram based on the text that response will be used directly to generate diagram and remove mermaid keyword in the response.
Do not use any quote marks or any special characters that is not supported by mermaid version 11.3.0. Do not include \`\`\`mermaid or \`\`\` code blocks, Just provide the Mermaid code for the diagram.
Do not provide comments about the code.:
--------
${text}
--------
`;

	const resp = await openai.invoke(summaryRefineTemplate);
	// const SUMMARY_REFINE_PROMPT = PromptTemplate.fromTemplate(
	// 	summaryRefineTemplate,
	// );

	// const summarizerChain = loadSummarizationChain(openai, {
	// 	type: "refine",
	// 	refinePrompt: SUMMARY_REFINE_PROMPT,
	// });

	// const summary = await summarizerChain.invoke({
	// 	input_documents: docs,
	// });
	return resp.content;
	// return resp;
}
