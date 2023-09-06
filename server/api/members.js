const express = require('express');
const router = express.Router();

const { getMemberById, getAllMembers, createMember, updateMember, deleteMember, loginMember } = require('../db/helpers/members')

// A GET request for a single user by id
router.get('/:member_id', async (req, res, next) => {
    try{
        const member = await getMemberById(req.params.member_id);
        res.send(member);
    } catch (error) {
        next(error);
    }
})

// A GET request for all members
router.get('/', async (req, res, next) => {
    try{
        const members = await getAllMembers();
        res.send(members);
    } catch (error) {
        next(error);
    }
});

// A POST request to add a new member
router.post('/', async (req, res, next) => {
    try{
        const member = await createMember(req.body);
        res.send(member);
    } catch (error) {
        next(error);
    }
});

// A PUT or PATCH request to update member by id
router.put('/:member_id', async (req, res, next) => {
    try{
        const member = await updateMember(req.params.member_id, req.body);
        res.send(member);
    } catch (error) {
        next(error);
    }
});

// A DELETE request to delete a member by id
router.delete('/:member_id', async (req, res, next) => {
    try{
        const member = await deleteMember(req.params.member_id);
        res.send(member);
    } catch (error) {
        next(error);
    }
});

// POST - /api/members/login - login
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body; 
        console.log("body", req);

        const member = await loginMember(username, password);      
        res.json({ member });
    } catch (error) {
        next(error); 
    }
});

module.exports = router;