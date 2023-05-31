import { act, screen } from '@testing-library/react';
//import { AuthContext } from './context';
import App from './App';
import { renderWithProviders } from './utils/test-utils';

// import { Provider } from 'react-redux'
// import configureStore from 'redux-mock-store'

describe('App', () => {
  it('handles good response', async () => {
    await act(async () => {
      renderWithProviders(<App />);
    });

    //screen.debug();

    screen.getByText('Loading...');

    // await screen.findByRole('heading', { name: /bulbasaur/i });

    // const img = screen.getByRole('img', {
    //   name: /bulbasaur/i,
    // }) as HTMLImageElement;

    // expect(img.src).toBe(
    //   'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
    // );
  });

  // it('handles error response', async () => {
  //   // force msw to return error response
  //   server.use(
  //     rest.get(
  //       'https://pokeapi.co/api/v2/pokemon/bulbasaur',
  //       (req, res, ctx) => {
  //         return res(ctx.status(500))
  //       }
  //     )
  //   )

  //   renderWithProviders(<App />)

  //   screen.getByText('Loading...')

  //   await screen.findByText('Oh no, there was an error')
  // })
});

// describe('With React Testing Library', () => {
//   const initialState = {output:10}
//   const mockStore = configureStore()
//   let store,wrapper

//   it('Shows "Hello world!"', () => {
//     store = mockStore(initialState)
//     const { getByText } = render(<Provider store={store}><App /></Provider>)

//     expect(getByText('Hello Worldd!')).not.toBeNull()
//   })
// })

// describe('Navbar tests', () => {
//   // let container: any = null;
//   // beforeEach(() => {
//   //   // setup a DOM element as a render target
//   //   container = document.createElement('div');
//   //   document.body.appendChild(container);
//   // });

//   // afterEach(() => {
//   //   // cleanup on exiting
//   //   unmountComponentAtNode(container);
//   //   container.remove();
//   //   container = null;
//   // });

//   it('should render App', async () => {
//     const authValue = {
//       isAuth: false,
//       setIsAuth: () => false,
//       isLoading: true,
//     };

//     //const { container } = render(<MyNavbar />);
//     await act(async () => {
//       render(
//         <AuthContext.Provider value={authValue}>
//           <App />
//         </AuthContext.Provider>,
//       );
//     });
//     //sexpect(container).toBeInTheDocument();
//   });

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
// });
