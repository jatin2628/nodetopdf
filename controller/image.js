const models = require('../models');
const Image = models.Image;

exports.createImage = async(req,res)=>{
    try {
        const imdata = [];
        for(const fl of req.files){
            const image = await Image.create({
                url:fl.filename
            })

            imdata.push(image);
        }
        res.json({"success":"ok","data":imdata})
        
    } catch (e) {
        console.log(e);
        
    }
}