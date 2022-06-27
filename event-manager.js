const EventManager = () => {
  this.eventsMap = {};

  return {
    emit: (eventName) => {
      if (Array.isArray(this.eventsMap[eventName])) {
        this.eventsMap[eventName].forEach((handlerFn) => {
          if (typeof handlerFn === "function") handlerFn();
        });
      }
    },

    subscribe: (eventName, handlerFn) => {
      if (!this.eventsMap.hasOwnProperty(eventName)) {
        this.eventsMap[eventName] = [];
      }
      this.eventsMap[eventName].push(handlerFn);
      return {
        unsubscribe: () => {
          const index = this.eventsMap[eventName].findIndex(
            (el) => el.prototype === handlerFn.prototype
          );
          this.eventsMap[eventName].splice(index, 1);
        },
      };
    },
  };
};

module.exports = EventManager;
