import { act, screen, waitFor } from '@testing-library/react';
//import { AuthContext } from './context';
import App from './App';
import { renderWithProviders } from './utils/test-utils';
import { server } from './mock/api/server';
import { rest } from 'msw';

// import { Provider } from 'react-redux'
// import configureStore from 'redux-mock-store'

// const apiData = [
//   {
//     users: [
//       {
//         id: 1,
//         name: 'user 1',
//         email: 'user1@email.com',
//       },
//       {
//         id: 2,
//         name: 'user 2',
//         email: 'user2@email.com',
//       },
//       {
//         id: 3,
//         name: 'user 3',
//         email: 'user3@email.com',
//       },
//     ],
//   },
// ];

// test('table should render after fetching from API depending on request Query parameters', async () => {
//   // custom msw server
//   server.use(
//     rest.get(`*`, (req, res, ctx) => {
//       const arg = req.url.searchParams.getAll('page');
//       console.log(arg);
//       return res(ctx.json(apiData));
//     }),
//   );

//   // specify table as the render container
//   const table = document.createElement('table');

//   // wrap component with custom render function
//   const { container } = renderWithProviders(<App />, {
//     container: document.body.appendChild(table),
//   });

//   const allRows = await screen.findAllByRole('row');

//   await waitFor(() => {
//     expect(container).toBeInTheDocument();
//   });

//   await waitFor(() => {
//     expect(allRows.length).toBe(10);
//   });
// });

describe('App', () => {
  it('displays the list of recent users', async () => {
    renderWithProviders(<App />);

    // first Loading...
    expect(screen.getByTestId('users-loading')).toBeInTheDocument();

    // after success fetching users expected
    await waitFor(() => {
      const users = screen.getAllByTestId('user-item');
      expect(users).toHaveLength(10);
    });
  });

  // it('should render App', async () => {
  //   const authValue = {
  //     isAuth: false,
  //     setIsAuth: () => false,
  //     isLoading: true,
  //   };

  //   //const { container } = render(<MyNavbar />);
  //   await act(async () => {
  //     renderWithProviders(
  //       <AuthContext.Provider value={authValue}>
  //         <App />
  //       </AuthContext.Provider>,
  //     );
  //   });
  //   //sexpect(container).toBeInTheDocument();
  // });

  // it('should render h1 post header', async () => {
  //   //render(<PostPage />);
  //   await act(async () => {
  //     render(<PostPage />, container);
  //   });
  //   expect(screen.getByTestId('post-h1')).toBeInTheDocument();
  // });

  // it('should render h1 comments header', async () => {
  //   //render(<PostPage />);
  //   await act(async () => {
  //     render(<PostPage />, container);
  //   });
  //   expect(screen.getByTestId('comments-h1')).toBeInTheDocument();
  // });

  // it('should render h1 post header with defined text context', async () => {
  //   //render(<PostPage />);
  //   await act(async () => {
  //     render(<PostPage />, container);
  //   });
  //   expect(screen.getByTestId('post-h1')).toHaveTextContent('Вы открыли страницу поста с ID =');
  // });

  // it('should render h1 comments header with defined text context', async () => {
  //   //render(<PostPage />);
  //   await act(async () => {
  //     render(<PostPage />, container);
  //   });
  //   expect(screen.getByTestId('comments-h1')).toHaveTextContent('Комментарии');
  // });
});
