async function savePlan() {
    const trainerInput = document.getElementById('trainerInput').value.trim();
    const timeInput = document.getElementById('timeInput').value.trim();

    if (trainerInput && timeInput && activeDay) {
        const planData = {
            trainer: trainerInput,
            time: timeInput,
            day: activeDay
        };

        try {
            // Logovanje pre slanja
            console.log("Slanje plana:", planData);

            const response = await fetch('/.netlify/functions/savePlan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(planData),
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                loadPlansFromServer(); // Učitavanje planova
            } else {
                alert("Greška pri snimanju plana:", result.error);
            }
        } catch (error) {
            console.error("Greška pri slanju podataka:", error);
        }
    } else {
        alert('Morate uneti i Trenera i Vreme!');
    }
}