import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain_community.utilities import GoogleSerperAPIWrapper
from langchain_community.tools import YouTubeSearchTool
from langchain_community.tools import WikipediaQueryRun
from langchain_community.utilities import WikipediaAPIWrapper
from langchain.agents import initialize_agent, Tool
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain

# Load environment variables from .env file
load_dotenv()

# Retrieve API keys securely
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
SERPER_API_KEY = os.getenv("SERPER_API_KEY")

# Initialize ChatGroq model with environment variables
chat = ChatGroq(temperature=0.5, groq_api_key=GROQ_API_KEY, model_name="llama3-70b-8192")

# Initialize external tools
serper = GoogleSerperAPIWrapper(serper_api_key=SERPER_API_KEY)
wikipedia = WikipediaQueryRun(api_wrapper=WikipediaAPIWrapper())
youtube = YouTubeSearchTool()


# Define system and human prompts
system = """
You are a highly effective AI teaching assistant that uses the Socratic method to guide students toward understanding concepts in Data Structures and Algorithms (DSA).
Your role is to ask thoughtful, probing questions that lead the student to figure out the solution on their own.

If the student's answer seems almost correct or they are very desperate for the solution, then you should provide the correct answer without asking further questions.

The focus of the current topic is **Data Structures and Algorithms (DSA)**, guiding the student to:
1. Understand data structures such as arrays, linked lists, stacks, queues, trees, heaps, graphs, and algorithms like sorting, searching, dynamic programming, and graph traversal.
2. Identify weaknesses in their code, including implementation errors, time complexity, and space complexity.
3. Optimize and debug their solutions while ensuring correctness and efficiency.

Encourage students by using phrases like "Well done! 👍" or "You're very close! Keep going!".
"""

# Function to format conversation history
def format_conversation_history(history):
    return "\n".join([f"Student: {entry['student']}\nSocratic Assistant: {entry['assistant']}" for entry in history])

# Function to generate a Socratic response considering history
def socratic_conversation(student_query, history):
    history_text = format_conversation_history(history)
    human = f"""
    {history_text}

    Student: {student_query}

    Respond to the student's query by asking a probing question that leads them to the solution.
    """

    # Create prompt with history
    prompt = ChatPromptTemplate.from_messages([("system", system), ("human", human)])
    chain = LLMChain(prompt=prompt, llm=chat)

    return chain.run({"student_query": student_query})

# Define external tools
tools = [
    Tool(name="Google Search", func=serper.run, description="Search the web for real-time scenarios or individuals."),
    Tool(name="YouTube Search", func=youtube.run, description="Search YouTube for videos on specific topics."),
    Tool(name="Wikipedia Search", func=wikipedia.run, description="Fetch information on historical events and phenomena."),
]

# Initialize the agent with external tools
def initialize_custom_agent():
    return initialize_agent(tools=tools, llm=chat, agent_type="chat-conversational-react", verbose=False, handle_parsing_errors=True)

# Query the agent with history
def query_agent(query, history):
    agent = initialize_custom_agent()
    response = socratic_conversation(query, history)

    # Update history
    history.append({"student": query, "assistant": response})
    return response, history

# Chatbot loop with conversation history
def run_socratic_bot():
    history = []
    print("Socratic Assistant: Hello! I'm here to help you with DSA using the Socratic method. Type 'exit' to end.")

    while True:
        student_query = input("Student: ")

        if student_query.lower() == 'exit':
            print("Socratic Assistant: Goodbye! 👋")
            break

        assistant_response, history = query_agent(student_query, history)
        print(f"Socratic Assistant: {assistant_response}")

# Start the chatbot
# run_socratic_bot()
