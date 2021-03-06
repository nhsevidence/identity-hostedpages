import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ForgotPassword from '../ForgotPassword'

Enzyme.configure({ adapter: new Adapter() })

describe('ForgotPassword components', () => {
  let el
  let instance
  const auth = {
    forgotPassword: jest.fn()
  }
  const functionSignature = 'a function signature'
  jest.mock('../../../services/AuthApi')

  beforeEach(() => {
    el = shallow(<ForgotPassword />)
    instance = el.instance()
    instance.auth = auth
    instance.requestErrorCallback = functionSignature
  })

  it('should render <ForgotPassword /> correctly', () => {
    expect(el).toMatchSnapshot()
  })

  it('should instantiate AuthApi', () => {
    expect(instance.auth).toBe(auth)
  })

  it('should render correctly when there is an error', () => {
    el.setState({ error: 'this is an error' }).update()
    expect(el).toMatchSnapshot()
  })

  it('should render correctly when there is email', () => {
    el.setState({
      valid: true
    }).update()
    expect(el).toMatchSnapshot()
  })

  it('should call the AuthApi forgotPAssword when login is invoked', () => {
    const email = 'username@email.com';
    const history = undefined;
    el.setState({
      email,
      history
    }).update();

    instance.forgotPassword();
    expect(instance.auth.forgotPassword).toBeCalledWith(email, expect.any(Function), history);
  })
})
