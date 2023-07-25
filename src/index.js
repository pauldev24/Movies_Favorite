import app from './app.js';
import { PORT } from './config.js';
import { con } from './db.js';

//app.listen(PORT)

async function main() {
    try {
        await con();
        app.listen(PORT);
        console.log(`Listening on port http://localhost:${PORT}`);
        //console.log(`Environment: ${process.env.NODE_ENV}`)
    } catch (error) {
        console.error(error);
    }
}

main();