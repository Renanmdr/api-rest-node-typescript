import { server } from './server/Server';

server.listen(3333, () => {
  console.log('Api rodando na porta 333');
});