const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: Product
    })
  res.status(200).json(catData)
  }
  catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id)
  res.status(200).json(catData)
  }
  catch (err) {
    res.status(400).json(err)
  }
});

router.post('/', async (req, res) => {
  try {
    const CategoryData = await Category.create(req.body)
    res.status(200).json(CategoryData)
  } catch (err) {
    res.status(400).json(err)
  }
});

router.put('/:id', async (req, res) => {
  try{
    const catData = await Category.update(req.body, {
      where: { id: req.params.id}
    })

    if (!catData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(`Category ID ${req.params.id} updated`)
  }
  catch (err){
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy({
      where: {id: req.params.id},
    });

    if (!catData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(`Category ID ${req.params.id} deleted`);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
