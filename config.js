const config = {}

config.dev = {
  debug: true,
  accountsBackend: `http://localhost:8081`,
  authUrl: `http://dev.staging-samlau.us:8080`,
  domain: '.staging-samlau.us',
}

config.production = {
  debug: false,
  accountsBackend: `http://accounts-backend.staging-samlau.us`,
  authUrl: `http://accounts.staging-samlau.us`,
  domain: '.staging-samlau.us',
}

module.exports = config[process.env.NODE_ENV] || config.dev
