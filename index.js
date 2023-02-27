import {createWriteStream} from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import express from "express";
import { router as movieRouter } from "./movie/index.js";
import auth from "./auth.js";
import { ensureLoggedIn } from 'connect-ensure-login';

const app = express();
const accessLog = createWriteStream('./acess.log', {flags: 'a'});

function log(request, response, next) {
	console.log(request.url);
	next();
}

app.set('view engine', 'pug');

app.use(express.static(join(dirname(fileURLToPath(import.meta.url)), 'public')));
app.use(log);
app.use(morgan('common', {immediate: true, stream: accessLog}));
app.use(express.urlencoded({extended: false}));

auth(app);
app.use("/movie",ensureLoggedIn('/login.html') , movieRouter);
app.get("/", (request, response) => response.redirect("/movie"));

app.listen(8080, () => {
	console.log("Server is listening to http://localhost:8080");
});
