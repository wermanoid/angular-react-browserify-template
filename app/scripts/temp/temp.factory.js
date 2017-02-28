import Factory from 'core/factory';

@Factory({name: 'tFactory'})
export class TFactory {
    constructor($timeout, $log, testApi) {
        $timeout(() => $log.info('Timeout from factory', testApi), 0);
        return {bla: 1234};
    }
}
