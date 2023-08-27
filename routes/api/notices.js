const express = require("express");
const router = express.Router();

const {
  isValidId,
  authenticate,
  validateBody,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/notice");
const ctrl = require("../../controllers/notices");


// Add notice by authorized user endpoint 
router.post("/", authenticate, upload.single("image"), validateBody(schemas.addNoticeSchema), ctrl.addNotice);

// Endpoint for search notice by parameter category (a priory "sell")
// and searchQuery (search by name  + pagination)
router.get("/", ctrl.searchNotices);

// Get own notices by authorized user endpoint 
router.get("/own", authenticate, ctrl.getOwnNotices);

// Get favorite notices by authorized user endpoint 
router.get("/favorites", authenticate, ctrl.getFavoriteNotices);

// Get notice by Id endpoint
router.get("/:noticeId", isValidId, ctrl.getNoticeById);

// Add/delete notice into/from favorites 
router.patch("/:noticeId", authenticate, isValidId, ctrl.favoriteNotices);

//  Delete notice by authorized user endpoint 
router.delete("/:noticeId", authenticate, isValidId, ctrl.removeNotice);


module.exports = router;
