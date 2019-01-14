var _ = require('lodash'),
    promise = require('bluebird'),
    shelljs = require('shelljs');

class cec {

    static runShell(command) {
        return new promise((resolve, reject) => {
            shelljs.exec(command, {
                silent: true
            }, (code, stdout, stderr) => {
                if (stderr) {
                    reject(new Error(stderr));
                } else {
                    resolve(stdout);
                }
            });
        });
    }

    static turnTVOn() {
        return cec.runShell('echo "on 0" | cec-client -s').then(() => {
            return;
        });
    }

    static turnTVOff() {
        return cec.runShell('echo "standby 0" | cec-client -s').then(() => {
            return;
        });
    }

    static switchSource1() {
        return cec.runShell(`echo "tx 4F:82:10:00" | cec-client -s -d 1`).then(() => {
            return;
        });
    }

    static switchSource2() {
        return cec.runShell(`echo "tx 4F:82:20:00" | cec-client -s -d 1`).then(() => {
            return;
        });
    }

    static volumeUp() {
        return cec.runShell(`echo "volup" | cec-client -s -d 1`).then(() => {
            return;
        });
    }

    static volumeDown() {
        return cec.runShell(`echo "voldown" | cec-client -s -d 1`).then(() => {
            return;
        });
    }
}

console.log('turning TV on...');
cec.turnTVOn().then(() => {

    return promise.delay(10000).then(() => {

        console.log('switching to source 1...');
        cec.switchSource1().then(() => {

            return promise.delay(10000).then(() => {

                console.log('switching to source 2...');
                cec.switchSource2().then(() => {

                    return promise.delay(10000).then(() => {

                        console.log('increasing volume...');
                        cec.volumeUp().then(() => {

                            return promise.delay(10000).then(() => {

                                console.log('decreasing volume...');
                                cec.volumeDown().then(() => {

                                    return promise.delay(10000).then(() => {

                                        console.log('turning TV off...');
                                        return promise.turnTVOff(10000).then(() => {

                                            console.log('test done');
                                            process.exit(0);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}).catch((err) => {
    console.error(err);
    process.exit(-1);
})