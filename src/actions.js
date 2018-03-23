const Action = {
	getData: function(data) {
		if(localStorage[data]) {
			let storedData = localStorage[data];
        	return JSON.parse(storedData);
        }
        return [];
	},

	setData: function(dataArr, data) {
		var finalArr = JSON.stringify(dataArr);
		localStorage[data] = finalArr;
	},

	validateData(data) {
		if(data.length > 0 && typeof(data) === "string") return true;
		else return false;
	}
}

module.exports = Action;