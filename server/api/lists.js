const express = require('express');
const router = express.Router();

const { getAllLists, getListById, createList, updateList, deleteList } = require('../db/helpers/lists')

// A GET request for a single list by id
router.get('/:list_id', async (req, res, next) => {
    try{
        const list = await getListById(req.params.list_id);
        res.send(list);
    } catch (error) {
        next(error);
    }
})

// A GET request for all lists
router.get('/', async (req, res, next) => {
    try{
        const lists = await getAllLists();
        res.send(lists);
    } catch (error) {
        next(error);
    }
});

// A POST request to add a new list
router.post('/', async (req, res, next) => {
    try{
        const list = await createList(req.body);
        res.send(list);
    } catch (error) {
        next(error);
    }
});

// A PUT or PATCH request to update list by id
router.put('/:list_id', async (req, res, next) => {
    try{
        const list = await updateList(req.params.list_id, req.body);
        res.send(list);
    } catch (error) {
        next(error);
    }
});

// A DELETE request to delete a list by id
router.delete('/:list_id', async (req, res, next) => {
    try{
        const list = await deleteList(req.params.list_id);
        res.send(list);
    } catch (error) {
        next(error);
    }
});

module.exports = router;