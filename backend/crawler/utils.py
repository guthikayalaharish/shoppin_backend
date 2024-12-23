import re

def is_product_url(url):
    patterns = [r"/product/", r"/item/", r"/p/"]
    return any(re.search(pattern, url) for pattern in patterns)
