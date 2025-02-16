let sunfireoutgoing = [];
let combined = []; 
var index = 0;


//index of standard sunfire replys

var sunfirereply = [
    'Great name, could you please tell me in one sentence what you want your video to be about?',
    'Thanks! Could you please pick a tone and aspect ratio for your video?',
    'Please upload the images you want me to use in the promotional video',
    'Write a longer description of the product or event that you are promoting, the more detailed the better!',
    'Is there anything specific you want me to emphasize in your video?',
    'Sounds good, is there anything you would like me to avoid mentioning?',
    'Here is the script I generated for you. Request modifications in the chat below or ',
];


document.getElementById('sendButton').addEventListener('click', function () {
    // Get the message input value
    const message = document.getElementById('messageInput').value;

    if (message.trim() !== '') { // Check if message is not empty
        // Create a new outgoing message div
        const outgoingChat = document.createElement('div');
        outgoingChat.className = 'outgoing-chats';

        const outgoingChatImg = document.createElement('div');
        outgoingChatImg.className = 'outgoing-chats-img';
        const userImg = document.createElement('img');
        userImg.src = '/static/userprofile.png';
        outgoingChatImg.appendChild(userImg);

        const outgoingMsg = document.createElement('div');
        outgoingMsg.className = 'outgoing-msg';

        const outgoingChatMsg = document.createElement('div');
        outgoingChatMsg.className = 'outgoing-chats-msg';

        const msgPara = document.createElement('p');
        msgPara.textContent = message;

        const timeSpan = document.createElement('span');
        timeSpan.className = 'time';
        const currentTime = new Date();
        timeSpan.textContent = `${currentTime.getHours()}:${currentTime.getMinutes()} PM | ${currentTime.toDateString()}`;

        outgoingChatMsg.appendChild(msgPara);
        outgoingChatMsg.appendChild(timeSpan);
        outgoingMsg.appendChild(outgoingChatMsg);
        outgoingChat.appendChild(outgoingChatImg);
        outgoingChat.appendChild(outgoingMsg);

        // Append the new message to the chat page
        document.getElementById('myTextarea').appendChild(outgoingChat);



        // Scroll to the bottom of the chat
        document.getElementById('myTextarea').scrollTop = document.getElementById('myTextarea').scrollHeight;






        // Simulate a reply after a short delay
        setTimeout(function () {
            createReceivedMessage();
        }, 1000); // 1-second delay
    }


});
// Array that stores text responses
//One the send button is clicked, it logs the response message in an array
//and clears the message input field
//THIS WILL HAVE TO BE TIED TO OUR BACKEND,
document.getElementById('sendButton').addEventListener('click', function () {
    const message = document.getElementById('messageInput').value;
    if (message) {
        sunfireoutgoing.push(message);
        console.log(sunfireoutgoing);
    }
    // Clear the input field after sending the message
    document.getElementById('messageInput').value = '';
});



// JS for the message that the user receives

function createReceivedMessage() {



    // Create a new received message div
    const receivedChat = document.createElement('div');
    receivedChat.className = 'received-chats';

    const receivedChatImg = document.createElement('div');
    receivedChatImg.className = 'received-chats-img';
    const aiImg = document.createElement('img');
    aiImg.src = '/static/sflogo.png';
    receivedChatImg.appendChild(aiImg);

    const receivedMsg = document.createElement('div');
    receivedMsg.className = 'received-msg';

    const receivedMsgInbox = document.createElement('div');
    receivedMsgInbox.className = 'received-msg-inbox';

    const msgPara = document.createElement('p');
    msgPara.id = 'msgPara'
    msgPara.textContent = sunfirereply[index];

    // This function handles when the user says "Yes I want to emphasize something"
    function createEmphasizeMessage() {
        // Create a new received message div
        const receivedChat = document.createElement('div');
        receivedChat.className = 'received-chats';

        const receivedChatImg = document.createElement('div');
        receivedChatImg.className = 'received-chats-img';
        const aiImg = document.createElement('img');
        aiImg.src = '/static/sflogo.png';
        receivedChatImg.appendChild(aiImg);

        const receivedMsg = document.createElement('div');
        receivedMsg.className = 'received-msg';

        const receivedMsgInbox = document.createElement('div');
        receivedMsgInbox.className = 'received-msg-inbox';

        const msgPara = document.createElement('p');
        msgPara.textContent = 'Respond below to let me know what points I should emphasize'

        const timeSpan = document.createElement('span');
        timeSpan.className = 'time';
        const currentTime = new Date();
        timeSpan.textContent = `${currentTime.getHours()}:${currentTime.getMinutes()} PM | ${currentTime.toDateString()}`;

        receivedMsgInbox.appendChild(msgPara);
        receivedMsgInbox.appendChild(timeSpan);
        receivedMsg.appendChild(receivedMsgInbox);
        receivedChat.appendChild(receivedChatImg);
        receivedChat.appendChild(receivedMsg);


        // Append the received message to the chat page
        document.getElementById('myTextarea').appendChild(receivedChat);

        // Scroll to the bottom of the chat
        document.getElementById('myTextarea').scrollTop = document.getElementById('myTextarea').scrollHeight;



    }
    function createAvoidMessage() {
        // Create a new received message div
        const receivedChat = document.createElement('div');
        receivedChat.className = 'received-chats';

        const receivedChatImg = document.createElement('div');
        receivedChatImg.className = 'received-chats-img';
        const aiImg = document.createElement('img');
        aiImg.src = '/static/sflogo.png';
        receivedChatImg.appendChild(aiImg);

        const receivedMsg = document.createElement('div');
        receivedMsg.className = 'received-msg';

        const receivedMsgInbox = document.createElement('div');
        receivedMsgInbox.className = 'received-msg-inbox';

        const msgPara = document.createElement('p');
        msgPara.textContent = 'Respond below to let me know what points I should emphasize'

        const timeSpan = document.createElement('span');
        timeSpan.className = 'time';
        const currentTime = new Date();
        timeSpan.textContent = `${currentTime.getHours()}:${currentTime.getMinutes()} PM | ${currentTime.toDateString()}`;

        receivedMsgInbox.appendChild(msgPara);
        receivedMsgInbox.appendChild(timeSpan);
        receivedMsg.appendChild(receivedMsgInbox);
        receivedChat.appendChild(receivedChatImg);
        receivedChat.appendChild(receivedMsg);


        // Append the received message to the chat page
        document.getElementById('myTextarea').appendChild(receivedChat);

        // Scroll to the bottom of the chat
        document.getElementById('myTextarea').scrollTop = document.getElementById('myTextarea').scrollHeight;



    }

     if (index == 1) {
            //AJAX portion
            var csrftoken = Cookies.get('csrftoken');
            $.ajaxSetup({
                headers: { 'X-CSRFToken': csrftoken }
            });
            var prompt = "Write a short audio script for a an advertising voiceover about a company named " + "" + sunfireoutgoing[0] + ". This company is creating" + sunfireoutgoing[1] + ". Write it as one paragraph without any actor names";
            console.log(prompt);
            $.ajax({
                url: '/index/',
                type: 'POST',
                data: { prompt: prompt },
                dataType: 'json',
                success: function (data) {
                $('#myTextarea').append(data.response + '</p>');
                }
            });
        }
    

    // append the image upload fieldset
    // This function also handles image encoding, will have to change to real backend in future.
    if (index === 2) {
        // Fieldset contains legend border with "Upload Images" text
        const fieldset = document.createElement('fieldset');
        fieldset.className = ('card');
        const legend = document.createElement('legend');
        legend.textContent = 'Drag or Click to upload images';

        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';

        const dropArea = document.createElement('div');
        dropArea.className = 'imgupload';
        dropArea.id = 'drop-area';

        const imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.id = 'image-input';
        imageInput.name = 'images';
        imageInput.accept = 'image/*';
        imageInput.multiple = true;
        imageInput.style.display = 'none';

        const imageShelf = document.createElement('div');
        imageShelf.id = 'image-shelf';
//
        // Creates the submit button in the fieldset card
        const imageSubmit = document.createElement('button');
        imageSubmit.className = 'imageSubmit'
        imageSubmit.id = 'imageSubmit';
        imageSubmit.textContent = 'Submit Images';

        let imageContainers = [];
        let dragStarted = false;
        let initialContainerCount = 0;

        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.classList.add('dragging');
        });

        dropArea.addEventListener('dragleave', () => {
            dropArea.classList.remove('dragging');
        });

        dropArea.addEventListener('dragstart', (e) => {
            dragStarted = true;
            initialContainerCount = imageContainers.length;
        });

        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dropArea.classList.remove('dragging');
            const files = e.dataTransfer.files;

            if (dragStarted) {
                setTimeout(() => {
                    if (imageContainers.length > initialContainerCount) {
                        const extraContainer = imageContainers.pop();
                        extraContainer.remove();
                        updateImageContainerOrder();
                    }
                    dragStarted = false;
                }, 100);
            } else {
                handleFiles(files);
            }
        });

        dropArea.addEventListener('click', () => {
            imageInput.click();
        });

        imageInput.addEventListener('change', () => {
            const files = imageInput.files;
            handleFiles(files);
        });

        function handleFiles(files) {
            if (files.length + imageContainers.length > 6) {
                alert('You can only select up to 6 images.');
                return;
            }

            [...files].forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    createImageContainer(reader.result, file);
                };
                reader.readAsDataURL(file);
            });
        }

        function createImageContainer(src, file) {
            const container = document.createElement('div');
            container.classList.add('image-container');
            container.draggable = true;

            const img = document.createElement('img');
            img.classList.add('image-preview');
            img.src = src;
            img.file = file;

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-image');
            removeBtn.textContent = 'x';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                imageShelf.removeChild(container);
                imageContainers = imageContainers.filter(c => c !== container);
            });

            container.appendChild(img);
            container.appendChild(removeBtn);
            imageShelf.appendChild(container);
            imageContainers.push(container);

            container.addEventListener('dragstart', () => {
                container.classList.add('dragging');
            });

            container.addEventListener('dragend', () => {
                container.classList.remove('dragging');
                updateImageContainerOrder();
            });

            container.addEventListener('dragover', (e) => {
                e.preventDefault();
                const dragging = document.querySelector('.dragging');
                if (dragging && dragging !== container) {
                    const rect = container.getBoundingClientRect();
                    const offset = e.clientX - rect.left;
                    if (offset > rect.width / 2.5) {
                        imageShelf.insertBefore(dragging, container.nextSibling);
                    } else {
                        imageShelf.insertBefore(dragging, container);
                    }
                }
            });
        }

        function updateImageContainerOrder() {
            imageContainers = [...imageShelf.children];
        }

        dropArea.appendChild(imageInput);
        dropArea.appendChild(imageShelf);

        formGroup.appendChild(dropArea);

        fieldset.appendChild(legend);
        fieldset.appendChild(formGroup);

        // Appends submit button
        fieldset.appendChild(imageSubmit);

        receivedMsgInbox.appendChild(fieldset);

        // Event listener for imageSubmit button to process and log images in Base64
        imageSubmit.addEventListener('click', function () {
            createReceivedMessage();

            // Process each image and log the Base64 string
            imageContainers.forEach(container => {
                const img = container.querySelector('img');
                const file = img.file;

                const reader = new FileReader();
                function getDescriptions(base64String) {
                    return fetch('/process-images', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 'images': [base64String] })  // Send images as an array
                    })
                    .then(response => response.json())  // Parse the JSON response
                    .then(data => {
                        const descriptions = data.descriptions;  // Extract descriptions from response
                        return descriptions;  // Return descriptions as the resolved value of the promise
                    })
                    .catch(error => console.error('Error:', error));
                }
                
                // Use the function to get the descriptions
                reader.onloadend = function () {
                    const base64String = reader.result.split(',')[1];
                    
                    // Call the getDescriptions function and handle the returned promise
                    getDescriptions(base64String).then(descriptions => {
                        console.log(descriptions);  // Use the descriptions outside the fetch function
                        descriptions.forEach(description => {
                            $('#myTextarea').append(description + '\n');
                        });   
                        descriptions.forEach(description => {
                            combined.push(description + '\n'); 
                                            });
                    });
                };
                                                reader.readAsDataURL(file);
            });
        });

        imageSubmit.addEventListener('click', function () {
            formGroup.innerHTML = 'Thank you for uploading!'
            sendImagesToFlask();
        });

        imageSubmit.addEventListener('click', function () {
            document.getElementById('imageSubmit').disabled = "true";
        });
    }

    

    //mode and ratio selection. Will be tied with image modification on the backend
    if (index == 1) {

        var moodFormGroup = document.createElement('div');
        moodFormGroup.className = 'form-group';

        var moodLabel = document.createElement('label');
        moodLabel.setAttribute('for', 'mood-select');
        moodLabel.className = 'optionsForm-label';
        moodLabel.textContent = 'Tone and Mood';

        var moodSelect = document.createElement('select');
        moodSelect.id = 'mood-select';
        moodSelect.name = 'mood';
        moodSelect.required = true;

        var moodOptions = [
            { value: '', text: 'Select One', disabled: true, selected: true },
            { value: 'ai', text: 'Choose for Me' },
            { value: 'energetic-positive', text: 'Energetic and Positive' },
            { value: 'relaxed-soothing', text: 'Relaxed and Soothing' },
            { value: 'uplifting-motivational', text: 'Inspirational and Motivational' },
            { value: 'professional-polished', text: 'Professional and Polished' },
            { value: 'intense-powerful', text: 'Intense and Powerful' },
            { value: 'relatable-casual', text: 'Relatable and Casual' }
        ];

        moodOptions.forEach(function (optionData) {
            var option = document.createElement('option');
            option.value = optionData.value;
            option.textContent = optionData.text;
            if (optionData.disabled) option.disabled = true;
            if (optionData.selected) option.selected = true;
            moodSelect.appendChild(option);
        });

        moodFormGroup.appendChild(moodLabel);
        moodFormGroup.appendChild(moodSelect);

        // Create the form group for Platform
        var platformFormGroup = document.createElement('div');
        platformFormGroup.className = 'optionsForm';

        var platformLabel = document.createElement('label');
        platformLabel.setAttribute('for', 'platform-select');
        platformLabel.className = 'optionsForm-label';
        platformLabel.textContent = 'Where do you want to display your video? (Choose one)';

        var platformSelect = document.createElement('select');
        platformSelect.id = 'platform-select';
        platformSelect.name = 'platform';
        platformSelect.required = true;

        var platformOptions = [
            { value: '', text: 'Choose one', disabled: true, selected: true },
            { value: 'youtube', text: 'YouTube (16:9)' },
            { value: 'facebook', text: 'Facebook (16:9)' },
            { value: 'instagram', text: 'Instagram (9:16)' },
            { value: 'tiktok', text: 'TikTok (9:16)' },
            { value: 'twitter', text: 'Twitter/X (16:9)' },
            { value: 'television', text: 'Television (16:9)' },
            { value: 'square', text: 'Square (1:1)' }
        ];

        platformOptions.forEach(function (optionData) {
            var option = document.createElement('option');
            option.value = optionData.value;
            option.textContent = optionData.text;
            if (optionData.disabled) option.disabled = true;
            if (optionData.selected) option.selected = true;
            platformSelect.appendChild(option);
        });

        var optionsButton = document.createElement('button');
        optionsButton.type = 'submit';
        optionsButton.id = 'optionsButton';
        optionsButton.textContent = 'Submit Options';
        optionsButton.className = 'optionsForm-button';
        optionsButton.disabled = true; // Initially disable the button

        platformFormGroup.appendChild(platformLabel);
        platformFormGroup.appendChild(platformSelect);

        // Append all to index's response
        var formContainer = document.getElementById('form-container'); // Make sure this element exists in your HTML
        msgPara.appendChild(moodFormGroup);
        msgPara.appendChild(platformFormGroup);
                msgPara.appendChild(optionsButton);


        // Enable the button only when both selects have valid values
        function checkSelections() {
            if (moodSelect.value && platformSelect.value) {
                optionsButton.disabled = false;
            } else {
                optionsButton.disabled = true;
            }
        }

        moodSelect.addEventListener('change', checkSelections);
        platformSelect.addEventListener('change', checkSelections);

        optionsButton.addEventListener('click', function () {
            createReceivedMessage();
            console.log('Mood Option Selected:', moodSelect.value);
            console.log('Platform Option Selected:', platformSelect.value);
        });

    }

    //This asks if you want to emphasize anything
    if (index == 4) {

        // Makes Div to put yes/no in
        const yesNoBox = document.createElement('div');
        yesNoBox.id = 'yesNoBox';
        yesNoBox.className = 'received-msg';

        // Makes No buton
        const noEmphasize = document.createElement('button');
        noEmphasize.id = 'noEmphasize';
        noEmphasize.textContent = 'No';
        noEmphasize.className = 'yesNoButton';
        msgPara.appendChild(noEmphasize);

        // Makes Yes buton
        const yesEmphasize = document.createElement('button');
        yesEmphasize.id = 'yesEmphasize';
        yesEmphasize.textContent = 'Yes';
        yesEmphasize.className = 'yesNoButton';

        //appends button to paragraph
        msgPara.appendChild(yesEmphasize);



        // Event listener for  button to increase index
        yesEmphasize.addEventListener('click', function () {
            createEmphasizeMessage();
        });

        noEmphasize.addEventListener('click', function () {
            createReceivedMessage();
        });
        noEmphasize.addEventListener('click', function () {
            if (noEmphasize) {
                sunfireoutgoing.push("");
                console.log(sunfireoutgoing);
            }
            // Clear the input field after sending the message
            document.getElementById('messageInput').value = '';
        });
    }

    //Asks if you want to avoid anything
    if (index == 5) {

        // Makes Div to put yes/no in
        const yesNoBox = document.createElement('div');
        yesNoBox.id = 'yesNoBox';
        yesNoBox.className = 'received-msg';

        // Makes No buton
        const noAvoid = document.createElement('button');
        noAvoid.id = 'noEmphasize';
        noAvoid.textContent = 'No';
        noAvoid.className = 'yesNoButton';

        msgPara.appendChild(noAvoid);

        // Makes Yes buton
        const yesAvoid = document.createElement('button');
        yesAvoid.id = 'yesAvoid';
        yesAvoid.textContent = 'Yes';
        yesAvoid.className = 'yesNoButton';

        msgPara.appendChild(yesAvoid);



        // Event listener for yes/no button to increase index
        yesAvoid.addEventListener('click', function () {
            createAvoidMessage();
        });

        noAvoid.addEventListener('click', function () {
            createReceivedMessage();
        });
    }

    if (index == 6) {
        //AJAX portion
        var csrftoken = Cookies.get('csrftoken');
        $.ajaxSetup({
            headers: { 'X-CSRFToken': csrftoken }
        });
        var allElements = "Write a 30 second audio script for a an advertising voiceover about a company named " + "" + sunfireoutgoing[0] + ". This company is creating" + sunfireoutgoing[2] + ". Write it as one paragraph without any actor names." + " " + "Use the descriptions of the following images as slight context for your script:" + " " + combined.join('\n') + " " +" Additionally emphasize "+ sunfireoutgoing[3] + " and do not mention "+ sunfireoutgoing[4];
        console.log(allElements);
        console.log(combined);
        $.ajax({
            url: '/finished-script/',
            type: 'POST',
            data: { allElements: allElements },
            dataType: 'json',
            success: function (allElements) {
            $('#myTextarea').append(allElements.response + '</p>');
            }
        });
    }

    if (index == 6) {

        // Makes Div to put yes/no in
        // Create the Generate Video button
        var generateButton = document.createElement('button');
        generateButton.type = 'submit';
        generateButton.id = 'generate-btn';
        generateButton.textContent = 'Generate Video';
        generateButton.className = 'optionsForm-button';
        
        msgPara.appendChild(generateButton);
        msgPara.appendChild(allElements.response + '</p>');


        //add endpoints to generate later

        //generateButton.addEventListener('click', function () {
        //     createReceivedMessage();
        //  });

    }




    // Creates timestamp span
    const timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    const currentTime = new Date();
    timeSpan.textContent = `${currentTime.getHours()}:${currentTime.getMinutes()} PM | ${currentTime.toDateString()}`;

    receivedMsgInbox.appendChild(msgPara);
    receivedMsgInbox.appendChild(timeSpan);
    receivedMsg.appendChild(receivedMsgInbox);
    receivedChat.appendChild(receivedChatImg);
    receivedChat.appendChild(receivedMsg);


    // Append the received message to the chat page
    document.getElementById('myTextarea').appendChild(receivedChat);

    // Scroll to the bottom of the chat
    document.getElementById('myTextarea').scrollTop = document.getElementById('myTextarea').scrollHeight;

    index += 1;
    flask_index = index;
    console.log(index);

}

