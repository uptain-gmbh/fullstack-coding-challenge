import { ConnectionConfig } from 'mysql';

export function getConnectionConfig(): ConnectionConfig {
	return {
		host: process.env.mysqlHost || 'localhost',
		user: process.env.mysqlUser || 'uptain',
		password: process.env.mysqlPassword || 'start123',
		database: process.env.mysqlDB || 'uptain'
	};
}
