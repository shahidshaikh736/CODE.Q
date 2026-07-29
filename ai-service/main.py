# ============================================
# CodeQuest Python AI Microservice
# FastAPI Heuristics Engine
# ============================================

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="CodeQuest AI Copilot Microservice")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    reply: str
    engine: str

def generate_copilot_reply(prompt: str) -> str:
    q = prompt.lower()
    
    if "grid" in q:
        return (
            "### CSS Grid Layout Boilerplate (Powered by Python AI Service):\n"
            "```css\n"
            ".grid-container {\n"
            "  display: grid;\n"
            "  grid-template-columns: repeat(3, 1fr);\n"
            "  gap: 16px;\n"
            "}\n"
            ".grid-item-wide {\n"
            "  grid-column: span 2;\n"
            "}\n"
            "```\n"
            "**Explanation:** `grid-template-columns: repeat(3, 1fr);` creates a 3-column responsive layout where columns take equal fractional spaces."
        )
        
    if any(x in q for x in ["express", "router", "backend"]):
        return (
            "### Express Router Boilerplate (Powered by Python AI Service):\n"
            "```javascript\n"
            "const express = require('express');\n"
            "const router = express.Router();\n\n"
            "// GET all active logs\n"
            "router.get('/deployments', (req, res) => {\n"
            "  res.status(200).json({ success: true, count: 2 });\n"
            "});\n\n"
            "module.exports = router;\n"
            "```\n"
            "**Explanation:** Express Routers isolate path handlers, exporting middlewares that attach cleanly to root application ports."
        )

    if any(x in q for x in ["join", "sql", "database"]):
        return (
            "### SQL Relational JOIN Query (Powered by Python AI Service):\n"
            "```sql\n"
            "SELECT u.id, u.username, p.title\n"
            "FROM users u\n"
            "INNER JOIN profiles p ON u.id = p.user_id\n"
            "WHERE p.is_premium = 1;\n"
            "```\n"
            "**Explanation:** `INNER JOIN` queries select records with matching values in both tables, using aliases (`u` and `p`) to write clean filters."
        )

    if any(x in q for x in ["promise", "async", "es6"]):
        return (
            "### Async/Await ES6 Pattern (Powered by Python AI Service):\n"
            "```javascript\n"
            "async function fetchSystemMetrics(endpoint) {\n"
            "  try {\n"
            "    const response = await fetch(endpoint);\n"
            "    const data = await response.json();\n"
            "    return data.metrics;\n"
            "  } catch (error) {\n"
            "    console.error(\"Pipeline failure:\", error);\n"
            "  }\n"
            "}\n"
            "```\n"
            "**Explanation:** `async/await` simplifies promise resolution, keeping sequential syntax clean and wrapping checks inside structured `try/catch` blocks."
        )

    return (
        "I can help you build templates for that! Here is a boilerplate coding checklist from Python AI Copilot:\n"
        "1. Initialize structure & variables.\n"
        "2. Setup modular interfaces & error handling.\n"
        "3. Validate return criteria.\n"
        "Try asking specifically about **CSS Grid**, **Express Router**, **SQL JOIN**, or **ES6 Promises**!"
    )

@app.get("/health")
def health():
    return {"status": "healthy", "service": "python-ai-microservice"}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt query cannot be empty")
    
    reply = generate_copilot_reply(request.prompt)
    return ChatResponse(reply=reply, engine="FastAPI Python Heuristics Engine")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
