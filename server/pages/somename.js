let current_index = 0;
let imagesBufferArray = [];
let CID = null;

async function main(cid) {

    disabel_enable(true);

    const request = await fetch('/api/challenge?cid=' + cid, {
        method: 'post'
    });

    const Challange = await request.json();

    document.getElementById('Challange-id').innerText = Challange.data.challengeID;
    document.getElementById('Challange-token').innerText = Challange.data.tokenInfo.token;
    document.getElementById('Challange-wave').innerText = Challange.wave + 1;
    document.getElementById('Challange-sec').innerText = Challange.data.sec;
    document.getElementById('Challange-waves').innerText = Challange.data.game_data.waves
    document.getElementById('Challange-type').innerText = Challange.data.game_data.instruction_string;

    if (Challange.new) {
        document.getElementById('message').innerText = Challange.data.game_data.instruction_string + ' (1/5)';
        current_index = 0;
        localStorage.setItem('i', 0);
    } else {
        current_index = +localStorage.getItem('i');
        document.getElementById('message').innerText = Challange.data.game_data.instruction_string + ' ({d}/5)'.replace('{d}', current_index + 1);
    }

    CID = Challange.data.challengeID;

    localStorage.setItem('cid', CID);

    const image = await fetchImages(CID, current_index);

    displayImage(image);

    disabel_enable(false)
};


async function fetchImages(cid, index) {
    const response = await fetch(`/api/challenge/images?cid=${cid}&index=${index}`);

    if (response.status !== 200) {
        const data = await response.json();

        return data;
    } else {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = response.arrayBuffer();

        return data;
    }
}

async function solveToken(cid) {
    const request = await fetch(`/api/challenge/token?cid=${cid}`, {
        method: 'post'
    });

    const data = await request.json();

    console.log(data);
}

async function displayImage(imageBuffer) {
    const blob = new Blob([imageBuffer]);
    const imageUrl = URL.createObjectURL(blob);
    document.getElementById('image').src = imageUrl;
}

async function handleButtonClick(buttonNumber) {

    document.getElementById('message').innerText = 'Loading ....';
    disabel_enable(true);

    const request = await fetch(`/api/challenge/solve?cid=${CID}&sovId=${+buttonNumber - 1}`, {
        method: 'post'
    });

    const data = await request.json();

    if (data.response === 'answered') {
        if (data.solved) {
            solveToken(CID)
            return document.getElementById('message').innerText = 'Solved';
        } else {
            return document.getElementById('message').innerText = 'Not Solved';
        }
    };

    current_index += 1;

    console.log(current_index);
    localStorage.setItem('i', current_index);

    const NewImage = await fetchImages(CID, current_index);

    if (NewImage?.user_interface) {
        return document.getElementById('message').innerText = NewImage.user_interface.message;
    } else {
        document.getElementById('message').innerText = document.getElementById('message').innerText.replace(/\(\d\/\d\)/, `(${current_index + 1}/5)`);
    }

    displayImage(NewImage);

    disabel_enable(false);
    document.getElementById('message').innerText = document.getElementById('Challange-type').innerText + ` (${current_index + 1}/5)`;
    document.getElementById('Challange-wave').innerText = current_index + 1;
}

function disabel_enable(_disabel_enable) {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(b => b.disabled = _disabel_enable);
}

let ChallangeId = localStorage.getItem('cid');

main(ChallangeId);