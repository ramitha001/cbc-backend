import Product from "../models/products.js" 

export function getProduct (req,res){
    Product.find().then(
        (productList) => {
            res.json({
                list : productList
            })
        }
    ).catch(
        (err) => {
            res.json({
                message : "error"
            })
        }
    )
}

export function createProduct (req,res){

    console.log(req.user)

    if(req.user == null){
        res.json({
            message : "You are not logged im"
        })
        return
    }

    if(req.user.type != "admin"){
        res.json({
            message : "you are not an admin"
        })
        retutn 
    }

    const product = new Product (req.body)

    product.save().then (()=>{
        res.json({
            message : "Product Registerd"
        })
    }).catch(()=>{
        res.json({
            message : "error"
        })
    })
}

export function deleteProduct (req,res){
    Product.deleteOne({Name : req.body.Name}).then(
        () => {
            res.json({
                message : "Product deleted successfully"
            })
        }
    ).catch(() => {
        res.json({
            message : "Product deletion failed"
        })
})
}

export function getProductByName (req,res){

    const name = req.body.Name;

    Product.find({Name:name}).then(
        (productList) =>{
            res.json({
                list : productList
            })
        }
    ).catch(
        ()=>{
            res.json({
                message : "error"
            })
        }
    )
}