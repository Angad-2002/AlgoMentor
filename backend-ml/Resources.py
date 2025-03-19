from fastapi import FastAPI, HTTPException
import requests
import os

app = FastAPI()

# Load API keys
YOUTUBE_API_KEY = os.getenv('YOUTUBE_API_KEY')
MEDIUM_API_KEY = os.getenv('MEDIUM_API_KEY')
GEEKSFORGEEKS_API_KEY = os.getenv('GEEKSFORGEEKS_API_KEY')


# YouTube search function (returns multiple results)
def youtube_searchs(query: str, num_results: int = 5) -> list:
    API_URL = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": query,
        "type": "video",
        "maxResults": num_results,
        "key": YOUTUBE_API_KEY
    }

    try:
        response = requests.get(API_URL, params=params)
        response.raise_for_status()
        results = response.json()

        youtube_results = []
        if 'items' in results:
            for item in results['items']:
                youtube_results.append({
                    'title': item['snippet']['title'],
                    'link': f"https://www.youtube.com/watch?v={item['id']['videoId']}",
                    'description': item['snippet'].get('description', 'No description available')
                })

        return youtube_results
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return []


# GeeksForGeeks search function (returns multiple results)
def geeks_for_geeks_search(query, api_key, num_results: int = 5):
    API_URL = "https://serpapi.com/search.json"
    params = {
        "q": f"site:geeksforgeeks.org {query}",
        "num": num_results,
        "api_key": api_key
    }

    try:
        response = requests.get(API_URL, params=params)
        response.raise_for_status()
        results = response.json()

        search_results = []
        for item in results.get('organic_results', []):
            search_results.append({
                'title': item['title'],
                'link': item['link'],
                'snippet': item.get('snippet', 'No snippet available')
            })

        return search_results
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return []


# Medium search function (returns multiple results)
def medium_search(query, num_results: int = 5):
    API_URL = "https://serpapi.com/search.json"
    params = {
        "q": f"site:medium.com {query}",
        "num": num_results,
        "api_key": MEDIUM_API_KEY
    }

    try:
        response = requests.get(API_URL, params=params)
        response.raise_for_status()
        results = response.json()

        search_results = []
        for item in results.get('organic_results', []):
            search_results.append({
                'title': item['title'],
                'link': item['link'],
                'snippet': item.get('snippet', 'No snippet available')
            })

        return search_results
    except requests.exceptions.RequestException as e:
        print(f"Request error: {e}")
        return []


# Combined search function (now returning multiple results per platform)
def searchResources(query, num_results: int = 5):
    medium_results = medium_search(query, num_results)
    youtube_results = youtube_searchs(query, num_results)
    
    # Use stored API key for GeeksForGeeks
    geeksforgeeks_results = geeks_for_geeks_search(query, GEEKSFORGEEKS_API_KEY, num_results)

    combined_results = {
        'medium': medium_results,
        'youtube': youtube_results,
        'geeksforgeeks': geeksforgeeks_results
    }

    if not any(combined_results.values()):
        return {"message": "No results found on any platform."}

    return {"results": combined_results}


# FastAPI endpoint to trigger the search
@app.get("/search")
def search_endpoint(query: str, num_results: int = 5):
    results = searchResources(query, num_results)
    return results


# To run the FastAPI app, use:
# uvicorn script_name:app --reload
