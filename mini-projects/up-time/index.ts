import { join } from 'path';
import * as ping from 'ping'
import { mkdirSync, appendFile, existsSync } from 'fs'
import * as utils from 'util'

const DEFAULT_PING_INTERVAL = 1000 * 3

type CancelFn = () => void

const logMessage = (result: boolean): string => {
    const now = `[${new Date().toISOString()}]: `

    if(result) {
        return now + '+++UP+++\n'
    }
    
    return now + '########################$$$$################################\n'
        +  '        #####################   DOWN   #############################\n'
        +  '        ########################$$$$################################\n'
}

const appendToFile = async (file: string, data: string) => {
    try {
        // @ts-ignore
        await utils.promisify(appendFile)(file, data)
    } catch(err) {
        console.error('error writing file', file, err)
    }
}

const isAlive = (adress: string): Promise<boolean> => {
    console.log('ping =>', adress)
    const config = {
        // timeout: 10,
        // extra: ["-i 2"],
    }
    return ping.promise.probe(adress, config)
}

const logAliveTime = (adress: string, logDir: string, interval: number = DEFAULT_PING_INTERVAL): CancelFn => {
    const logFile = join(logDir, `UP_TIME-${adress}.log`)
    const timer = setInterval(async () => {
        const result = await isAlive(adress)
        const message = logMessage(result)
        console.log(adress, '=>', message)
        await appendToFile(logFile, message)
    }, interval)
    return () => clearInterval(timer)
}

const main = async (logDir: string, adresses: string[]) => {

    if(!existsSync(logDir)) {
        mkdirSync(logDir)
    } 

    adresses.map(a => {
        logAliveTime(a, logDir, 8 * 1000)
    })
}

// Simple class for pinging some hosts and logging up OR down timne
// to specificed folder. Logfiles can be regonised via address for now.
const log_dir = '/Users/silvanbregy/Documents/logs'
const adresses = ['192.168.1.101','192.168.1.102']

main(log_dir, adresses)
