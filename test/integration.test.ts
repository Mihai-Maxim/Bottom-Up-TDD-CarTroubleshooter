import { CarTroubleshooter } from "../CarTroubleshooter"

describe("CarTroubleshooter works as expected", () => {
    const valid_json_tree_path = "./test/options.json"

    describe("given a valid choice tree", () => {

        try {
            const carTroubleshooter = new CarTroubleshooter(valid_json_tree_path, '0')
        } catch (err) {
            console.log(err)
        }

        const carTroubleshooter = new CarTroubleshooter(valid_json_tree_path, '0')

       
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

        it("should reach end for path root -> yes -> yes", () => {
            carTroubleshooter.registerAnswer("y")
            carTroubleshooter.registerAnswer("y")

            const { question, isEnd, availableChoices: { yes, no } } = carTroubleshooter.getCurrentQuestion()

            expect(question).toBe("Clean termianls and try starting again.")
            expect(yes).toBe(false)
            expect(no).toBe(false)
            expect(isEnd).toBe(true)

        })

        it("should not be able to pick yes or no if end is reached", () => {
            const { question } = carTroubleshooter.getCurrentQuestion()
            const answer = carTroubleshooter.registerAnswer("y")
            const { question: question2 } = carTroubleshooter.getCurrentQuestion()
            expect(answer.error).toBe(`y is not available for question: "${question2}"`)
            expect(answer.registered).toBe(false)
            expect(question).toBe(question2)
        })



    })


    const invalid_json_tree_path = "./test/invalid.json"

    const invalid_json_tree_not_json = "./test/notjson.js"

    const invalid_json_tree_path_has_cycles = "./test/cycles.json"

    const invalid_json_tree_path_has_islands = "./test/islands.json"

    describe("given an invalid choice tree", () => {
        it("should thow an error if path to file is not valid", () => {
            try {
                const carTroubleshooter = new CarTroubleshooter(invalid_json_tree_path, '0')

                expect(true).toBe(false)
            } catch (err) {
                expect(err).toBeDefined()
            }
        })

        it("should thow an error if file is not a .json", () => {
            try {
                const carTroubleshooter = new CarTroubleshooter(invalid_json_tree_not_json, "0")

                expect(true).toBe(false)
            } catch (err) {
                expect(err).toBeDefined()
            }
        })

        it("should thow an error if invalid root key is provided", () => {
            try {
                const carTroubleshooter = new CarTroubleshooter(valid_json_tree_path, "really?")

                expect(true).toBe(false)
            } catch (err) {
                expect(err).toBeDefined()
            }
        })

        it("should thow an error if tree contains cycles", () => {
            try {
                const carTroubleshooter = new CarTroubleshooter(invalid_json_tree_path_has_cycles, "0")

                expect(true).toBe(false)
            } catch (err) {
                expect(err).toBeDefined()
            }
        })

        it("should thow an error if tree contains islands", () => {
            try {
                const carTroubleshooter = new CarTroubleshooter(invalid_json_tree_path_has_islands, "0")

                expect(true).toBe(false)
            } catch (err) {
                console.log(err)
                expect(err).toBeDefined()
            }
        })
    })
})