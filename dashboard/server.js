const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const aedes = require('aedes')();
const net = require('net');
const mqtt = require('mqtt');

function start() {
  const app = express();
  const httpServer = http.createServer(app);
  const io = socketIo(httpServer, { cors: { origin: '*' } });

  app.use(express.static(__dirname));

  httpServer.listen(4000, () => {
    console.log('Dashboard running at http://localhost:4000');
  });

  const mqttServer = net.createServer(aedes.handle);
  mqttServer.listen(1883, () => {
    console.log('MQTT broker listening on 1883');
  });

  const mqttClient = mqtt.connect('mqtt://localhost:1883');
  mqttClient.on('connect', () => {
    mqttClient.subscribe('agent/#');
  });

  mqttClient.on('message', (topic, message) => {
    io.emit('update', { topic, message: message.toString() });
  });

  return { httpServer, mqttServer, mqttClient };
}

if (require.main === module) {
  start();
}

module.exports = { start };
