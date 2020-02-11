from flask import send_from_directory, abort, Flask

app = Flask(__name__)
@app.route("/get-excel/<excel_name>")
def get_excel(excel_name):
    print(excel_name)
