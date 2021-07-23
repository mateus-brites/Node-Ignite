import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database_Ignite"): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host,
        })
    );
};
