import { CarTroubleshooter } from "../CarTroubleshooter"

describe("CarTroubleshooter instantiation", () => {
    const tree_path = "options.json"
    describe("given a valid choice tree", () => {
        const carTroubleshooter = new CarTroubleshooter(tree_path)

        carTroubleshooter.loadBinaryChoiceTree(tree_path)

        expect(carTroubleshooter.binaryChoiceTree.valid).toBe(true)
        // write other tests

    })
})