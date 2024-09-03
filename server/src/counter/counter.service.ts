import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CounterDocument } from './schemas/counter.schema';

@Injectable()
export class CounterService {
    constructor(
        @InjectModel('counter') private readonly counterModel: Model<CounterDocument>
    ) { }

    async getSequenceValue(name: string): Promise<number> {
        const sequenceDocument = await this.counterModel.findOneAndUpdate(
            { name: name },
            { $inc: { sequence_value: 1 } },
            { upsert: true, new: true }
        );
        return sequenceDocument.sequence_value;
    }

    // 사용하지 않음
    // 항상 id가 가장 높은 document를 삭제하는 것이 아니므로 별로 의미가 없음
    async decSequenceValue(name: string): Promise<void>{
        await this.counterModel.findOneAndUpdate(
            { name: name },
            { $inc: { sequence_value: -1 } }
        );
    }
}
