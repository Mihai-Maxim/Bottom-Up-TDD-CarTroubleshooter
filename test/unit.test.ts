import { CarTroubleshooter } from "../CarTroubleshooter"

describe("CarTroubleshooter works as expected", () => {
    const json_tree_path = "options.json"

    describe("given a valid choice tree", () => {
        const carTroubleshooter = new CarTroubleshooter(json_tree_path)

        it("the first question is set right", () => {
            const { question, isEnd, availableChoices: { yes, no } } = carTroubleshooter.getCurrentQuestion()

            expect(question).toBe("Is the car silent when you turn the key?")
            expect(yes).toBe(true)
            expect(no).toBe(true)
            expect(isEnd).toBe(false)

        })
        it("changes the question if a valid answer is registered", () => {
            const { registered, error } = carTroubleshooter.registerAnswer("y")
        
            expect(registered).toBe(true)
            expect(error).toBeUndefined()

            const { question, isEnd, availableChoices: { yes, no } } = carTroubleshooter.getCurrentQuestion()

            expect(question).toBe("Are the battery terminals corroded?")

            expect(yes).toBe(true)
            expect(no).toBe(true)
            expect(isEnd).toBe(false)

        })

        it("resets the choice tree", () => {
            carTroubleshooter.startOver()

            const { question, isEnd, availableChoices: { yes, no } } = carTroubleshooter.getCurrentQuestion()

            expect(question).toBe("Is the car silent when you turn the key?")
            expect(yes).toBe(true)
            expect(no).toBe(true)
            expect(isEnd).toBe(false)
        })
        // write other tests

    })
})