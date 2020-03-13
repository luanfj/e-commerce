class TokenController {
  async store({ request, response, auth }) {
    let refreshToken = request.input('refresh_token');

    if (!refreshToken) {
      refreshToken = request.header('refresh_token');
    }

    const user = await auth
      .newRefreshToken()
      .generateForRefreshToken(refreshToken);

    return response.send({ data: user });
  }
}

module.exports = TokenController;
