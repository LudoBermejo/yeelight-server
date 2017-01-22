import YeelightSearch from 'yeelight-wifi';
import winston from 'winston';
import Promise from 'bluebird';

const bulbs = [];


function mapInfoBulb(item) {
  return {
    id: item.id,
    name: item.name,
    model: item.model,
  };
}


function toggle(lightBulb) {
  const mylightBulb = lightBulb || bulbs[0];
  mylightBulb.toggle()
    .then(() => {
      winston.log('debug', 'toggled');
    })
    .catch((err) => {
      winston.log('error', `received some error: ${err}`);
    });
}

function actionInBulb(lightBulb, action, params) {
  const paramBulbs = lightBulb.split(',');
  return bulbs
    .filter((item) => {
      if (paramBulbs.indexOf(item.id) > -1) {
        item[action](params);
        return true;
      }
      return false;
    })
    .map(item => mapInfoBulb(item));
}

function turnOn(lightBulb) {
  return actionInBulb(lightBulb, 'turnOn');
}

function turnOff(lightBulb) {
  return actionInBulb(lightBulb, 'turnOff');
}

function changeColor(lightBulb, color) {
  return actionInBulb(lightBulb, 'setRGB', color);
}

function start(lightBulb) {
  const mylightBulb = lightBulb || bulbs[0];
  mylightBulb.turnOn();
  mylightBulb.setRGB('#f76008');
}

function complete(lightBulb) {
  const mylightBulb = lightBulb || bulbs[0];
  mylightBulb.setRGB('#00FF00');
  setTimeout(() => mylightBulb.turnOff(), 5000);
}

function error(lightBulb) {
  const mylightBulb = lightBulb || bulbs[0];
  mylightBulb.setRGB('#FF0000');
}

function connect() {
  const yeelightSearch = new YeelightSearch();
  console.log('HOLA');
  return new Promise((resolve, reject) => {
    const timeOut = setTimeout(() => reject(), 120000);
    yeelightSearch.on('found', (lightBulb) => {
      console.log('DE');
      winston.log('info', 'Bulb found');
      bulbs.push(lightBulb);
      resolve(lightBulb);
      clearTimeout(timeOut);
    });
  });
}

function getBulbs() {
  console.log(bulbs.length);
  return bulbs.map(item => mapInfoBulb(item));
}

module.exports = {
  connect,
  toggle,
  start,
  complete,
  error,
  turnOn,
  turnOff,
  changeColor,
  getBulbs,
};
