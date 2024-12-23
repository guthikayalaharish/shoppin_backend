from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/crawl', methods=['POST'])
def crawl():
    try:
        data = request.json
        domains = data.get('domains', [])

        # Mock implementation of crawling logic (replace with actual crawling)
        result = {}
        for domain in domains:
            result[domain] = [
                f"https://{domain}/product/1",
                f"https://{domain}/product/2",
                f"https://{domain}/product/3"
            ]

        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
