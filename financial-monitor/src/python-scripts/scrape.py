import sys
import requests
from bs4 import BeautifulSoup
import json

def fetch_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    else:
        print("Error: Unable to fetch page.")
        return None

def parse_page(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    return soup

def extract_data(soup):
    info = soup.findAll('form', attrs={'id': "newFormTest"})[0].findAll('span', attrs={"class": "text-base"})
    data = [item.text.strip() for item in info]  
    return data

def scrape(url):
    html_content = fetch_page(url)
    if html_content:
        soup = parse_page(html_content)
        data = extract_data(soup)
        return data
    else:
        return "opps no data"

if len(sys.argv) > 1:
    url = sys.argv[1]
    data = scrape(url)
    print(json.dumps(data)) 
else:
    print(json.dumps([]))