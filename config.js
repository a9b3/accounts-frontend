const config = {}

config.dev = {
  debug: true,
  accountsBackend: `http://localhost:8081`,
}

config.production = {
  debug: false,
  accountsBackend: `http://accounts.staging-samlau.us`,
}

module.exports = config[process.env.NODE_ENV] || config.dev
