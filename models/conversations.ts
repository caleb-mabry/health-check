import { BaseTable, Column } from '@outerbase/query-builder';

export class Conversations extends BaseTable {
    @Column({ name: "guid", primary: true })
    guid: string;

    @Column({ name: "conversation" })
    conversation: string;

    @Column({ name: "userrating" })
    userrating: boolean;

    
    constructor(data: any) {
        super({
            _name: "conversations",
            _schema: "public"
        });

        this.guid = data.guid;
        this.conversation = data.conversation;
        this.userrating = data.userrating;
    }
}