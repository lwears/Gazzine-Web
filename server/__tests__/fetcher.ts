import fetchAllPosts from '../fetcher';

describe('fetcher function', () => {
  test('has 10 articles', async () => {
    const result = await fetchAllPosts();
    expect(result.length).toBe(10);
  });
})