const { exec } = require("child_process");

exports.sensors = {
  temperature: 1,
  humidity: 3,
  light: 3
}

exports.readSensors = () => {
    let temp;
    let hum;
    let bright;

    exec("./executables/light_sensor.out", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        
        bright = parseInt(stdout);
    });

    exec("./executables/temp_umidity.out", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }

        [temp, hum] = stdout.split(" ").map(s => parseFloat(s));
    });

    return {
        temperature: temp,
        humidity: hum,
        light: bright
    };
}