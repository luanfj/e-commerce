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

  async destroy({ request, response, auth }) {
    let refreshToken = request.input('refresh_token');

    if (!refreshToken) {
      refreshToken = request.header('refresh_token');
    }

    await auth.authenticator('jwt').revokeTokens([refreshToken], true);

    return response.status(204).send();
  }
}

module.exports = TokenController;
