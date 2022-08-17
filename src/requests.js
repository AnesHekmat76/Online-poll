const token =
  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmVzMTIiLCJpYXQiOjE2NjA1ODIzNTcsImV4cCI6MTY2MDY2ODc1N30.WTmuOg9I5ydJ-QHKYxC2UuzBErq6LH2Tdc6Ww592EvlSgLrphfHCB7d8XlpoVjsTJqT7pZGRSOUkFvp3hFzw_g";

fetch(`http://192.168.1.106:8080/poll/delete/ARIqWBVEvA`, {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  // body: JSON.stringify({ name: "kuni" }),
})
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

fetch(`http://192.168.1.106:8080/participant/create?selectedOptionsId=9,10`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    // Authorization: token,
  },
  body: JSON.stringify({ name: "kuni" }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

fetch(`http://192.168.1.106:8080/poll/find-all`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

const newPoll = {
  title: "Dinner",
  description: "What should we eat",
  options: [
    {
      optionName: "kebab",
    },
    {
      optionName: "sandwitch",
    },
    {
      optionName: "pizza",
    },
  ],
};

fetch(`http://192.168.1.106:8080/poll/create`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  body: JSON.stringify(newPoll),
})
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

const reqBody = {
  title: "Breakfast",
  description: "What should we eat for breakfast",
};

fetch(`http://192.168.1.106:8080/poll/edit/YxkDq5yDqN`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  body: JSON.stringify(reqBody),
})
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

fetch(`http://192.168.1.106:8080/poll/find-by-link/FSrEMKz1Be`)
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

fetch(
  `http://192.168.1.106:8080/user/signing?username=${userNameValue}&password=${passwordValue}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then((res) => res.text())
  .then((data) => console.log(data));
