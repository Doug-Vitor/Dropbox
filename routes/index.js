const { json } = require('express');
var express = require('express');
var router = express.Router();
var formidable = require('formidable')
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', (req, res) => {
  let form = new formidable.IncomingForm({
    uploadDir: './upload',
    keepExtensions: true
  });

  form.parse(req, (error, fields, files) => {
    res.json({
      files
    })
  })
})

router.delete('/file', (req, res) => {
  let form = new formidable.IncomingForm();

  form.parse(req, (error, fields, file) => {
    let path = fields.path;

    if (fs.existsSync(path))
    fs.unlink(path, err => {
      if (error) res.status(400).json({error});
      else res.json({fields});
    })
  });
});

module.exports = router;
