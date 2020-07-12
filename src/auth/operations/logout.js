const logout = async (args) => {
  const {
    config,
    collection: {
      config: collectionConfig,
    },
    res,
  } = args;

  const cookieOptions = {
    expires: new Date(0),
    httpOnly: true,
    path: '/',
    overwrite: true,
  };

  if (collectionConfig.auth && collectionConfig.auth.secureCookie) {
    cookieOptions.secure = true;
  }

  res.cookie(`${config.cookiePrefix}-token`, '', cookieOptions);

  return 'Logged out successfully.';
};

module.exports = logout;