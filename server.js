import edgedb from 'edgedb';

const client = edgedb.createClient();

async function savePlanToDatabase(trainer, time, day) {
    try {
        await client.query(`
            INSERT Plan {
                trainer: <str>${trainer},
                time: <str>${time},
                day: <int>${day}
            }
        `);
    } catch (error) {
        console.error('Greška pri upisu u bazu:', error);
    }
}
