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
	}
}

module.exports = Action;