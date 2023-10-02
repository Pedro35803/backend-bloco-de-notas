const isAuttenticate = () => {
    const { userId } = req.session;
    if (userId) {
        next();
    } else {
        res.status(401).json({ message: "User not autheticated." });
    }
};

export default isAuttenticate;
