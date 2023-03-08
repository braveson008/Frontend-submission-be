const express = require('express');
const Moralis = require('moralis').default;
const app = express();
const cors = require('cors');
const port = 8080;


const evmUtils = require('@moralisweb3/evm-utils')



app.use(cors());
app.use(express.json());


app.get('/all_nfts_contract',async (req,res) => {
    try {
        const { query } = req;


        const {EvmChain} = evmUtils


        const chain = EvmChain[`${query.chain}`];

        const address = query.address;
    
        const cursor = query.cursor;
    

        const limit = query.limit;


        const response = await Moralis.EvmApi.nft.getContractNFTs({
            address,
            chain,
            cursor,
            limit
        });


        return res.status(200).json({response});
    } catch (error) {
        console.log('Something went wrong',error);
        return res.status(400).json({error})
    }
})



Moralis.start({
    apiKey: 'f8stMUBk87EUjwt0ua5sHlVPVzf2O8KIHtLE5f8ZbQTjCSASC2Gjyy8JOKYuOw4H',
}).then(()=>{
    app.listen(port,()=>{
        console.log(`Listening to port ${port}`)
    })
})

