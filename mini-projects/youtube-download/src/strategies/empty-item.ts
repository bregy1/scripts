import { Item, ISimpleJob } from './item';

export class EmptyItem extends Item {

    protected jobsToRegister(): ISimpleJob[] {
        return [];
    }

    public constructor() {
        super();
    }
}