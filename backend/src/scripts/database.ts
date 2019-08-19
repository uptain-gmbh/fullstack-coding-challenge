import { createConnection, Connection, Query } from 'mysql';
import { getConnectionConfig } from './configs';

// create connection to the mysql database
function getConnection(): Connection {
	const config = getConnectionConfig();
	return createConnection(config);
}

/**
 * Execute the SQL statement. Returning rows if you use a select statement
 * @param SQL
 * @param bindvar
 */
export async function executeStatement(SQL: string, bindvar?: string): Promise<Query> {
	return new Promise((resolve, reject) => {
		const con = getConnection();
		con.connect((err) => {
			if (err) {
				reject(err);
			}
			con.query(SQL, bindvar, (err, result) => {
				if (err) {
					reject(err);
				}
				resolve(result);
			});
		});
	});
}
