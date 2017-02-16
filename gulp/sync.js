import seq      from 'run-sequence';
import _        from 'lodash';

Array.prototype.append = function(item) {
    this.push(item);
    return this;
};
export class Sequence {
    constructor(){
        this.execution = [];
    }

    sync(...tasks){
        _.reduce(tasks, (s, i) => s.append(i), this.execution);
        return this;
    }

    async(...tasks){
        this.execution.push(tasks);
        return this;
    }

    call(gulp, callback){
        seq.apply(gulp, this.execution.concat(callback));
    }
}
