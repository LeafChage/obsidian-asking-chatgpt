import { expect, test } from 'bun:test'
import { Prompt } from './prompt';

test('render', async () => {
  const prompt = new Prompt(`word: "<%= it.title %>"`);
  expect(prompt.render({ title: "hello" })).toBe("word: \"hello\"")
})
