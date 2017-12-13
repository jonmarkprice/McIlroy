const USER = { // namespace
  LOGIN: 'USER::LOGIN'
, LOGOUT: 'USER::LOGOUT'
};

const login = username =>
  ({type: USER.LOGIN, username});

const logout = username =>
  ({type: USER.LOGOUT, username});

module.exports = {
  USER
, login
, logout
};
