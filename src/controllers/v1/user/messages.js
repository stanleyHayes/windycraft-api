exports.createMessage = async (req, res) => {
    try {
        res.status(201).json({message: 'Message created successfully', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
