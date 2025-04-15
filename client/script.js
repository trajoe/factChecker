async function checkFact() {
    const statement = document.getElementById("statementInput").value;
    const resultText = document.getElementById("resultText");

    if (!statement.trim()) {
        resultText.textContent = "Please enter a statement.";
        return;
      }

      resultText.textContent = "Checking...";

      try {
        const response = await fetch("http://localhost:5000/check-fact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ statement })
        });
    
        const data = await response.json();
    
        if (response.ok) {
          resultText.textContent = data.result;
        } else {
          resultText.textContent = "Something went wrong. Try again.";
        }
      } catch (err) {
        resultText.textContent = "Error connecting to the server.";
        console.error(err);
      }
    }