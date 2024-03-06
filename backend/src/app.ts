import express, { Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as fs from 'fs';
import { GetGroupsResponse } from './types';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors({
    origin: "*"
}))

const port = 3000;

app.get('/api/groups', (req, res: Response<GetGroupsResponse>) => {
    fs.readFile('groups.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Ошибка при чтении файла:', err);
            res.status(500).send({
                result: 0,
                data: undefined
        });
            return;
        }

        try {
            const groups = JSON.parse(data);
            res.status(200).send({
                result: 1,
                data: groups
            })
        } catch (error) {
            console.error('Ошибка при разборе JSON:', error);
            res.status(500).send({
                result: 0,
                data: undefined
        })
        }
    });
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});