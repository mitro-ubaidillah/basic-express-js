var express = require('express');
var router = express.Router();
const Validator = require('fastest-validator');
const { Mahasiswa, sequelize } = require('../models');
const v = new Validator();

// router.get('/', async (req, res) => {
//     const mahasiswa = await Mahasiswa.findAll();
//     return res.json(mahasiswa);
// });

router.post('/', async (req, res) => {
    const schema = {
        name: 'string',
        address: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    const mahasiswa = await Mahasiswa.create(req.body);

    res.json(mahasiswa);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    let mahasiswa = await Mahasiswa.findByPk(id);

    if (!mahasiswa) {
        return res.json({ message: 'Mahasiswa not found' });
    }

    const schema = {
        name: 'string|optional',
        address: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res
            .status(400)
            .json(validate);
    }

    mahasiswa = await mahasiswa.update(req.body, schema);
    res.json(mahasiswa);
});


router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    let mahasiswa = await Mahasiswa.findByPk(id);

    if (!mahasiswa) {
        return res.json({ message: 'Mahasiswa not found' });
    }

    await mahasiswa.destroy();
    res.json({
        message: 'Data Mahasiswa deleted'
    })
});

router.get('/nilai_mahasiswa', async (req, res) => {
    const nilai_mahasiswa = await sequelize
        .query(`SELECT mahasiswa.name, AVG(nilai.nilai) as nilai_rata_rata
            FROM nilai RIGHT 
                JOIN mahasiswa 
                    ON nilai.id_mahasiswa= mahasiswa.id 
                        GROUP BY mahasiswa.id`
        );

    res.json(nilai_mahasiswa);
});

module.exports = router;
