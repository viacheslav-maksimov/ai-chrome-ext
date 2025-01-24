import './index.css'

async function fetchResult(): Promise<void> {
  const inputElement = document.getElementById("queryTextarea") as HTMLInputElement;
  const resultElement = document.getElementById("result");
  const linksElement = document.getElementById("links");

  if (inputElement && resultElement) {
    const query = inputElement.value.trim();
    if (!query) {
      resultElement.textContent = "Please enter a valid input.";
      linksElement.textContent = "No links available.";
      return;
    }

    try {
      const response = await fetch(`http://localhost:8090/ask?q=${encodeURIComponent(query)}`);
      if (response.ok) {
        const res = await response.json();
        resultElement.textContent = res.textResult;
        linksElement.innerHTML = res.metadata
          .map(
            (metadata) =>
              `<p>
                    <a href="https://github.com/wkda/${metadata.project}/blob/master/${metadata.path}" target="_blank" rel="noopener noreferrer">
                        ${metadata.source}
                    </a>
                </p>`
          ).join("");
      } else {
        resultElement.textContent = `Error: ${response.status} ${response.statusText}`;
      }
    } catch (error) {
      resultElement.textContent = `Error: Unable to fetch data. ${error}`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  const textareaElement = document.getElementById("queryTextarea") as HTMLInputElement;
  const buttonElement = document.getElementById("sendButton");

  // Trigger fetchResult on button click
  if (buttonElement) {
    buttonElement.addEventListener("click", fetchResult);
  }

  // Trigger fetchResult on Enter key press
  if (textareaElement) {
    textareaElement.addEventListener("keypress", (event: KeyboardEvent) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent newline
        fetchResult();
      }
    });
  }
})
