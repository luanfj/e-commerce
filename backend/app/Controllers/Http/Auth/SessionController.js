class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();

    const data = await auth.withRefreshToken().attempt(email, password);

    return response.send({ data });
  }
}

module.exports = SessionController;
