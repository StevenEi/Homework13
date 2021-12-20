const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(allCategories)
  } catch (err) {
    res.status(500).json(err);
  }
  // find all categories
  // be sure to include its associated Products
  // works
});

router.get('/:id', async (req, res) => {
  try {
    const singleCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(singleCategory);
  } catch (err) {
    res.status(500).json(err);
  }
  // find one category by its `id` value
  // be sure to include its associated Products
  // works 
});

router.post('/', async (req, res) => {
  console.log('REQ>body!!!', req.body)
  try {
    const createCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new category
  // works
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body,{
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});
// works

router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
// works

module.exports = router;
