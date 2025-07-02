const Category = require("../../models/Sher/sherCategoryModel")

// -------Check Validation and add Category -------

function add_sher_category(req,res){
    console.log(req.body)
    console.log(req.file)
    var validation = ""
    if(req.body.Category_name == "")
    {
        validation += "Category name is required "
    }
    
    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            message:validation
        })
    }
    else{

        let categoryobj = new Category()
        categoryobj.Category_name = req.body.Category_name
         
        categoryobj.save()
        res.json({
            'status':200,
            'success':true,
            'message':'Category inserted',
            'data':req.body
        })
    }
    
}

// --------get all category start-----------

getall_sher_category = (req,res)=>{
    Category.find(req.body).exec()
    .then(categorydata=>{
        res.json({
            'status':200,
            'success':true,
            'message':'data loaded',
            'data':categorydata
        })
    })
    .catch(err=>{
        res.json({
            status:500,
            success:false,
            message : 'Error Occur',
            error : String(err)
        })
    })
    
}


// ---------get single category-----------
getsingle_sher_category = (req,res)=>{
    // console.log(req.body)
    var validate = ""
    if(req.body._id == "")
    {
        validate += "_id is required"
    }

    if(!!validate)
    {
        res.json({
            status:409,
            success:false,
            message:validate
        })
    }
    else{
        Category.findOne({_id:req.body._id})
        .then(categorydata=>{
            res.json({
                'status':200,
                'success':true,
                'message':'data loaded',
                'data':categorydata
            })
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                message : 'Error Occur',
                error : String(err)
            })
        })
    }
}

// --------update category-----------
// ----------------------------------------------------------
update_sher_category = (req, res) => {
    var validation = ""
    console.log(req.body)
    console.log(req.files)
    if (req.body._id == "") {
        validation += "ID is required \n"
    }
    if (req.body.Category_name == "") {
        validation += "Category name is required \n"
    }
   

    if (!!validation) {
        res.json({
            status: 409,
            success: false,
            message: validation
        })
    }
    else {
        //check whether data exists or not wrt particular id
        Category.findOne({ _id: req.body._id })
            .then(categorydata => {
                if (categorydata == null) {
                    res.json({
                        status: 409, success: false, message: 'Data not found'
                    })
                }
                else {
                    //updateCategory 
                    categorydata.Category_name = req.body.Category_name
                    categorydata.save()

                    res.json({
                        status: 200, success: true, message: 'Record updated'
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    message: 'Error',
                    error: String(err)
                })
            })
    }
}
// ----------------------------------------------------------------
delete_sher_data = (req,res)=>{
    var validation = ""
    if(req.body._id == "")
    {
        validation += "ID is required "
    }
   
    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            message:validation
        })
    }
    else{
        //check whether data exists or not wrt particular id
        Category.findOne({_id:req.body._id})
        .then(categorydata=>{
            if(categorydata == null)
            {
                res.json({
                    status:409,success:false,message:'Data not found'
                })
            }
            else{
                //Delete 
                Category.deleteOne({_id:req.body._id})
                .then(data=>{
                    res.json({
                        status:200,success:true,message:'Record Deleted'
                    })
                })
                .catch(err=>{
                    res.json({
                        status:500,
                        success:false,
                        message:'Error',
                        error:String(err)
                    })
                })
            }
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                message:'Error',
                error:String(err)
            })
        }) 
    }
}

const updateSherCategoryStatus = async (req, res) => {
    try {
      const formData = req.body;
  
      if (!formData._id || !formData.status) {
        return res.status(422).json({
          success: false,
          status: 422,
          message: "Both _id and status are required",
        });
      }
  
      const sher = await Category.findOne({ _id: formData._id });
  
      if (!sher) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "No sher Found",
        });
      }
  
      sher.status = formData.status;
      await sher.save();
  
      return res.status(200).json({
        success: true,
        status: 200,
        message: "sher Status Changed Successfully",
        data: sher,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: err.message || "Internal Server Error",
      });
    }
  };
module.exports = {
    add_sher_category,
    getall_sher_category,
    getsingle_sher_category,
    update_sher_category,
    delete_sher_data,
    updateSherCategoryStatus
}
