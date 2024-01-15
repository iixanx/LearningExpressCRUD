const { where } = require('sequelize');
const { write } = require('../model');

const getList = async (req, res) => {
    const list = await write.findAll();

    return res.status(200).json({
        "data" : list
    })
}

const create = async (req, res) => {
    const { user, head, body } = req.body

    const data = await write.create({
        user,
        head,
        body
    })

    return res.status(201).json({
        data
    })
}

const getOne = async (req, res) => {
    const { id } = req.params;

    const data = await write.findOne({
        where: { writeId: id }
    })

    if(!data) return res.status(404).json({"res" : "존재하지 않는 데이터"})

    return res.status(200).json({
        data
    })
}

const patchOne = async (req, res) => {
    const { id } = req.params;
    const { body } = req.body;

    const thisBoard = await write.findOne({
        where: { writeId: id }
    })

    if(!thisBoard) return res.status(404).json({})

    const data = await thisBoard.update({
        body
    })

    return res.status(200).json({
        data
    })
}

const putOne = async (req, res) => {
    const { id } = req.params;
    let { user, head, body } = req.body;

    const thisBoard = await write.findOne({
        where: { writeId: id }
    })

    if(!thisBoard) return res.status(404).json({"res" : "존재하지 않는 데이터"})

    if(!user) user = thisBoard.user
    if(!head) head = thisBoard.head
    if(!body) body = thisBoard.body

    const data = await thisBoard.update({
        user,
        head,
        body
    })

    return res.status(200).json({
        data
    })
}

const deleteOne = async (req, res) => {
    const { id } = req.params;

    const thisBoard = await write.findOne({
        where: { writeId: id}
    })

    if(!thisBoard) return res.status(404).json({ "res" : "존재하지 않는 데이터" })

    await thisBoard.destroy()

    // await write.destroy({ where : { writeId : id }})

    return res.status(204).json({})
}

module.exports = {
    getList,
    create,
    getOne,
    patchOne,
    putOne,
    deleteOne,
}