export function progressBar() {
    const level = document.getElementById("level-progress")
    const levelText = document.getElementById("level-text")


    //initialize birthdate
    const birthdate = new Date("2000-09-05")
    const now = new Date();

    let age = now.getFullYear() - birthdate.getFullYear();
    const hadBirthday =
        now >= new Date(now.getFullYear(), birthdate.getMonth(), birthdate.getDate());

    if (!hadBirthday) age--


    // Last & next birthday
    const lastBirthday = new Date(
        now.getFullYear() - (hadBirthday ? 0 : 1),
        birthdate.getMonth(),
        birthdate.getDate()
    )


    const nextBirthday = new Date(
        lastBirthday.getFullYear() + 1,
        birthdate.getMonth(),
        birthdate.getDate()
    )

    // EXP progress
    const percent =
        ((now - lastBirthday) / (nextBirthday - lastBirthday)) * 100

    level.max = 100
    level.value = percent
    levelText.textContent = `Lvl ${age}`
    
    //set level
    document.getElementById("level-text").textContent = `Lvl ${age}`
    console.log(percent);
}



