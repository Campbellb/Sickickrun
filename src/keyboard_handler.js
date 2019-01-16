const {keypress} = require('./game')

export const onKeyDown = function (event, keypress) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        
        keypress.jump = true;
        break;
      case 37: // left
      case 65: // a
      keypress.left = true;
        break;
      case 40: // down
      case 83: // s
      // keypress.space = true;
        break;
      case 39: // right
      case 68: // d
      keypress.right = true;
        break;
      case 32: // space
      keypress.space = true;
        
        break;
      default:
        break;
    }
  };

export const onKeyUp = function (event) {

  };