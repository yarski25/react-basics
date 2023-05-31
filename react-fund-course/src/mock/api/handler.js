import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:5000', (req, res, ctx) => {
    // successful response
    return res(
      ctx.status(200),
      ctx.json({
        users: [
          {
            id: 1,
            name: 'user 1',
            email: 'user1@email.com',
          },
          {
            id: 2,
            name: 'user 2',
            email: 'user2@email.com',
          },
          {
            id: 3,
            name: 'user 3',
            email: 'user3@email.com',
          },
          {
            id: 4,
            name: 'user 4',
            email: 'user4@email.com',
          },
          {
            id: 5,
            name: 'user 5',
            email: 'user5@email.com',
          },
          {
            id: 6,
            name: 'user 6',
            email: 'user6@email.com',
          },
          {
            id: 7,
            name: 'user 7',
            email: 'user7@email.com',
          },
          {
            id: 8,
            name: 'user 8',
            email: 'user8@email.com',
          },
          {
            id: 9,
            name: 'user 9',
            email: 'user9@email.com',
          },
          {
            id: 10,
            name: 'user 10',
            email: 'user10@email.com',
          },
        ],
      }),
      ctx.delay(30),
    );
  }),
];
