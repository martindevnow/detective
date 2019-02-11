export default (Vuex) => {
  return {
    install() {
      var dispatchCalls = [];
      var temp = Vuex.Store.prototype.dispatch;

      Vuex.Store.prototype.dispatch = function actionWatcher() {
        const [type, payload, ...args] = arguments;
        let payloadStr;
        if (typeof(payload) === 'object') {
          payloadStr = JSON.stringify(payload);
        } else if (payload === undefined) {
          payloadStr = '';
        } else {
          payloadStr = payload + '';
        }
        dispatchCalls.push([`[ACTION] :: ${type} (${payloadStr})`, ...args]);
        return temp.apply(this, arguments);
      };

      // Log on an interval to avoid blocking
      setInterval(function() {
        while(dispatchCalls.length) {
          console.log(dispatchCalls.shift());
        }
      }, 500);
    }
  }
};
