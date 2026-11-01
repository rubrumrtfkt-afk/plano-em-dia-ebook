import config from '../vite.config.js';

test('landing servida na raiz do domínio próprio (planoemdia.online)', () => {
  expect(config.base).toBe('/');
});
