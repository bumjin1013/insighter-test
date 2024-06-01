import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let eventList = [];

for (let i = 1; i <= 100; i++) {
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomDay = Math.floor(Math.random() * 31) + 1;

  eventList.push({
    id: i,
    name: `Event ${i}`,
    date: `2023-${String(randomMonth).padStart(2, "0")}-${String(
      randomDay
    ).padStart(2, "0")}`,
    time: `${String(Math.floor(Math.random() * 12) + 1).padStart(
      2,
      "0"
    )}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
    location: `Location ${i}`,
    description: `Description for Event ${i}`,
  });
}

const mock = new MockAdapter(axios);

mock.onGet("http://localhost:3000/api/events").reply((config) => {
  return [
    200,
    {
      eventList,
    },
  ];
});

export const getEventLists = async () => {
  const response = await axios.get("http://localhost:3000/api/events");
  return response.data;
};
