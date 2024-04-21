/* Your Code Here */
// the createEmployment function => To get the employee information
function createEmployeeRecord(employeeDetails) {
  // The destructuring assignment to assign variables
  const [firstName, familyName, title, payPerHour] = employeeDetails;
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// Processes an array of employee records(arrays in arrays kinda)
function createEmployeeRecords(employeeDetailsArray) {
  // An array of objects
  return employeeDetailsArray.map(createEmployeeRecord);
}

// Adds an object with three keys: type, hour and date
let createTimeInEvent = function(dateStamp){
  let [date, hour] = dateStamp.split(' ')
 // Create the timeInEvent object
  this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
  })

  return this
}

// Adds an object with three keys: type, hour and date
let createTimeOutEvent = function(dateStamp){
  let [date, hour] = dateStamp.split(' ')
 // Create the timeOutEvent object
  this.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date,
  })

  return this
}

//Calculate the number of hours worked
let hoursWorkedOnDate = function(soughtDate){
let inEvent = this.timeInEvents.find(function(e){
    return e.date === soughtDate
})

let outEvent = this.timeOutEvents.find(function(e){
    return e.date === soughtDate
})

return (outEvent.hour - inEvent.hour) / 100
}


// Adds together all the wages collected hence returns a single value
let wagesEarnedOnDate = function(dateSought){
let rawWage = hoursWorkedOnDate.call(this, dateSought)
    * this.payPerHour
return parseFloat(rawWage.toString())
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}


