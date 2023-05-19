import {act} from 'react-dom/test-utils';
import * as ReactDOM from "react-dom";
import ErrorPage from './ErrorPage';

describe('ErrorPage', function () {
   it('should display h1', function () {
       let container = document.createElement('div');
       document.body.appendChild(container);
       act(() => {
           ReactDOM.render(<ErrorPage />, container);
       })
       const header = container.querySelector('h1');
       expect(header?.textContent).toBe("Page not exists!")
   });
});