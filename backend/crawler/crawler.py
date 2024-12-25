import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
from crawler.utils import is_product_url

class Crawler:
    def __init__(self, domains):
        self.domains = domains

    def fetch_urls(self, domain):
        try:
            response = requests.get(domain, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')
            links = set()
            for a_tag in soup.find_all('a', href=True):
                url = urljoin(domain, a_tag['href'])
                if is_product_url(url):
                    links.add(url)
            return list(links)
        except Exception as e:
            print(f"Error occured while fetching urls from {domain}: {e}")
            return []

    def run(self):
        results = {}
        for domain in self.domains:
            results[domain] = self.fetch_urls(domain)
        return results
