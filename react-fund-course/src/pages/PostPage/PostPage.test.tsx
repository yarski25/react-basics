import { cleanup, render, screen } from '@testing-library/react';
import PostPage from './PostPage';
import axios from 'axios';
import { unmountComponentAtNode } from 'react-dom';

// jest.mock("axios", () => ({
//   create: jest.fn()
// }))

// (axios.create as jest.Mock).mockReturnValue({
//   get: getMock
// })

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PostPage tests', () => {
  //let responsePost: { data: { id: number; title: string }[] };
  //let responsePost: { data: { id: number; title: string } };
  //let responseComments: { data: {id: number; email: string; body: string}[]};

  beforeEach(() => {
    // responsePost = {
    //   data: [
    //     {
    //       id: 1,
    //       title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    //     },
    //     {
    //       id: 2,
    //       title: 'qui est esse',
    //     },
    //     {
    //       id: 3,
    //       title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    //     },
    //   ],
    // };
  });

  afterEach(() => {
    cleanup();
  });

  it('should render PostPage', () => {
    const { container } = render(<PostPage />);
    expect(container).toBeInTheDocument();
  });

  it('should render h1 post header', () => {
    render(<PostPage />);
    expect(screen.getByTestId('post-h1')).toBeInTheDocument();
  });

  it('should render h1 comments header', () => {
    render(<PostPage />);
    expect(screen.getByTestId('comments-h1')).toBeInTheDocument();
  });

  it('should render h1 post header with defined text context', () => {
    render(<PostPage />);
    expect(screen.getByTestId('post-h1')).toHaveTextContent('Вы открыли страницу поста с ID =');
  });

  it('should render h1 comments header with defined text context', () => {
    render(<PostPage />);
    expect(screen.getByTestId('comments-h1')).toHaveTextContent('Комментарии');
  });

  it('should test post item', async () => {
    const responsePost = {
      data: {
        id: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      },
    };

    (mockedAxios.get as jest.Mock).mockReturnValueOnce(responsePost);
    //mockedAxios.get.mockResolvedValue(responsePost);
    render(<PostPage />);
    const post = await screen.findByTestId('post-div');
    expect(post).toHaveTextContent(responsePost.data.id.toString() + ' ' + responsePost.data.title);
    expect(mockedAxios.get).toHaveBeenCalled();
    screen.debug();
  });

  it('should test post comments', async () => {
    const commentsPost = {
      data: [
        {
          email: 'Eliseo@gardner.biz',
          body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente accusantium',
        },
        {
          email: 'Jayne_Kuhic@sydney.com',
          body: 'est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod ullam at voluptatem error expedita pariatur nihil sint nostrum voluptatem reiciendis et',
        },
        {
          email: 'Nikita@garfield.biz',
          body: 'quia molestiae reprehenderit quasi aspernatur aut expedita occaecati aliquam eveniet laudantium omnis quibusdam delectus saepe quia accusamus maiores nam est cum et ducimus et vero voluptates excepturi deleniti ratione',
        },
      ],
    };

    (mockedAxios.get as jest.Mock).mockReturnValueOnce(commentsPost);
    render(<PostPage />);
    const comments = await screen.findAllByTestId('comment-div');
    screen.debug();
    expect(comments.length).toBe(3);
    //expect(post).toHaveTextContent(commentsPost.data.id.toString() + ' ' + responsePost.data.title);
    expect(mockedAxios.get).toHaveBeenCalled();
    screen.debug();
  });

  //   it('should test form has attributes', () => {
  //     render(<Login />);
  //     const form = screen.getByTestId('login-form');
  //     expect(form).toHaveAttribute('action', '');
  //     expect(form).not.toHaveAttribute('disabled');
  //   });

  //   it('should test form functionality', async () => {
  //     const onSubmit = jest.fn();
  //     render(<Login onSubmit={onSubmit} />);

  //     expect(onSubmit).not.toHaveBeenCalledWith({
  //       username: '',
  //       password: '',
  //     });

  //     fireEvent.click(screen.getByTestId('login-button'));

  //     expect(onSubmit).toHaveBeenCalledWith({
  //       username: '',
  //       password: '',
  //     });

  //     const username = 'james';
  //     const pwd = 'bond';

  //     await userEvent.type(screen.getByTestId('username-input'), username);
  //     await userEvent.type(screen.getByTestId('password-input'), pwd);

  //     fireEvent.click(screen.getByTestId('login-button'));

  //     expect(onSubmit).toHaveBeenCalledWith({
  //       username: username,
  //       password: pwd,
  //     });
  //   });
});
