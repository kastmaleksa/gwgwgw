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
function savePlan() {
    const trainerInput = document.getElementById('trainerInput').value.trim();
    const timeInput = document.getElementById('timeInput').value.trim();
    if (trainerInput && timeInput && activeDay) {
        // Poziv za čuvanje u bazu
        savePlanToDatabase(trainerInput, timeInput, activeDay);

        const plansDiv = document.getElementById(`plans-${activeDay}`);
        const planElement = document.createElement('div');
        planElement.classList.add('plan');
        planElement.innerHTML = `
            <div class="plan-header">Trener: ${trainerInput}</div>
            <div>Vreme: ${timeInput}</div>
            <button class="delete-plan" onclick="deletePlan(this)">Obriši</button>
        `;
        plansDiv.appendChild(planElement);

        document.getElementById('trainerInput').value = '';
        document.getElementById('timeInput').value = '';
        closeAddPlanModal();
    } else {
        alert('Morate uneti i Trenera i Vreme!');
    }
}
async function fetchPlans() {
    try {
        const plans = await client.query(`
            SELECT Plan {
                trainer,
                time,
                day
            }
        `);

        // Popuni planove u kalendaru
        plans.forEach(plan => {
            const plansDiv = document.getElementById(`plans-${plan.day}`);
            const planElement = document.createElement('div');
            planElement.classList.add('plan');
            planElement.innerHTML = `
                <div class="plan-header">Trener: ${plan.trainer}</div>
                <div>Vreme: ${plan.time}</div>
                <button class="delete-plan" onclick="deletePlan(this)">Obriši</button>
            `;
            plansDiv.appendChild(planElement);
        });
    } catch (error) {
        console.error('Greška pri čitanju podataka iz baze:', error);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchPlans();  // Učitaj planove sa baze prilikom učitavanja stranice
});
