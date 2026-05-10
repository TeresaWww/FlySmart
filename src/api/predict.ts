export async function getPrediction(userInput: any) {

    const payload = {
      ...userInput,
      client_time: new Date().toISOString()
    };
  
    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  
    return await res.json();
  }