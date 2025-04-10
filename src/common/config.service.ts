import { DotenvParseOutput, DotenvConfigOutput, config } from "dotenv";
import { LoggerService } from "./logger.service";

export class ConfigService {
    private readonly config: DotenvParseOutput;
	private _loggerService: LoggerService;

	constructor(loggerService: LoggerService) {
		this._loggerService = loggerService;
		const result: DotenvConfigOutput = config();
		if (result.error) {
			loggerService.errorLog('Не удалось прочитать .env файл для конфигурации');
		} else {
			loggerService.successLog('Конфигурация загружена');
			this.config = result.parsed as DotenvParseOutput;
		}
	}

	get(key: string): string {
		return this.config[key];
	} 
}
