import * as fs from 'fs';

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

    private currentNode: TreeNode

    private loadBinaryChoiceTree(filePath: string): BinaryChoiceTree {
        try {
            const jsonString = fs.readFileSync(filePath, 'utf8');

            const choiceTree = JSON.parse(jsonString) as ChoiceTree;

            const binaryChoiceTree: BinaryChoiceTree = {
                valid: true,
                tree: choiceTree
            }

            return binaryChoiceTree

        } catch (error) {

            const binaryChoiceTree: BinaryChoiceTree = {
                valid: false,
                errors: ["error reading JSON file"]
            }
           return binaryChoiceTree
        }
    }

    getCurrentQuestion(): Question {
        const { q, y, n } = this.currentNode

        const choice: Choice = {
            no: n ? true : false,
            yes: y ? true : false

        }
        const currentQuestion: Question = {
            question: q,
            availableChoices: choice,
            isEnd: !choice.no && !choice.yes
        }

        return currentQuestion
    }

    registerAnswer(choice: "y" | "n"): AnswerStatus {
        if (!this.currentNode[choice]) {
            return {
                registered: false,
                error: `${choice} is not available for question: "${this.currentNode.q}"`
            } as AnswerStatus
        }
        this.currentNode = this.binaryChoiceTree.tree![this.currentNode[choice] as string]

        return {
            registered: true
        }
    }

    startOver(): void {
        this.currentNode = this.binaryChoiceTree.tree!["0"]
    }

    constructor(filePath: string) {
        const binaryChoiceTree = this.loadBinaryChoiceTree(filePath)

        if (!binaryChoiceTree.valid) throw new Error(binaryChoiceTree.errors?.join("\n"))

        this.binaryChoiceTree = binaryChoiceTree
        this.currentNode = binaryChoiceTree.tree!["0"]

    }

}