import dataForChart from "../components/getChartData";

// test if filter works 

 it("filter by month ", () => {
    const moods = [
        {
        _id: {month : 2},
        //dailyMoodByMonth:[
        dailymoodByMonth:[
           { day:1, moods: [{value: 1}]}
        ],
 },
 { 
    _id: {month : 1},
       // dailyMoodByMonth:[
             dailymoodByMonth:[
           { day:3, moods: [{value: 3}]}
        ],
 },
];

 const result = dataForChart(moods, 1)

//expect(result.labels).equalto("1");
//expect(result.labels).toEqual(["1"]);
expect(result.labels).toEqual(["3"]);
//only one line so [0]
    //expect(result.datasets[0].data).equalto(3);
    expect(result.datasets[0].data).toEqual([3]);
});


// test flatten - get all values for spcific month not just the first one 

 it("filter month and get all the values ", () => {
    const moods = [
        {
        _id: {month : 2},
      //  dailyMoodByMonth:[
             dailymoodByMonth:[
           { day:3, moods: [{value: 1}]}
        ],
 },
 { 
    _id: {month : 2},
       // dailyMoodByMonth:[
             dailymoodByMonth:[
           { day:3, moods: [{value: 3}]}
        ],
 },
];

 const result = dataForChart(moods, 2)

//expect(result.labels).equalto("2", "2");
//expect(result.labels).toEqual(["2", "2"]);
expect(result.labels).toEqual(["3", "3"]);

//only one line so [0]
    //expect(result.datasets[0].data).equalto(1, 3);
    expect(result.datasets[0].data).toEqual([1, 3]);
});

// test no value  
 it("filter month and no value ", () => {
    const moods = [
        {
        _id: {month : 2},
      //  dailyMoodByMonth:[
             dailymoodByMonth:[
           { day:1, moods: [{value: 1}]}
        ],
 },
 { 
    _id: {month : 2},
        //dailyMoodByMonth:[
             dailymoodByMonth:[
           { day:3, moods: [{value: 3}]}
        ],
 },
];

 const result = dataForChart(moods, 3)

//expect(result.labels).equalto([]);
expect(result.labels).toEqual([]);
//only one line so [0]
    //expect(result.datasets[0].data).equalto([]);
expect(result.datasets[0].data).toEqual([]);

});


