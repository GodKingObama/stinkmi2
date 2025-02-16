import traceback
from flask import Flask, request, render_template, jsonify, Response, copy_current_request_context
import os
import uuid
import hashlib
from pathlib import Path
import openai
#from audio_utils import trim_and_fade, combine_audio_clips
import requests
from PIL import Image
# noinspection PyUnresolvedReferences
import PIL
from openai import OpenAI

app = Flask(__name__, static_url_path='/static')
#test
#############################################################################################################
#############################################################################################################
#############################################################################################################
# OpenAI API Key 
            
OpenAI.api_key = "sk-proj-"
client = OpenAI(api_key=OpenAI.api_key)



@app.route("/", methods=['GET'])
def home():
   return render_template('splash.html')


##Home Chat page
@app.route('/index/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST': 
        prompt = request.form['prompt']
        response = client.chat.completions.create(

            model="gpt-3.5-turbo",

            messages=[

                {"role": "system", "content": prompt},

                {"role": "user", "content": prompt}

            ]

        )

        

        response = response.choices[0].message.content 
        print (response)
  
        return jsonify({'response': response}) 
        
    return render_template('chatgpt.html')

@app.route('/process-images', methods=['POST'])
def process_images():
    # Retrieve the Base64 encoded images from the request
    data = request.get_json()
    images = data.get('images', [])

    # Variable to hold the image descriptions
    descriptions = []

    # Loop through each image and get a description using ChatGPT
    for idx, image_base64 in enumerate(images):
        print(image_base64)
        # Make a request to OpenAI's ChatCompletion to generate a description
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that describes images."},
                {"role": "user", "content": [
                    {
                        "type": "text",
                        "text": "What’s in this image? Describe it in 2 sentances or less"
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{image_base64}"  # Use only the current image
                        }
                    }
                ]}
            ]
        )

        # Extract the description text from the response
        description = response.choices[0].message.content 
        descriptions.append(f"Image Description: {description}")
        print(descriptions)
        
    # Return all descriptions after processing all images
    return jsonify({'descriptions': descriptions})




@app.route('/finished-script/', methods=['POST'])
def finished_script():
    if request.method == 'POST': 
        allElements = request.form['allElements']
        response = client.chat.completions.create(

            model="gpt-3.5-turbo",

            messages=[

                {"role": "system", "content": allElements},

                {"role": "user", "content": allElements}

            ]

        )

        

        response = response.choices[0].message.content 
        print (response)
  
        return jsonify({'response': response}) 
        
    return render_template('chatgpt.html')
@app.route("/start/")
def start():
    return render_template('start.html')

@app.route('/about/')
def about():
    return render_template('about.html')

@app.route('/blog/')
def blog():
    return render_template('blog.html')

@app.route('/signin/')
def signin():
    return render_template('signin.html')

@app.route('/register/')
def register():
    return render_template('register.html')





@app.route('/api/generate-video', methods=['POST'])
def generate_video_route():
    """
    Route for generating a video based on the provided data.

    This function is the route handler for the '/api/generate-video' endpoint. It is triggered when a POST request is made to this endpoint.

    Parameters:
    - None

    Returns:
    - A JSON response with a status message and the session ID if the task is successfully submitted.
    - A JSON response with an error message if there is an exception during the video generation process.

    Side Effects:
    - Creates session-dependent directories for storing uploaded images and audio files.
    - Saves the uploaded images to the session-dependent directories.
    - Converts any incompatible images to PNG format.
    - Keeps track of the image attributes.
    - Submits a task to generate the video using the provided session data and images.

    """
    print('Data Received.  Examining data...')
    unique_prefix = generate_unique_prefix()
    logger(unique_prefix, 'log', 'Data Received.  Examining data...')
    session_data = {
        'unique_prefix': unique_prefix,
        'company_name': request.form.get('company-name'),
        'emphasis': request.form.get('emphasis'),
        'avoid': request.form.get('avoid'),
        'topic': request.form.get('press-release'),
        # 'tone_age_gender': request.form.get('tone_age_gender'),
        'mood': request.form.get('mood'),
        'platform': request.form.get('platform'),
        'audio': {},
        'video': {},
        'text_to_text': config['text-to-text'],
        'image_to_text': config['image-to-text'],
        'text_to_voice': config['text-to-voice'],
        'text_to_music': config['text-to-music']
    }

    (session_data['target_width'],
     session_data['target_height'],
     session_data['video']['aspect_ratio']) = (get_platform_specs(session_data['platform']))

    # Create session-dependant directories
    upload_folder = os.path.join(app.config['UPLOAD_FOLDER'], session_data['unique_prefix']) + '/'
    os.makedirs(upload_folder, exist_ok=True)
    videos_folder = os.path.join(app.config['VIDEOS_FOLDER'], session_data['unique_prefix']) + '/'
    os.makedirs(videos_folder, exist_ok=True)
    audio_folder = os.path.join(app.config['AUDIO_FOLDER'], session_data['unique_prefix']) + '/'
    os.makedirs(audio_folder, exist_ok=True)
    session_data['audio']['local_dir'] = audio_folder

    # Get the uploaded images from the request
    image_files = request.files.getlist('images')
    print("Image Files:", image_files)
    for image_file in image_files:
        # Clean up file names
        stem = Path(image_file.filename).stem
        ext = Path(image_file.filename).suffix
        safe_stem = hashlib.sha256(stem.encode()).hexdigest()[:20]
        safe_filename = safe_stem + ext
        image_file.filename = safe_filename

        image_path = os.path.join(upload_folder, image_file.filename)
        image_file.save(image_path)
        if not compatible_image_format(image_path):
            try:
                with Image.open(image_path) as img:
                    img = convert_image_to_png(img)
                    new_filename = os.path.splitext(image_file.filename)[0] + '.png'
                    file_path = os.path.join(upload_folder, new_filename)
                    img.save(file_path, format='PNG')
                    image_file.filename = new_filename
            except Exception as e:
                print(f"Error converting image: {str(e)}")
                logger(unique_prefix, 'log', 'Got an incompatible image. Skipping it...')
                os.remove(image_path)
                continue

    # Keep track of image attributes
    images = []
    for image_file in image_files:
        images.append(
            {'filename': image_file.filename,
             'local_dir': upload_folder,
             'bucket': SOURCE_BUCKET_NAME})

 

@app.route('/api/video-callback', methods=['POST'])
def video_callback():
    """
    Handles the POST request to the '/api/video-callback' endpoint.

    This function is responsible for handling the callback from the video generation process. It retrieves the video URL from the callback data and emits it to all connected clients. The function also processes the data received in the request and returns a JSON response with a success message and the received data.

    Parameters:
    - None

    Returns:
    - A JSON response with a success message and the received data if the request is valid.
    - A JSON response with an error message and a 400 status code if the request is not in JSON format.

    """
    print("Got a call back!")
    # Retrieve the video URL from the callback data
    # video_url = request.get_json().get('video_url')
    print(f"Body: {request.data}")

    if not request.is_json:
        return jsonify({"error": "Invalid content type"}), 400

    data = request.get_json()
    print(f"JSON data: {data}")
    session_data = data.get('session_data')
    video_url = session_data.get('video_url')

    if video_url:
        # Emit the video URL to all connected clients
        logger(session_data['unique_prefix'], 'video', video_url)
    # Process the data here
    return jsonify({"message": "Callback received", "data": data}), 200


@app.route('/api/get_tones_data', methods=['GET'])
def get_tones_data():
    """
    Retrieves voice tone data using get_voice_tone_data function and returns it in JSON format.
    """
    voice_tone_data = get_voice_tone_data()
    return jsonify(voice_tone_data)


@app.route('/api/messages')
def stream_messages():
    """
    Defines the route '/api/messages' that streams messages to the client in text/event-stream format.
    """
    return Response(message_manager(), mimetype='text/event-stream')


if (__name__ == '__main__'):
    app.run(host="0.0.0.0", port=8000, debug=True)
