const { default: axios } = require('axios');
const { CaptchaSolver } = require('./solver');

const username = 'ziademad2009';
const password = '';

async function main() {
    const RequestToGetToken = await axios.post('https://auth.roblox.com/v2/login').catch(e => e.response.headers["x-csrf-token"])

    const SecoundAttempReq = await axios({
        url: 'https://auth.roblox.com/v2/login',
        method: "POST",
        headers: {
            "x-csrf-token": RequestToGetToken,
            "content-type": "application/json",
        },
        data: JSON.stringify({
            "ctype": "Username",
            "cvalue": username,
            "password": password,
        })
    }).catch(e => e.response);

    const CapatchaSolverPayload = {
        "rblx-challenge-metadata": SecoundAttempReq.headers["rblx-challenge-metadata"],
        "rblx-challenge-id": SecoundAttempReq.headers["rblx-challenge-id"],
        "set-cookie": SecoundAttempReq.headers["set-cookie"],
        "x-csrf-token": RequestToGetToken
    };

    const Solver = new CaptchaSolver(CapatchaSolverPayload);
    await Solver.Start();

    if (Solver.challenge.token.includes("sup=1")) {
        return console.log("Suppressed captcha!");
    };

    const Session = await Solver.Session();

    const Challange = await Session.getChallenge();

    return [Solver, Challange];
}

module.exports = main;