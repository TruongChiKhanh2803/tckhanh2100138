import dotenv from 'dotenv'
import express from 'express'
import http from 'http';
import { default as date } from './date';

// var getURL = require("./getURL");
import getURL from './getURL';
const app = express()
dotenv.config()
const port = process.env.PORT || 6868;

http.createServer((req, res) => {

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    res.write(`${date()}<br/>`);
    res.write(getURL.getPath(req) + "<br>");
    res.write(getURL.getParamsURL(req) + "<br>");
    res.write('Hello KTPM0121, chúc bạn thành công với Nodejs');
    res.end();

}).listen(port)
