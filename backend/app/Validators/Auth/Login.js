class AuthLogin {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  get messages() {
    return {
      'email.required': 'Email is required.',
      'email.email': 'Invalid email',
      'password.required': 'Password is required.',
    };
  }
}

module.exports = AuthLogin;
