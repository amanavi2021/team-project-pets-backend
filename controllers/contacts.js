const { Contact } = require("../models/contact");
const {HttpError, ctrlWrapper} = require("../helpers");
 const { schemas } = require("../models/contact");

const listContacts = async (req, res) => {
      const {_id: owner} = req.user;
      const {page=1, limit=20, favorite=false} = req.query;
      console.log('favor', favorite);
      const skip= (page - 1) * limit;
      const result = await Contact.find({owner, favorite}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email subscription");
      res.json(result);    
  };

  const getContactById = async (req, res) => {
      const {contactId} = req.params;
      const result = await Contact.findById(contactId);
      if (!result) {
      throw HttpError(404,"Not found");
      }
      res.json(result);
  };

  const addContact = async (req, res) => {
      const {error} = schemas.addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, "missing required name field")
      };
      const {_id: owner} = req.user;
      const result  = await Contact.create({...req.body, owner});
      res.status(201).json(result);
  };

  const updateContact = async (req, res) => {
      const {error} = schemas.addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, "missing fields")
      };
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    };

    const updateStatusContact = async (req, res) => {
      const {error} = schemas.updateFavoriteSchema.validate(req.body);
      if (error) {
        throw HttpError(400, "missing field favorite")
      };
      const {contactId} = req.params;
      const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});
      if(!result) {
        throw HttpError(404, "Not found");
      }
      res.json(result);
    };

  const removeContact = async (req, res) => { 
      const {contactId} = req.params;
      const result = await Contact.findByIdAndRemove(contactId);
      if (!result){
        throw HttpError(404, "Not found");
      }
      res.json({
        message: "contact deleted"
      })
  };

  module.exports =  {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    removeContact: ctrlWrapper(removeContact), 
 
  }