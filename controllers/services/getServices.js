const Service = require("../../models/service");

const getServices = async (req, res) => {
      
    const result = await Service.find({}, "-createdAt -updatedAt");
    res.status(200).json({
        code: 200,
        status: "success",
        services: result,
       });    
};

module.exports = getServices;