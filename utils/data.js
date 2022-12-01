const users = [
    {
      "username": "Luke Skywalker",
      "email": "Luke@jedi.net",
      "thoughts": [],
      "friends": [],
      "__v": 0
    },
    {
      "username": "Darth Vader",
      "email": "daddy@deathstar.com",
      "thoughts": [],
      "friends": [],
      "__v": 0
    }
  ];
  
  const thoughts = [
    {
      "thoughtText": "I am your father",
      "username": "Darth Vader",
      "createdAt": "2022-11-29T07:00:00.076+00:00",
      "reactions": [
        {
          "reactionBody": "Noooo",
          "username": "Luke Skywalker",
          "reactionId": "638083c9417ed0ed80909td85",
          "createdAt": "2022-11-29T07:00:00.076+00:00",
        }
      ],
      "__v": 0
    },
    {
      "thoughtText": "I am your father",
      "username": "Darth Vader",
      "createdAt": "2022-11-29T07:00:00.076+00:00",
      "reactions": [
        {
          "reactionBody": "Noooo",
          "username": "Luke Skywalker",
          "reactionId": "380840e417ed0ed80907d8e",
          "createdAt": "2022-11-29T07:00:00.076+00:00",
        }
      ],
      "__v": 0
    }
  ];
  
  module.exports = { users, thoughts };
  