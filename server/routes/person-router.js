const express = require('express');

const PersonCtrl = require('../controllers/person-ctrl');

const router = express.Router();

router.post('/person', PersonCtrl.createPerson);
router.put('/person/:id', PersonCtrl.updatePerson);
router.delete('/person/:id', PersonCtrl.deletePerson);
router.get('/person/:id', PersonCtrl.getPersonById);
router.get('/persons', PersonCtrl.getPersons);

module.exports = router;