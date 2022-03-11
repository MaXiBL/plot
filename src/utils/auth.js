
let hostArr = [
    'http://192.168.90.122:3342', // 生产环境 
    'asdfjl',//线上环境 
]
// 合约地址
let adrContractArr = [
    {
        ivp: '0x809d550fca64d94Bd9F66E60752A544199cfAC3D',
        sales: '0x4c5859f0F772848b2D91F1D83E2Fe57935348029'
    }, {
        ivp: '0x4cc95f4d3857B6e06d755c1B388A634856971620',
        sales: '0xB4bB4DeE64A8503ca63228655Ad0E6F12B1F1B17'
    }
]
let baseURL = ''
let adrContract = {}
let ChainId 
switch (process.env.VUE_APP_CURENV) {
    case 'dev':
        baseURL = hostArr[0]
        adrContract = adrContractArr[0]
        ChainId = 31337
        break
    case 'pro':
        baseURL = hostArr[1]
        adrContract = adrContractArr[1]
        ChainId = 56
        break
}

export { baseURL, adrContract, ChainId};














