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

    private rootKey: string

    private validateBinaryChoiceTree(binaryChoiceTree: BinaryChoiceTree, rootKey: string) {
       // create an occurance map with all the yes / no choices, every yes / no reference should appear only once (no cycles)!

       const referenceCounter: Record<string, number> = {}

       const { tree } = binaryChoiceTree
       for (let k in tree) {
            const node = tree[k]
            const keys = []
            node.n ? keys.push(node.n) : null
            node.y ? keys.push(node.y) : null

            keys.forEach(key => {
                if (!(key in binaryChoiceTree)) {
                    referenceCounter[key] = 1
                } else {
                    referenceCounter[key] += 1
                }
            })
       }

       const hasLoop = Object.values(referenceCounter).find(value => value > 1)

       if (hasLoop) {
           binaryChoiceTree.valid = false
           delete binaryChoiceTree.tree
           binaryChoiceTree.errors = ["The same answer can't be reference in multiple questions!"]

           return
       }


       // also, there should not be island nodes (only the root can't have a father)
       // a dfs search should do it 
       const visited: Record<string, boolean> = {};


       function dfs(nodeKey: string) {
           visited[nodeKey] = true;
           const node = tree![nodeKey];
           if (node.y && !visited[node.y]) {
               dfs(node.y);
           }

           if (node.n && !visited[node.n]) {
               dfs(node.n);
           }
        }

        dfs(rootKey);

        for (const key in tree) {
            if (!visited[key]) {
                console.log(key)
                binaryChoiceTree.valid = false
                delete binaryChoiceTree.tree
                binaryChoiceTree.errors = ["There are some questions that can't be reached!"]

                return 
            }
        }


    }

    private loadBinaryChoiceTree(filePath: string, rootKey: string): BinaryChoiceTree {
        try {
            const jsonString = fs.readFileSync(filePath, 'utf8');

            const choiceTree = JSON.parse(jsonString) as ChoiceTree;

            if (!(rootKey in choiceTree)) {
                return {
                    valid: false,
                    errors: ["Invalid root key"]
                } as BinaryChoiceTree
            }

            const binaryChoiceTree: BinaryChoiceTree = {
                valid: true,
                tree: choiceTree
            }

            this.validateBinaryChoiceTree(binaryChoiceTree, rootKey)

            return binaryChoiceTree

        } catch (error: any) {
            if (error.code === 'ENOENT') {
                const binaryChoiceTree: BinaryChoiceTree = {
                  valid: false,
                  errors: ['File not found']
                };
                return binaryChoiceTree;
            } else if (error instanceof SyntaxError) {
                const binaryChoiceTree: BinaryChoiceTree = {
                  valid: false,
                  errors: ['Invalid JSON format']
                };
                return binaryChoiceTree;
            } else {
                const binaryChoiceTree: BinaryChoiceTree = {
                  valid: false,
                  errors: ['Error reading JSON file']
                };
                return binaryChoiceTree;
            }
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

    constructor(filePath: string, rootKey: string) {
        const binaryChoiceTree = this.loadBinaryChoiceTree(filePath, rootKey)

        if (!binaryChoiceTree.valid) throw new Error(binaryChoiceTree.errors?.join("\n"))

        this.binaryChoiceTree = binaryChoiceTree
        this.rootKey = rootKey
        this.currentNode = binaryChoiceTree.tree![rootKey]

    }

}