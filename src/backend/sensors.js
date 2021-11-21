const { exec} = require("child_process");

exports.sensors = {
  temperature: 1,
  humidity: 3,
  light: 3
}

const BASE_PATH = './executables/';


let readLight = exports.readLight = () => {
	return new Promise(async (resolve, reject) => {
		exec(BASE_PATH+'light_sensor.out', (error, stdout, stderr) => {
			if (error)
				reject(error.message);
			if (stderr != '')
				reject(stderr);
			resolve(
				parseInt(stdout)
			);
		})
	});
}


let readTempHum = exports.readTempHum = () => {
	return new Promise(async (resolve, reject) => {
		exec(BASE_PATH+'temp_umidity.out', (error, stdout, stderr) => {
			if(error)
				reject(error.message);
			if(stderr != '')
				reject(stderr);
			resolve(
				stdout.split(' ').map(s => parseInt(s))
			);
		})
	})
}





exports.readSensors = async () => {
	let [humidity, temp] = await readTempHum();
	let light = await readLight();

	return {
		temperature: temp,
		humidity: humidity,
		light: light
	};
}