class AuthRegister {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required|min:3|max:32',
      surname: 'required|min:3|max:32',
      email: 'required|email|unique:users,email',
      password: 'required|confirmed|min:6|max:32',
    };
  }

  get messages() {
    return {
      'name.required': 'Name is required.',
      'name.min': 'Minimum characters for the name is 3',
      'name.max': 'Maximum characters for the name is 32',
      'surname.required': 'Surname is required.',
      'surname.min': 'Minimum characters for the name is 3',
      'surname.max': 'Maximum characters for the name is 32',
      'email.required': 'Email is required.',
      'email.email': 'Invalid email',
      'email.unique': 'Email already exists.',
      'password.required': 'Password is required.',
      'password.confirmed': 'Password must be confirmed.',
      'password.min': 'Minimum characters for the password is 6',
      'password.max': 'Maximum characters for the password is 32',
    };
  }
}

module.exports = AuthRegister;
