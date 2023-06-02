
interface TreeNode {
    q: string;
    y?: string;
    n?: string;
}

type ChoiceTree = Record<string, TreeNode> 

interface BinaryChoiceTree {
    tree?: ChoiceTree
    valid: boolean,
    errors?: string[]
}
interface Choice {
    yes: boolean,
    no: boolean
}
interface Question {
    question: string,
    availableChoices: Choice
    isEnd: boolean
}

interface AnswerStatus {
    registered: boolean,
    error?: string
}

interface ICarTroubleshooter {
    getCurrentQuestion(): Question
    registerAnswer(choice: "y" | "n"): AnswerStatus
    startOver(): void
}


export class CarTroubleshooter implements ICarTroubleshooter {
    private binaryChoiceTree: BinaryChoiceTree;
    private loadBinaryChoiceTree(filePath: string): BinaryChoiceTree {
        throw new Error("Method not implemented.");
    }

    getCurrentQuestion(): Question {
        throw new Error("Method not implemented.")
    }

    registerAnswer(choice: "y" | "n"): AnswerStatus {
        throw new Error("Method not implemented.")
    }

    startOver(): void {
        throw new Error("Method not implemented.")
    }

    constructor(filePath: string) {
        this.binaryChoiceTree = this.loadBinaryChoiceTree(filePath)
    }

}