const EventManager = require("./event-manager");
const eventManager = EventManager();
const TEST_EVENT = "SUCCESS_EVENT";

test("Should execute events handlers", () => {
  const handlerSuccessFn1 = jest
    .fn()
    .mockImplementation(() => console.log("Executed handler 1"));
  const handlerSuccessFn2 = jest
    .fn()
    .mockImplementation(() => console.log("Executed handler 2"));

  eventManager.subscribe(TEST_EVENT, handlerSuccessFn1);
  eventManager.subscribe(TEST_EVENT, handlerSuccessFn2);

  eventManager.emit(TEST_EVENT);

  expect(handlerSuccessFn1).toHaveBeenCalledTimes(1);
  expect(handlerSuccessFn2).toHaveBeenCalledTimes(1);
});

test("Should allow to unsubscribe handlers from specific event", () => {
  const handlerSuccessFn1 = jest
    .fn()
    .mockImplementation(() => console.log("Executed handler 1"));
  const handlerSuccessFn2 = jest
    .fn()
    .mockImplementation(() => console.log("Executed handler 2"));

  const subscription1 = eventManager.subscribe(TEST_EVENT, handlerSuccessFn1);
  const subscription2 = eventManager.subscribe(TEST_EVENT, handlerSuccessFn2);

  subscription1.unsubscribe();

  eventManager.emit(TEST_EVENT);

  expect(handlerSuccessFn1).toHaveBeenCalledTimes(0);
  expect(handlerSuccessFn2).toHaveBeenCalledTimes(1);
});
