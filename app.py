from flask import Flask, render_template

app = Flask(__name__, static_url_path="")


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/map")
def map_page():
    return render_template("map.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
