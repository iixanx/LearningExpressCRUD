const mypage = (req, res) => {
    const {id} = req;

    return id;
}

const list = (req, res) => {
    return ["id1", "id2", "id3"]
}

module.exports = {
    mypage,
    list,
}