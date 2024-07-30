const NotesTakingController = require('../controller/NotesTakingController');

router.post('/createnote', NotesTakingController.createFile);
router.get('/getallnotes', NotesTakingController.getAllFiles);
router.get('/search/:filename', NotesTakingController.searchFileContent);

module.exports = router;
