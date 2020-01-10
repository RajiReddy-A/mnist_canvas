from flask import Flask, render_template, request
from io import BytesIO
from keras.preprocessing import image
from keras.preprocessing.image import array_to_img, img_to_array
from keras.models import load_model
import os
from PIL import Image
import numpy as np
from base64 import b64encode, b64decode


from flask_bootstrap import Bootstrap
from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import SubmitField

# code which helps initialize our server
app = Flask(__name__)
app.config['SECRET_KEY'] = 'any secret key'

bootstrap = Bootstrap(app)

saved_model = load_model("models/mnist.h5")
saved_model._make_predict_function()


@app.route('/', methods=['GET','POST'])
def canvas():
	if request.method =='POST':
		#print(request.form.get('user_img'))
		pass

	return render_template('index.html')

@app.route('/predict_api', methods=['POST'])
def predict_api():
	imgstring = request.get_data()
	img = Image.open(BytesIO(b64decode(imgstring[22:]))).convert('L')
	resized_img = img.resize((28, 28))
	resized_img.save('result.jpg')
	img_array = np.array(resized_img)
	img_array = img_array/255
	img_array = img_array.reshape(1, 28, 28, 1)
	prediction = saved_model.predict_classes(img_array)
	return str(prediction[0])		

if __name__ == '__main__':
	app.run(debug=True)