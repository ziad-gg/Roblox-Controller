const noblox = require('noblox.js');
const { default: axios } = require('axios');

const cookie = '.ROBLOSECURITY=_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_A8B3BF062AEDF52E9FD32A9086533114EE4BF1F40EB160D712339F856BC236C63C3568F9300D55B54A5ECFAFE2EB6776934480C24D730914690BC8900616A771D53FCF711CA76E56FE41D5BB8984B6AF3FF72A70C0F3E32EA766F7A53ADC7D8E530698B40F8F47EF1EA5E1C8A067E7C5EB5702742BA5981C58127BB90847D32242C794C3015555FCDC3F1C564F07663A537B85E3AE345D0ACF673BA56F852DE66ED22233F788F12781896B71B18E820FBF983BEFA3F8BCB7E88FA082FB4FBFF99D31AE8B2800E153AB249723617E3EA11EBF2A7474F664F46F058A0B11171ABEB93ACE590BE7D3CF721E7AD7D4EB31B37B5AC220754006F9BBF0AB6A41A9988A3437D17AD02A339DD5B6EE8FE4E41C2E317984C7E617647F7F0002C06A5BA560C0053092AA83F20E0F4AA10804F859F3747201E37094E25D1D46B29DA2DAB427532D79DD94DE207A9D4F35145EB5C6F2CDF56CE81E7C4631085986CFD2CC90F3676A1EE198CD929C923F6F0DE4F90DC6B1053A2AEF84F2F90CBAFE118DBAB5C7B222ABD6AA091D1B10BB3E4D832D892633763409D2E0FAFDA70DC3D9AF549A0FA55AC083990C07F407ADDDB121856D9B29F43317D299F5696E89ABBF0AD085B655480A0B; domain=.roblox.com; expires=Sun, 11-Jan-2054 23:55:20 GMT; path=/; secure;'

async function main() {


    await axios({
        url: 'https://auth.roblox.com/v2/logoutfromallsessionsandreauthenticate',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'cookie': cookie,
        }
    }).catch(async Api_Res_Error => {

        await axios({
            url: 'https://auth.roblox.com/v2/logoutfromallsessionsandreauthenticate',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'cookie': cookie,
                'x-csrf-token': Api_Res_Error.response.headers['x-csrf-token']
            }
        }).then(res => {
            console.log(res.data)
        })

    })

}

main()