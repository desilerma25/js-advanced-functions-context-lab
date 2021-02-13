/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(employeeInfo) {
    let info = {
        firstName: employeeInfo[0],
        familyName: employeeInfo[1],
        title: employeeInfo[2],
        payPerHour: employeeInfo[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return info
}

let createEmployeeRecords = function(employeeInfo) {
    return employeeInfo.map(employee => createEmployeeRecord(employee))
}

let createTimeInEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
        //hour: parseInt(dateStamp.split(" ")[1]),
        //date: dateStamp.split(" ")[0]
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    const [date, hour] = dateStamp.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    })
    return this
}

let hoursWorkedOnDate = function(dateOnly) {
    let dayOut = this.timeOutEvents.find(element => element.date === dateOnly).hour
    let dayIn = this.timeInEvents.find(element => element.date === dateOnly).hour

    return (dayOut - dayIn)/100
}

let wagesEarnedOnDate = function(dateOnly) {
    return hoursWorkedOnDate.call(this, dateOnly) * this.payPerHour
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(element => element.firstName === firstName)
}

let calculatePayroll = function(employeeInfo){
    return employeeInfo.reduce(function(memo, employee){
        return memo + allWagesFor.call(employee)
    }, 0)
}