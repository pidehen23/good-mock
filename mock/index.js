const goodMock = require('good-mock')

const config = {
  host: 'localhost',
  port: 1234,
  https: false
}

const server = new goodMock.Mock(config)

void server.start()
