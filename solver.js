const funcaptcha = require('funcaptcha');
const axios = require('axios')

class CaptchaSolver {

    static challengeType = "captcha";

    /**
     * 
     * @param {{ 
     * "rblx-challenge-metadata": string;
     * "rblx-challenge-id": string;
     * "set-cookie": string[],
     * "x-csrf-token": string
     * }} Request 
     */
    constructor(Request) {
        this.rblx_metadata = Request['rblx-challenge-metadata'];
        this.rblx_id = Request['rblx-challenge-id'];
        this.cookies = Request['set-cookie'].join('; ');
        this.csrf = Request['x-csrf-token'];

        /** @type {{ unifiedCaptchaId: string, dataExchangeBlob: string }} */
        this.rblx_metadata_decoded = JSON.parse(Buffer.from(this.rblx_metadata, 'base64').toString('utf-8'));
        this.unifiedCaptchaId = this.rblx_metadata_decoded['unifiedCaptchaId'];
    }

    /**
     * 
     * @param {string} site 
     */
    async Start(site = "https://roblox.com/login") {
        this.challenge = await funcaptcha.getToken({
            pkey: "476068BF-9607-4799-B53D-966BE98E2B81",
            surl: "https://roblox-api.arkoselabs.com",
            data: {
                "blob": this.rblx_metadata_decoded.dataExchangeBlob,
            },
            site: site,
        });

        return this.challenge;
    }

    async continueToken(ActionType = "Login") {
        if (!this.challenge) throw new Error("You need to to use the token first");

        const req = await axios.default.post('https://apis.roblox.com/challenge/v1/continue', {
            data: {
                body: {
                    challengeId: this.rblx_id,
                    challengeMetadata: JSON.stringify({
                        unifiedCaptchaId: this.rblx_metadata_decoded.unifiedCaptchaId,
                        captchaToken: this.challenge.token,
                        actionType: ActionType
                    }),
                    challengeType: CaptchaSolver.challengeType
                },
                headers: {
                    "content-type": "application/json",
                    "cookie": this.cookies,
                    "x-csrf-token": this.csrf,
                },
                
            }
        });

        return req;
    }

    /**
     * 
     * @returns {funcaptcha.Session}
     */
    Session() {
        this.session = new funcaptcha.Session(this.challenge.token);
        return this.session
    }
}

module.exports.CaptchaSolver = CaptchaSolver