

const dataForChart = (moods, selectedMonth) => {
    //go throug each month in the data to match with the month seleted and store in monthData

    //chnaged from find to filter to find all the entries for that month and not just hte first entry that matches
 //// const monthData = moods.find(
   // (m) => m._id.month === selectedMonth
  //);

   const monthData = moods.filter(
    (m) => m._id.month === selectedMonth
  );

   console.log("monthData:", monthData);

  //if no data match return empty 
  if (!monthData) {
    return { labels: [], datasets: [{ data: [] }] };
  }

  //get the days from the month
  //const days = monthData.dailymoodByMonth;

  const days = monthData.flatMap(
    (entry) => entry.dailymoodByMonth || []
  );
  


  //get all the mood reported on each day into an arrary

  const allMoods = days.flatMap((d) =>
    d.moods.map((mood) => ({
      day: d.day,
      value: mood.value,
    }))
  );

  // put the date to labels and mood value as data for chart 
  return {
  labels: allMoods.map((mood) => mood.day.toString()),
  datasets: [
    {
      data: allMoods.map((mood) => mood.value),
    },
  ],
};
}

export default dataForChart; 