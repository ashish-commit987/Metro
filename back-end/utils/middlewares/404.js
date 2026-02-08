export const Error404 = (req, res, next) => {
        res.status(404).json({ message: 'OOPs you typed something wrong...' });
}