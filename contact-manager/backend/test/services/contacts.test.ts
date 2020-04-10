import app from '../../src/app';

describe('\'contacts\' service', () => {
  it('registered the service', () => {
    const service = app.service('contacts');
    expect(service).toBeTruthy();
  });
});
