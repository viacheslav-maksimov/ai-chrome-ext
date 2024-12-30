import "./index.css";
import van from "vanjs-core";
import { MessageBoard } from "vanjs-ui";
const { h3, div, input, button, main } = van.tags;

const board = new MessageBoard({ top: "20px" });
export const ApiKeyForm = () => {
  const divDom = main(
    div({ class: "api-key-form" }, h3("API Key")),
  );
  const inputDom = input({
    type: "text",
    id: "api",
    placeholder: "Enter your API Key",
  });
  van.add(
    divDom,
    inputDom,
    button(
      {
        onclick: () => {
          // Set the api key to the Chrome storage
          chrome.storage.sync.set({
            apikey: inputDom.value,
          });
          board.show({ message: "Added your Api Key", durationSec: 2 });
        },
      },
      "Add",
    ),
  );
  return divDom;
};

van.add(document.body, ApiKeyForm());
