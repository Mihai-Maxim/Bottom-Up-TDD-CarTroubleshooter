
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

interface ICarTroubleshooter {
    binaryChoiceTree: BinaryChoiceTree
    loadBinaryChoiceTree(filePath: string): BinaryChoiceTree
}


export class CarTroubleshooter implements ICarTroubleshooter {
    binaryChoiceTree: BinaryChoiceTree;
    loadBinaryChoiceTree(filePath: string): BinaryChoiceTree {
        throw new Error("Method not implemented.");
    }

    constructor(filePath: string) {
        this.binaryChoiceTree = this.loadBinaryChoiceTree(filePath)
    }

}