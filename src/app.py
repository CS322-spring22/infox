import requests
from flask import Flask, render_template, request
import json

app = Flask(__name__)

'''
@app.route('/model', methods=["GET", "POST"])
def results():
    form = request.form
    if request.method == 'POST':
        summarizer = pipeline("summarization", model="t5-base", tokenizer="t5-base", framework="tf")
        output = summarizer(request.form['nm'], min_length=5, max_length=20)
        return output[0] 

if __name__ == '__main__':
    app.run(debug = True)
'''

API_URL = "https://api-inference.huggingface.co/models/google/pegasus-xsum"
API_TOKEN = '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'
headers = {"Authorization": f"Bearer {API_TOKEN}"}
@app.route("/model", methods=["GET", "POST"])
def check_input():
    if request.method == 'POST':
        print(request.json['text'])
        input = request.json['text']
        response = requests.post(API_URL, headers=headers, json=input)
        output = response.json()
        return (json.dumps(output[0]))
if __name__ == '__main__':
   app.run(debug = True)