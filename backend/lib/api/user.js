import { list } from "../user.js";
export function auth(req, res) {
    const json = req.body;
    const user = list.find(u => u.username === json.username && u.password === json.password);
    if (user) {
        res.send({ "success": true });
    }
    else {
        res.send({ "success": false });
    }
}
