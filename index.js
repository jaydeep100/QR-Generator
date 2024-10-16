import express from "express";
import qr from "qr-image";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.render('form.ejs');
})


app.post("/submit", (req, res) => {
    var url = req.body['url'];
    var qr_img = qr.image(`${url}`);
    qr_img.pipe(fs.createWriteStream(__dirname + '/public/images/image.png'));
    res.render("response.ejs", { URL: url });
})


app.listen(port, () => {
    console.log(`listening on port ${port}`);
})
