const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tag` endpoint

router.get('/', (req, res) =>{
    Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
      },
    ], 
  }).then((tags) => res.status(200).json(tags))
  .catch((err) => res.status(500).json(err))
}); // works

  // try {
  //   const allTags = await Tag.findAll({
  //      include: [{ model: ProductTag }]
  //   });
  //   res.status(200).json(allTags)
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  // // find all tags
  // // be sure to include its associated Product data


router.get('/:id', async (req, res) => {
  try {
    const singleID = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!singleID) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(singleID);
  } catch (err) {
    res.status(500).json(err);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
}); // works

router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
  // create a new tag
  // works
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body,{
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updateTag);
  } catch (err) {
    res.status(400).json(err);
  }
});
  // update a tag's name by its `id` value
  // works

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
  // delete on tag by its `id` value
  // works
});

module.exports = router;
