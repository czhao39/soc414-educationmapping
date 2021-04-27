from flask import Flask, render_template

app = Flask(__name__, static_url_path="")


@app.route("/")
def hello():
    return render_template("home.html")


@app.route("/map")
def map_page():
    return render_template("map.html")


@app.route("/counties_map")
def counties_map_page():
    return render_template("counties_map.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
