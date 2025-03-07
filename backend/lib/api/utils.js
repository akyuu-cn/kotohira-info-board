export function ping(req, res) {
    const _ = {
        success: true,
        message: "Potato is here!!!!"
    };
    res.status(200).send(_);
}
