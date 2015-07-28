function DataRetriever(fileType){

    this.getStateValues = function(){};
    this.getCountyValues = function(){};
    
    if (fileType === "pokeRatioData"){
        this.getStateValues = function(data, stateName) {
            var i = 0;
            var dataState;
            var stateAbbr = state_abbreviations[stateName];

            for (i = 0; i < data.length; i++) {
                //Grab state name
                dataState = data[i].state;

                //Grab data value, and convert from string to float
                if (dataState === stateAbbr) {
                    pokeDict[stateName] = parseFloat(data[i].poke_ratio);
                    return parseFloat(data[i].poke_ratio);
                }

            }
        };
        
        this.getPokeRatioCountyValuesFunction = function(data, countyName) {
            //Merge the ag. data and GeoJSON
            //Loop through once for each ag. data value
            var i = 0;
            var dataCounty;
            var part;
            var len;
            var str;
            var k;

            for (i = 0; i < data.length; i++) {
                //Grab state name
                dataCounty = data[i].county;

                part = dataCounty.split(" ");

                // if the last thing is county/borough get rid of it
                len = part.length;
                if (part[len-1] === "County" || part[len-1] === "Borough" || part[len-1] === "Parish") {
                    str = "";
                    for (k = 0; k < len-1; k++) {
                        str += part[k];
                        if (k !== len-2) {
                            str += " ";
                        }
                    }
                    dataCounty = str;
                }
                else if (part[len-2] === "Census") {
                    str = "";
                    for (k = 0; k < len-2; k++) {
                        str += part[k];
                        if (k !== len-3) {
                            str += " ";
                        }
                    }
                    dataCounty = str;
                }

                if (dataCounty.toLowerCase() === countyName.toLowerCase()) {
                    //Grab data value, and convert from string to float
                    return parseFloat(data[i].poke_ratio);
                }
            }
        };
    }   
};