import json
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from langchain_community.embeddings import SentenceTransformerEmbeddings
import google.generativeai as genai

# Load system prompts and model setup
system_prompts = [
    "You are a safety compliance assistant for a construction site.",
    "Your goal is to provide accurate and structured responses.",
    "Espicailly for timings provide consise and in a good way readable",
    "Always provide step-by-step guidance when explaining safety procedures.",
    "If the matched document is unclear, provide a logical inference.",
    "do not use exact matched chunk avoid inverted commas "
]

# Load saved data
with open("embeddings2.json", "r") as f:
    saved_data = json.load(f)

documents = saved_data["documents"]
embeddings = np.array(saved_data["embeddings2"])

# Load embedding model
# embedding_model = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

# Configure Gemini
# genai.configure(api_key="AIzaSyCEv95GdDpyYlLg7jU53qmVwrZJvh9P0Kk")  # Add your Gemini API key
# model = genai.GenerativeModel("models/gemini-1.5-pro-latest")
genai.configure(api_key="AIzaSyAqc8qTbU1T7tjuIWcOsHv2wtgaDSQRkuc")  # Replace with actual API key
model = genai.GenerativeModel("gemini-1.5-flash")

def get_pdf_response(query: str) -> dict:
    if not query.strip():
        return {"error": "Query cannot be empty."}

    # Generate query embedding
    query_embedding = embedding_model.embed_query(query)

    # Compute similarity
    similarities = cosine_similarity([query_embedding], embeddings)[0]
    best_match_idx = np.argmax(similarities)
    best_score = similarities[best_match_idx]
    best_match = documents[best_match_idx]

    # Define similarity threshold
    threshold = 0.4  # adjust this based on your experiments

    # If similarity is below threshold, use Tavily
    # if best_score < threshold:
    #     print("🔁 Using Tavily search due to low similarity:", best_score)
    #     return get_tavily_response(query)  # <- You must define this

    # Prepare prompt for Gemini
    prompt = f"System prompts are: \n\n{system_prompts}\n\nUser Query: {query}\n\nMatched Context: {best_match}\n\nProvide a well-structured response based on the matched context."

    # Generate response from Gemini
    response = model.generate_content(prompt)

    return {
        "query": query,
        "gemini_response": response.text
    }
