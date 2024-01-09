from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from dotenv import load_dotenv
import os
import numpy as np
import joblib
from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences
from keras.preprocessing.text import Tokenizer


# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)
CORS(app)
app.debug = True


# client = OpenAI(
#     api_key=os.environ.get("API_KEY"),
# )




base_directory = 'ALL/'

# Loading of our pre-trained model
def load_model_tokenizer_length(model_number):
    model_path = os.path.join(base_directory, f'model{model_number}.h5')
    tokenizer_path = os.path.join(base_directory, f'tokenizer{model_number}.pkl')
    max_length_tokens_path = os.path.join(base_directory, f'max_length_tokens{model_number}.txt')

    model = load_model(model_path)
    tokenizer = joblib.load(tokenizer_path)

    with open(max_length_tokens_path, 'r') as file:
        max_length_tokens = int(file.read())

    return model, tokenizer, max_length_tokens


def predict_grade(answer, model_number):
    model, tokenizer, max_length_tokens = load_model_tokenizer_length(model_number)

    input_text = answer
    input_sequence = tokenizer.texts_to_sequences([input_text])
    input_padded = pad_sequences(input_sequence, maxlen=max_length_tokens)
    predictions = model.predict([input_padded])
    predicted_grade = np.argmax(predictions, axis=1)[0]
    return predicted_grade




@app.route('/hint', methods=['POST'])

def hint():
    try:
        # Get input data from the request
        data = request.get_json()

        # Ensure that the required input features are present
        if 'ans' not in data :
            return jsonify({'error': 'Missing input ans'}), 400

        # Extract input features
        answer = data['ans']
        print(answer)


        # towards the answer of a question without actually answering the question , the user will provide his answer to the question use it to provide a better hint, the hint should be small within 10-15 words
        completion = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system",
                 "content": "You are an assistant "},
                {"role": "user", "content": f"HI"}

            ]
        )



        # # Make a prediction using the pre-trained model
        # prediction = model.predict([[feature1, feature2]])

        # Return the prediction to the user
        return jsonify({'hint': completion.choices[0].message})

    except Exception as e:
        return jsonify({'error': str(e)}), 500




@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get input data from the request
        data = request.get_json()

        # Ensure that the required input features are present
        if 'modelNum' not in data or 'answer' not in data:
            return jsonify({'error': 'Missing input features'}), 400

        # Extract input features
        modelNum = data['modelNum']
        ans = data['answer']

        # Make a prediction using the pre-trained model

        predicted_grade = predict_grade(ans, modelNum)
        print(f"Grade of your answer for model {modelNum} is: {predicted_grade}")

        # Return the prediction to the user
        return jsonify({'prediction': str(predicted_grade)})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

