const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const CodecsController = require("../controllers/codecs");

router.get("/", CodecsController.get_all);

router.post("/", CodecsController.create_codec);

router.get("/:codecId", CodecsController.get_codec);

router.get("/app/:app", CodecsController.get_codec_by_app);

router.get("/mac/:mac", CodecsController.get_codec_by_mac);

router.patch("/:codecId", CodecsController.update_codec);

router.post("/uploadFile", CodecsController.uploadFile);

router.post("/uploadTo", CodecsController.uploadToCodec);

router.delete("/:codecId", CodecsController.delete_codec);

router.get("/shutdown/:codecId", CodecsController.shutdown_codec);

router.get("/restoreConfig/:codecId", CodecsController.restore_config);

module.exports = router;
