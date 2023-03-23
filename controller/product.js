const models = require('../models');
const Product = models.Product;
const Product_Image = models.Product_Image;
const Image = models.Image;
const pdf = require('html-pdf');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');


exports.createProduct = async(req,res)=>{
    try {
        const userid = req.userid;

        if(!userid){
            return res.json({"success":"fail","msg":"please login to continue"});
        }
        
        const {product_name,price,description,images} = req.body;

        const product = await Product.create({
            product_name:product_name,
            price:price,
            description:description,
            user_id:userid
        })

        const imdata = [];

        for(const im of images){
            imdata.push({
                product_id:product.id,
                image_id:im.id
            })
        }

        const prodimag = await Product_Image.bulkCreate(imdata);

        res.status(201).json({'success':'true','msg':'data inserted','data':product,prodimag});
    } catch (e) {
        console.log(e);
    }
}

exports.getProduct = async(req,res)=>{
    try {
        const userid = req.userid;

        if(!userid){
            return res.json({"success":"fail","msg":"please login to continue"});
        }

        const data = await Product.findAll({where:{user_id:userid}
            ,
            include:[
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    through:{
                        attributes:[]
                    }
                }
            ]
        }
        )

        res.json({"success":true,"msg":"your data is","data":data});
    } catch (e) {
        console.log(e);
    }
}

exports.getProductejs = async (req,res) => {
    try {
        
        const product = await Product.findAll({where:{user_id:'1'}
            ,
            include:[
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    through:{
                        attributes:[]
                    }
                }
            ]
        
    })

    const data = {
        products:product
    }

    const filepath = path.resolve(__dirname,"../views/productpdf.ejs");
    const htmlstring = fs.readFileSync(filepath).toString();
    const option = {
        format:'A4'
    }
    const ejsdata = ejs.render(htmlstring,data);
    pdf.create(ejsdata,option).toFile('product.pdf',(err,response)=>{
        if(err){
            console.log(err);
        }
        const filepath = path.resolve(__dirname,"../product.pdf");
        fs.readFile(filepath,(err,file)=>{
            if(err){
                res.send("could not generate pdf");
            }
            res.setHeader('Content-Type','application/pdf');
            res.setHeader('Content-Disposition','attachment;filename="product.pdf"');
            res.send(file);
        })
    })

        
    } catch (e) {
        console.log(e);
    }
}

exports.displaydata = async (req,res)=>{
    try {
        const product = await Product.findAll({where:{user_id:'1'}
            ,
            include:[
                {
                    model: Image,
                    attributes: ['id', 'url'],
                    through:{
                        attributes:[]
                    }
                }
            ]
        
    })

    res.render('displaydata',{
        products:product
    })
    } catch (e) {
        console.log(e);
    }
}