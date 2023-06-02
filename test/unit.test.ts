import { CarTroubleshooter } from "../CarTroubleshooter"

describe("CarTroubleshooter works as expected", () => {
    const valid_json_tree_path = "options.json"

    describe("given a valid choice tree", () => {
        let carTroubleshooter: CarTroubleshooter

        try {
            carTroubleshooter = new CarTroubleshooter(valid_json_tree_path)
        } catch(err) {

        }

        it("should set the first question right", () => {
            const { question, isEnd, availableChoices: { yes, no } } = carTroubleshooter.getCurrentQuestion()

            expect(question).toBe("Is the car silent when you turn the key?")
            expect(yes).toBe(true)
            expect(no).toBe(true)
            expect(isEnd).toBe(false)

        })
        
        it("should change the question if a valid answer is registered", () => {
            const { registered, error } = carTroubleshooter.registerAnswer("y")
        
            expect(registered).toBe(true)
            expect(error).toBeUndefined()

            const { question, isEnd, availableChoices: { yes, no } } = carTroubleshooter.getCurrentQuestion()

            expect(question).toBe("Are the battery terminals corroded?")

            expect(yes).toBe(true)
            expect(no).toBe(true)
            expect(isEnd).toBe(false)

        })

        it("should reset the choice tree if startOver is called", () => {
            carTroubleshooter.startOver()

            const { question, isEnd, availableChoices: { yes, no } } = carTroubleshooter.getCurrentQuestion()

            expect(question).toBe("Is the car silent when you turn the key?")
            expect(yes).toBe(true)
            expect(no).toBe(true)
            expect(isEnd).toBe(false)
        })
        // write other tests

    })


    const invalid_json_tree_path = "invalid.json"

    describe("given an invalid choice tree", () => {
        it("should thow an error if I try to instantiate the tree", () => {
            try {
                const carTroubleshooter = new CarTroubleshooter(invalid_json_tree_path)
                expect(true).toBe(false)
            } catch (err) {
                expect(err).toBeDefined()
            }
        })
    })
})