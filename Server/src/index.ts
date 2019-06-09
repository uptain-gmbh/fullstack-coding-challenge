import express from 'express';
import {UptainServer} from './UptainServer';

const applicationServer = express();
const server = new UptainServer(applicationServer);
server.start(5000);

