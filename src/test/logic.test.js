import Brain from "../logic.js"

describe("Simple test ", () => {
  it("init normally", async () => {
    const brain = new Brain
    await brain.init();
    expect(brain.currency1).not.toBe(null)
  })

  it("can convert EUR to EUR", async () => {
      const brain = new Brain
      await brain.init();
      await brain.convert();
      expect(brain.result).toBe(1);
  })
})