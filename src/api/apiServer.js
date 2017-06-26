import Hapi from 'hapi';
import winston from 'winston';
import hapiBluebird from 'hapi-bluebird';
import YeelightController from './../yeelightController/yeelightController';

function init() {
  const server = new Hapi.Server();

  server.connection({
    port: 8080,
  });

  server.route({
    method: 'GET',
    path: '/alive',
    handler: (request, reply) => {
      reply('Yes, I\'m alive');
    },
  });

  server.route({
    method: 'GET',
    path: '/api/v1/bulbs',
    handler: (request, reply) => {
      reply(YeelightController.getBulbs());
    },
  });

  server.route({
    method: 'POST',
    path: '/api/v1/bulbs/turnOn',
    handler: (request, reply) => {
      reply(YeelightController.turnOnAllBulbs());
    },
  });

  server.route({
    method: 'POST',
    path: '/api/v1/bulbs/turnOff',
    handler: (request, reply) => {
      reply(YeelightController.turnOffAllBulbs());
    },
  });

  server.route({
    method: 'POST',
    path: '/api/v1/bulbs/turnOn/{bulbs}',
    handler: (request, reply) => {
      reply(YeelightController.turnOn(request.params.bulbs));
    },
  });

  server.route({
    method: 'POST',
    path: '/api/v1/bulbs/turnOff/{bulbs}',
    handler: (request, reply) => {
      reply(YeelightController.turnOff(request.params.bulbs));
    },
  });

  server.route({
    method: 'POST',
    path: '/api/v1/bulbs/color/{bulbs}/{color}',
    handler: (request, reply) => {
      reply(YeelightController.changeColor(request.params.bulbs, `#${request.params.color}`));
    },
  });

  return server.start();
}

export default { init };
