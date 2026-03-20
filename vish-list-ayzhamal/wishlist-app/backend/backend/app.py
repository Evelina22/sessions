import os
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Папка для хранения картинок
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///wishlist.db'
db = SQLAlchemy(app)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    link = db.Column(db.String(200))
    image_url = db.Column(db.String(200)) # Новое поле для пути к фото

with app.app_context():
    db.create_all()

# Маршрут, чтобы React мог "видеть" картинки
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([{
        "id": i.id, 
        "name": i.name, 
        "link": i.link, 
        "image": f"http://localhost:5000/uploads/{i.image_url}" if i.image_url else None
    } for i in items])

@app.route('/items', methods=['POST'])
def add_item():
    name = request.form.get('name')
    link = request.form.get('link')
    file = request.files.get('image')
    
    filename = None
    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    new_item = Item(name=name, link=link, image_url=filename)
    db.session.add(new_item)
    db.session.commit()
    
    return jsonify({"id": new_item.id, "name": name, "link": link, "image": f"http://localhost:5000/uploads/{filename}" if filename else None})

# --- ДОБАВИТЬ ЭТОТ БЛОК ---
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = WishItem.query.get_or_404(item_id) # Найти товар по ID или выдать ошибку 404
    try:
        # Если есть картинка, можно было бы её удалить, но для простоты пропустим
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Item deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
# --------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)