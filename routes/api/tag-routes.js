const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({include:{ all: true, nested: true }});
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {include: { all: true, nested: true }});

    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedTag) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json({ message: `Tag ID ${req.params.id} updated!` });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagToDelete = await Tag.destroy({ where: { id: req.params.id } });

    if (!tagToDelete) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }

    res.status(200).json({ message: `Tag ID ${req.params.id} deleted`});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
