const LOGGER = require('js-logger');
LOGGER.useDefaults();

export class Logger {
    
    private static logger = LOGGER;

    // actual Loglevel.
    private static LOG_LEVEL = 4;
    
    //  maxverbosity
    private static MAX_VERBOSITY = Logger.LOG_LEVEL+1;

    static setVerbosity(verbosity: number): void {
        Logger.MAX_VERBOSITY = verbosity+1
    }

    static info(verbosity: number, ...args: any[]) {
        if(verbosity < Logger.MAX_VERBOSITY) {
            Logger.logger.info(...args);
        }  
    }

    static log(verbosity: number, ...args: any[]) {
        if(verbosity < Logger.MAX_VERBOSITY) {
            Logger.logger.log(...args);
        }
    }

    static warn(verbosity: number, ...args: any[]) {
        if(verbosity < Logger.MAX_VERBOSITY) {
            Logger.logger.warn(...args);
        }
    }

    static error(verbosity: number, ...args: any[]) {
        if(verbosity < Logger.MAX_VERBOSITY) {
            Logger.logger.error(...args);
        }
    }

    static debug(verbosity: number, ...args: any[]) {
        if(verbosity < Logger.MAX_VERBOSITY) {
            Logger.logger.debug(...args);
        }
    }

    // need implememntatin..
    // should be used carefully :)
    static trace(verbosity: number, ...args: any[]): void {
        if(verbosity < Logger.MAX_VERBOSITY) {
            Logger.logger.trace(...args);
        }
    }
}