const express = require('express');
const router = express.Router();

const { getItemById, getAllItems, createItem, updateItem, deleteItem } = require('../db/helpers/items')

// A GET request for a single item by id
router.get('/:item_id', async (req, res, next) => {
    try{
        const item = await getItemById(req.params.item_id);
        res.send(item);
    } catch (error) {
        next(error);
    }
})

// A GET request for all items
router.get('/', async (req, res, next) => {
    try{
        const items = await getAllItems();
        res.send(items);
    } catch (error) {
        next(error);
    }
});

// A POST request to add a new item
router.post('/', async (req, res, next) => {
    try{
        const item = await createItem(req.body);
        res.send(item);
    } catch (error) {
        next(error);
    }
});

// A PUT or PATCH request to update an item by id
router.put('/:item_id', async (req, res, next) => {
    try{
        const item = await updateItem(req.params.item_id, req.body);
        res.send(item);
    } catch (error) {
        next(error);
    }
});

// A DELETE request to delete an item by id
router.delete('/:item_id', async (req, res, next) => {
    try{
        const item = await deleteItem(req.params.item_id);
        res.send(item);
    } catch (error) {
        next(error);
    }
});

module.exports = router;